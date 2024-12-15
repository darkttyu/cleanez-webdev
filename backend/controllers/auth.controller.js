import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const {firstName, lastName, email, phoneNumber, password, birthDate, gender, address} = req.body;

  try {
    if(!firstName || !lastName || !email || !phoneNumber || !password || !birthDate || !gender || !address) {
      throw new Error("All fields are required.");
    }
    
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
      return res.status(400).json({success:false, message: "User already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber, 
      birthDate,
      gender,
      address,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })

    await user.save();
    
    generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.firstName, user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password:undefined,
      },
    })

  } catch (error) {
    return res.status(400).json({success:false, message: error.message});
  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now()}
    })

      if(!user) {
        return res.status(400).json({success:false, message: "Invalid or Expired Verification Code"})
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;

      await user.save();

      await sendWelcomeEmail(user.firstName, user.email);
      res.status(200).json({
        success:true, 
        message:"Email verified successfully", 
        user: {
          ...user._doc,
          password: undefined,
        },
      });
  } catch (error) {
    console.log("Error in Email Verification", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    if(!login || !password) {
      return res.status(400).json({success: false, message: "All fields are required"});
    }

    // Checks if login is an email / password
    const isEmail = login.includes("@") && login.includes(".");
    
    try {
      // Checks the database for the email / password
      const user = await User.findOne(isEmail ? { email: login} : { username: login});

      if(!user) {
        return res.status(400).json({succes: false, message: "Invalid Credentials"});
      }

      // Checks if the password is the same as in the database
      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if(!isPasswordValid) {
        return res.status(400).json({succes: false, message: "Invalid Credentials"});
      }

      generateTokenAndSetCookie(res, user._id);

      user.lastLogin = new Date();
      await user.save();

      res.status(200).json({
        success:true, 
        message: "Logged In Successfully.",
        user: {
          ...user._doc, 
          password: undefined,
        },
      });
    } catch (error) {
      console.log("Error Logging In.")
    }



  } catch (error) {
    console.log("Server Error,");
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({sucess: true, message: "Logged out Successfully."});
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({success: false, message: "User not Found."});
    }

    // Generating Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    //Send Password Reset Email
    await sendPasswordResetEmail(user.firstName, user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    
    res.status(200).json({success:true, message:"Password reset link sent to your email."})
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({success:false, message: error.message});
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body; 

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if(!user) {
      return res.status(400).json({success:false, message:"Invalid or Expired Reset Token."});
    }

    // Password Update
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.firstName, user.email)

    res.status(200).json({success:true, message: "Password Reset Successful."});

  } catch (error) {
    res.status(400).json({success:false, message: "Error in Resetting Password"});
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    
    if(!user) {
      return res.status(400).message({success:false, message: "User not Found"});
    }

    res.status(200).json({success: true, user});
    
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({success:false, message: error.message});
  }
};