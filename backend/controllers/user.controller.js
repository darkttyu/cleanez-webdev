import { User } from "../models/user.model.js";

export const getAccountInformation = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById({_id: new Object(userId)});

    if(!user) {
      return res.status(400).json({success: false, message: "Error in Fetching User Information."});
    }

    return res.status(200).json({success: true, message: "Fetched User Information", user: user});

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const editAccountInformation = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getAppointmentInformation = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const setAppointmentAsCompleted = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};