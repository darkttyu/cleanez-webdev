import { User } from "../models/user.model.js";

export const findAllUsers = async (req, res) => {

  try {
    // Gets all the User information and stores it in an array of objects
    const userList = await User.find();
    
    // Map allows us to manipulate arrays and transforming them into a new array.
    const filteredUserInfo = userList.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      status: user.status,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin
    }));

      if(filteredUserInfo) {
        res.status(200).json({
          success: true,
          message: "Fetched All User Information",
        });
        console.log(filteredUserInfo) // Pang check sa console ng nafetch na info
      } 
  } catch (error) {
    console.log("Error in Fetching Users", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
  
};