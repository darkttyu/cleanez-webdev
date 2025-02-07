import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';
import { User } from "../models/user.model.js";
import { Admin } from '../models/admin.model.js';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../nodemailer/sendMail.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// USER AUTHENTICATION
const fetchDefaultProfile = async() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const profilePath = path.join(__dirname, "../images/defaultProfile1.jpg");

  const imageBuffer = fs.readFileSync(profilePath);

  return { 
    data: imageBuffer,
    contentType: 'image/jpeg'
  }
};

/**
 * Handles user signup by receiving user details, checking if the user already exists, 
 * hashing the password, and sending a verification email.
 */
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, birthDate, gender, address } = req.body;

  console.log("Received request body:", req.body); // Data Checker
  
  try {
    // Validate input fields
    if (!firstName || !lastName || !email || !phoneNumber || !password || !birthDate || !gender || !address) {
      throw new Error("All fields are required.");
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const defaultProfile = await fetchDefaultProfile();

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber, 
      birthDate,
      gender,
      address,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      profilePicture: defaultProfile
    });

    // Save user to database
    await user.save();
    
    // Generate token and set cookie for authentication
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.firstName, user.email, verificationToken);

    // Respond with success message and user data (password excluded)
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Handles email verification by validating the verification token, updating user status, 
 * and sending a welcome email upon successful verification.
 */
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    // Find user by verification token and expiration
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Verification Code" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.status = "Active";
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    // Save user data
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.firstName, user.email);

    // Respond with success message and user data (password excluded)
    res.status(200).json({
      success: true, 
      message: "Email verified successfully", 
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Email Verification", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Handles user login by validating credentials, generating a token, 
 * and updating the user's last login date.
 */
export const login = async (req, res) => {
  const { login, password } = req.body;

  console.log(req.body);
  try {
    // Validate login and password
    if (!login || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if login is email or phone number
    const isEmail = login.includes("@") && login.includes(".");
    
    try {
      // Find user by email or phone number
      const user = await User.findOne(isEmail ? { email: login } : { phoneNumber: login });

      if (!user) {
        return res.status(400).json({ success: false, message: "User not Found." });
      }

        // Validate password
        if(user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
          const isPasswordValid = await bcryptjs.compare(password, user.password);

          if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Password"});
          }
        } else {
            const isMatch = password === user.password;

            if (!isMatch) {
              return res.status(400).json({ success: false, message: "Invalid Credentials"});
            }
        }
    
            if(!user.isVerified) {
              return res.status(400).json({ success: false, message: "Account not Verified"});
            }

              if(user.status == "Inactive") {
                return res.status(400).json({success: false, message: "Login Failed. Account Inactive. Contact Admin for Account Reactivation"});
              }

      // Generate token and set cookie
      const token = generateTokenAndSetCookie(res, user._id);

      // Resets the Flag to 0 every first day of the month.
      const currentDate = moment();
      if(moment(currentDate).date() === 1) {
        user.cancelledAppointment = 0;
      }

      // Update last login date
      user.lastLogin = new Date();
      await user.save();

      // Respond with success message and user data (password excluded)
      res.status(200).json({
        success: true, 
        message: "Logged In Successfully.",
        token: token,
        user: {
          ...user._doc, 
          password: undefined,
        },
      });
    } catch (error) {
      return res.status(500).json({success: false, message: error.message})
    }

  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
};

/**
 * Handles user logout by clearing the authentication token cookie.
 */
export const logout = async (req, res) => {
  res.clearCookie(res.token);
  res.status(200).json({ success: true, message: "Logged out Successfully." });
};

/**
 * Handles forgot password request by generating a reset token, 
 * storing it in the database, and sending a password reset email.
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not Found." });
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    // Save reset token and expiration time
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(user.firstName, user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    return res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    
  } catch (error) {
    console.log("Error in forgotPassword", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Handles password reset by validating the reset token, updating the password, 
 * and sending a success email.
 */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body; 

    // Find user by reset token and expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Reset Token." });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    // Send reset success email
    await sendResetSuccessEmail(user.firstName, user.email);

    res.status(200).json({ success: true, message: "Password Reset Successful." });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error in Resetting Password" });
  }
};

/**
 * Checks if the user is authenticated by verifying the user's token and returning their details.
 */
export const checkAuth = async (req, res) => {
  try {
    // Find user by ID and exclude password
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).message({ success: false, message: "User not Found" });
    }

    // Respond with user data
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ADMIN AUTHENTICATION

/**
 * Handles admin login by validating credentials and generating a token.
 */
export const adminLogin = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (!login || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username: login });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

        // Validate password
        if(admin.password.startsWith("$2a$") || admin.password.startsWith("$2b$")) {
          const isPasswordValid = await bcryptjs.compare(password, admin.password);

          if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Credentials"});
          }
        } else {
            const isMatch = password === admin.password;

            if (!isMatch) {
              return res.status(400).json({ success: false, message: "Invalid Credentials"});
            }
        }
        
    // Generate token and set cookie
    generateTokenAndSetCookie(res, admin._id);

    // Update admin last login date
    admin.lastLogin = new Date();
    await admin.save();

    // Respond with success message and admin data (password excluded)
    res.status(200).json({
      success: true, 
      message: "Logged In Successfully.",
      admin: {
        ...admin._doc, 
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error Logging In.");
  }
};

/**
 * Handles admin logout by clearing the authentication token cookie.
 */
export const adminLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out Successfully." });
};
