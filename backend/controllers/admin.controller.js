import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Service } from "../models/service.model.js";
import bcryptjs from 'bcryptjs';
import { adminWelcomeEmail, adminWelcomeWorkerEmail, sendAccountDeletion, sendUserActivationEmail, sendUserDeactivationEmail, sendWorkerActivationEmail, sendWorkerDeactivationEmail } from "../nodemailer/sendMail.js";
import { format } from 'date-fns';
import * as generator from 'generate-password';

// Worker Controllers
export const findAllWorkers = async (req, res) => {
  try {
    // Gets all the Worker Information and is Stored in an Array of Objects
    const workerList = await Worker.find()
      .populate({
        path: "userId",
        select: "firstName lastName address status"
      })
      .select('serviceCategory totalEarnings')
    
    console.log(JSON.stringify(workerList, null, 2)); // Used for readability of the address since only [Object] is displayed without it
    
    return res.status(200).json({success: true, message: "Successfully Fetched Worker List"});
  } catch (error) {
    console.log("Error in Fetching Workers", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
  
};

export const addWorker = async (req, res) => {
  const { userId, serviceCategory, workerAvailability } = req.body;

  console.log("Received request body:", req.body); // Data Checker
  
  try {
    if(!userId || !serviceCategory || !workerAvailability) {
      throw new Error("All fields are required.");
    }
    
    const workerAlreadyExists = await User.findOne({_id: userId, role: "Worker", isVerified: true});
    if(workerAlreadyExists) {
      return res.status(400).json({success:false, message: "Worker already exists"});
    }

    const worker = new Worker({
      userId,
      serviceCategory, 
      isApplicantVerified: 'Verified',
      workerAvailability
    });

    await worker.save();

    const updateUserRole = await User.findByIdAndUpdate(
      userId, 
      {role: "Worker"},
    );
  
      if(!updateUserRole) {
        return res.status(400).json({success: false, message: "Failed to Update User Role."})
      }
    
    adminWelcomeWorkerEmail(updateUserRole.firstName, updateUserRole.email);

    res.status(201).json({
      success: true,
      message: "Worker Created Successfully",
      worker: {
        ...worker._doc,
      },
    })

  } catch (error) {
    return res.status(400).json({success:false, message: error.message});
  }
};

export const clickedWorker = async(req, res) => {
  const userId = req.params.id;

  try {
    // Gets all the Worker Information and is Stored in an Array of Objects
    const worker = await Worker.findOne({ userId })
      .populate({
        path: "userId",
        select: "firstName lastName"
      })
      .select('serviceCategory workerAvailability')
    
    console.log(JSON.stringify(worker, null, 2)); // Used for readability of the address since only [Object] is displayed without it
    
    return res.status(200).json({success: true, message: "Successfully Fetched Worker"});

  } catch (error) {
    console.log("Error in Fetching Workers", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
};

export const editWorkerSchedule = async (req, res) => {
  const userId = req.params.id;
  const { serviceCategory, workerAvailability } = req.body;

    try {
      const currentWorker = await Worker.findOne({userId})
      if(!currentWorker) {
        return res.status(404).json({success:false, message:"Worker does not exist"});
      }

      const updatedWorkerInfo = await Worker.findByIdAndUpdate(
        currentWorker._id, 
        {
          serviceCategory,
          workerAvailability
        },
        { new: true}
      );
    
        if(!updatedWorkerInfo) {
          return res.status(400).json({success: false, message: "Failed to update worker."})
        }
    
        return res.status(200).json({success: true, message: "Successfully Updated User Information!"})

    } catch (error) {
      return res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const setWorkerToActive = async (req, res) => {
  const userId = req.params.id;

    try {
      const currentWorker = await Worker.findOne({userId})
      
      if(!currentWorker) {
        res.status(404).json({success:false, message:"Worker does not exist"});
      }

      const updatedWorkerInfo = await User.findByIdAndUpdate(
        userId, 
        {
          status: "Active"
        },
        { new: true}
      );
    
        if(!updatedWorkerInfo) {
          return res.status(400).json({success: false, message: "Failed to set worker status to Active."})
        }
        
        sendWorkerActivationEmail(updatedWorkerInfo.firstName, updatedWorkerInfo.email);
        return res.status(200).json({success: true, message: "Worker Status set to Active"})

    } catch (error) {
      return res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const softDeleteWorker = async (req, res) => {
  const userId = req.params.id;

    try {
      const currentWorker = await Worker.findOne({userId})
      
      if(!currentWorker) {
        res.status(404).json({success:false, message:"Worker does not exist"});
      }

      const updatedWorkerInfo = await User.findByIdAndUpdate(
        userId, 
        {
          status: "Inactive"
        },
        { new: true}
      );
    
        if(!updatedWorkerInfo) {
          return res.status(400).json({success: false, message: "Failed to Soft Delete Worker."})
        }
        
        sendWorkerDeactivationEmail(updatedWorkerInfo.firstName, updatedWorkerInfo.email);
        return res.status(200).json({success: true, message: "Successfully Soft Deleted Worker"})

    } catch (error) {
      return res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const deleteWorker = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await Worker.findOneAndDelete({userId})

    if(!deleteUser) {
      return res.status(500).json({ success: false, message: "User not Found."});
    }

    const updateUser = await User.findByIdAndUpdate(userId, {role: "User"});

    if(!updateUser) {
      return res.status(400).json({ success: false, message: "Error in Updating user role."});
    }

    // sendAccountDeletion(deleteUser.firstName, deleteUser.email);
    
    return res.status(200).json({
      success: true, 
      message: "Worker Information Deleted Successfully."
    })

  } catch (error) {
    console.log("Error in deleting user.", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// User Controllers
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
      isVerified: true
    });

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

    if(!specificUser) {
      return res.status(404).json({success: false, message: "User does not exist."});
    }

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
  const userId = req.params.id;
  const { firstName, lastName, birthDate, gender, phoneNumber, email, address} = req.body;

    try {
      const currentUser = await User.findOne({_id: new Object(userId)})
      if(!currentUser) {
        res.status(404).json({success:false, message:"User does not exist"});
      }

      const updatedUserInfo = await User.findByIdAndUpdate(
        userId, 
        {
          email,
          firstName,
          lastName,
          birthDate,
          gender,
          phoneNumber, 
          address
        },
        { new: true}
      );
    
        if(!updatedUserInfo) {
          return res.status(400).json({success: false, message: "Failed to update user."})
        }
    
        res.status(200).json({success: true, message: "Successfully Updated User Information!"})

    } catch (error) {
      res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const deleteUser = async(req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(userId)

    if(!deleteUser) {
      return res.status(500).json({ success: false, message: "User not Found."});
    }

    sendAccountDeletion(deleteUser.firstName, deleteUser.email);
    
    res.status(200).json({
      success: true, 
      message: "User Deleted Successfully."
    })

  } catch (error) {
    console.log("Error in deleting user.", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const softDeleteUser = async(req, res) => {
  const userId = req.params.id;

    try {
      const currentUser = await User.findOne({_id: new Object(userId)})
      
      if(!currentUser) {
        res.status(404).json({success:false, message:"User does not exist"});
      }

      const updatedUserInfo = await User.findByIdAndUpdate(
        userId, 
        {
          status: "Inactive"
        },
        { new: true}
      );
    
        if(!updatedUserInfo) {
          return res.status(400).json({success: false, message: "Failed to Soft Delete User."})
        }
        
        sendUserDeactivationEmail(updatedUserInfo.firstName, updatedUserInfo.email);
        return res.status(200).json({success: true, message: "Successfully Soft Deleted User"})

    } catch (error) {
      return res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const setUserToActive = async (req, res) => {
  const userId = req.params.id;

    try {
      const currentUser = await User.findOne({_id: new Object(userId)})
      
      if(!currentUser) {
        res.status(404).json({success:false, message:"User does not exist"});
      }

      const updatedUserInfo = await User.findByIdAndUpdate(
        userId, 
        {
          status: "Active"
        },
        { new: true}
      );
      
        if(!updatedUserInfo) {
          return res.status(400).json({success: false, message: "Failed to set user status to Active."})
        }
        
        sendUserActivationEmail(updatedUserInfo.firstName, updatedUserInfo.email);
        return res.status(200).json({success: true, message: "User status set to Active."})

    } catch (error) {
      return res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

// Service Controllers
export const insertService = async (req, res) => {
  const { serviceName, areaDetails, numberOfWorkers, price} = req.body;

  console.log("Received request body:", req.body); // Data Checker
  
  try {
    if(!serviceName || !areaDetails || !numberOfWorkers || !price) {
      throw new Error("All fields are required.");
    }
    
    const serviceAlreadyExists = await Service.findOne({ serviceName });
    if(serviceAlreadyExists) {
      return res.status(400).json({success:false, message: "Service already exists"});
    }

    const service = new Service({
      serviceName,
      areaDetails,
      numberOfWorkers, 
      price
    });

    await service.save();
    
    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      service: {
        ...service._doc,
      },
    })
    
  } catch (error) {
    return res.status(400).json({success:false, message: error.message});
  }
};

