import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { adminWelcomeEmail } from "../nodemailer/sendMail.js";
import { format } from 'date-fns';
import * as generator from 'generate-password';

export const findAllUsers = async (req, res) => {

  try {
    // Gets all the User information and stores it in an array of objects
    const userList = await User.find();
    
    // Map allows us to manipulate arrays and transforming them into a new array.
    const filteredUserInfo = userList.map(user => ({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      status: user.status,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin
    }));
    
    const updatedUserInfo = filteredUserInfo.map(user => {
      const lastLogin = new Date(user.lastLogin);

      const updatedLoginTime = lastLogin.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "short",
        timeStyle: "short",
        hour12: false
      });

      return {
        ...user, 
        lastLogin: updatedLoginTime
      }
    })

      if(filteredUserInfo) {
        res.status(200).json({
          success: true,
          message: "Fetched All User Information",
        });
        console.log(updatedUserInfo) // Pang check sa console ng nafetch na info
      } 
  } catch (error) {
    console.log("Error in Fetching Users", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
  
};

export const addUser = async (req, res) => {
  const {email, firstName, lastName, phoneNumber, birthDate, gender, address} = req.body;

  console.log("Received request body:", req.body); // Data Checker
  
  try {
    if(!firstName || !lastName || !email || !phoneNumber || !birthDate || !gender || !address) {
      throw new Error("All fields are required.");
    }
    
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
      return res.status(400).json({success:false, message: "User already exists"});
    }

    // Generates a Random Password for the User
    const userGeneratedPassword = generator.generate({
      length: 12,
      numbers: true,
    })

    const hashedPassword = await bcryptjs.hash(userGeneratedPassword, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber, 
      birthDate,
      gender,
      address,
    })

    await user.save();

    adminWelcomeEmail(user.firstName, user.email, user.phoneNumber, userGeneratedPassword);

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

export const clickedUser = async(req, res) => {
  const userId = req.params.id;

  try {
    // Gets specific user info based on id sent 
    const specificUser = await User.findOne({_id: new Object(userId)});

    const filteredUserInfo = {
      userId: specificUser._id,
      email: specificUser.email,
      firstName: specificUser.firstName,
      lastName: specificUser.lastName,
      address: specificUser.address,
      phoneNumber: specificUser.phoneNumber,
      gender: specificUser.gender,
      birthDate: specificUser.birthDate,
    };

    const formattedBirthDate = format(new Date(specificUser.birthDate), "dd/mm/yyyy");
    
    const updatedUserInfo = {
        ...filteredUserInfo, 
        birthDate: formattedBirthDate
      }
    
    console.log(updatedUserInfo);
    res.status(200).json({success: true, message:"Successfully Fetched User Information"});

  } catch (error) {
    console.log("Error in Fetching Specific User", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
  
};

export const editUserInfo = async(req, res) => {
  const { firstName, lastName, birthDate, gender, phoneNumber, email, address} = req.body;
  
};