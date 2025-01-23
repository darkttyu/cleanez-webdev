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
    const workerList = await Worker.find()
      .populate({
        path: "userId", // Populates user data (firstName, lastName, address, status).
        select: "firstName lastName address status",
      })
      .select("serviceCategory totalEarnings"); // Selects only specified fields from Worker.

    console.log(JSON.stringify(workerList, null, 2)); // Debugging: Print worker list for readability.

    return res
      .status(200)
      .json({ success: true, message: "Successfully Fetched Worker List" });
  } catch (error) {
    console.log("Error in Fetching Workers", error); // Logs errors for debugging.
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addWorker = async (req, res) => {
  const { userId, serviceCategory, workerAvailability } = req.body;

  console.log("Received request body:", req.body); // Debugging: Logs incoming request body.

  try {
    // Validates required fields.
    if (!userId || !serviceCategory || !workerAvailability) {
      throw new Error("All fields are required.");
    }

    // Checks if the user is already a verified worker.
    const workerAlreadyExists = await User.findOne({
      _id: userId,
      role: "Worker",
      isVerified: true,
    });
    if (workerAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Worker already exists" });
    }

    // gets service details based on the service category
    const getServiceDetails = await Service.findOne({ serviceName: serviceCategory });

    if (!getServiceDetails) { 
      return res
        .status(404)
        .json({ success: false, message: "Service Category does not exist." });
    }

    // gets area details based on the worker's assigned area    
    const getAreaDetail = getServiceDetails.areaDetails.find((area) => area.sizeOfArea === workerAvailability.areaAssigned);

    if (!getAreaDetail) { 
      return res
        .status(404)
        .json({ success: false, message: "Area Assigned does not exist." });
    }

    // gets the start time based on the worker's assigned area
    const startTime = getAreaDetail.startTime;

    // Creates a new worker document.
    const worker = new Worker({
      userId,
      serviceCategory,
      isApplicantVerified: "Verified",

      workerAvailability: {
        ...workerAvailability, 
        startTime: startTime
      }
    });

    await worker.save(); // Saves the worker to the database.

    // Updates the user's role to "Worker".
    const updateUserRole = await User.findByIdAndUpdate(userId, {
      role: "Worker",
    });

    if (!updateUserRole) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to Update User Role." });
    }

    adminWelcomeWorkerEmail(updateUserRole.firstName, updateUserRole.email); // Sends welcome email.

    res.status(201).json({
      success: true,
      message: "Worker Created Successfully",
      worker: {
        ...worker._doc, // Sends worker data as part of the response.
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const clickedWorker = async (req, res) => {
  const userId = req.params.id;

  try {
    const worker = await Worker.findOne({ userId })
      .populate({
        path: "userId", // Populates user data (firstName, lastName).
        select: "firstName lastName",
      })
      .select("serviceCategory workerAvailability"); // Selects specific worker fields.

    console.log(JSON.stringify(worker, null, 2)); // Debugging: Prints worker details.

    return res
      .status(200)
      .json({ success: true, message: "Successfully Fetched Worker" });
  } catch (error) {
    console.log("Error in Fetching Worker", error); // Logs errors for debugging.
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const editWorkerSchedule = async (req, res) => {
  const userId = req.params.id;
  const { workerAvailability } = req.body;

  try {
    // Checks if the worker exists.
    const currentWorker = await Worker.findById(userId);
    if (!currentWorker) {
      return res.status(404).json({ success: false, message: "Worker does not exist" });
    }

    // Updates the worker's schedule information.
    const updatedWorkerInfo = await Worker.findByIdAndUpdate(
      currentWorker._id,
      {
        "workerAvailability.day": workerAvailability.day,
        "workerAvailability.startTime": workerAvailability.startTime
      },
      { new: true } // Ensures the updated document is returned.
    );

    if (!updatedWorkerInfo) {
      return res.status(400).json({ success: false, message: "Failed to update worker." });
    }

    return res.status(200).json({ success: true, message: "Successfully Updated User Information!", data: updatedWorkerInfo});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const setWorkerToActive = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentWorker = await Worker.findOne({ userId });

    if (!currentWorker) {
      res
        .status(404)
        .json({ success: false, message: "Worker does not exist" });
    }

    const updatedWorkerInfo = await User.findByIdAndUpdate(
      userId,
      {
        status: "Active", // Updates worker status to Active.
      },
      { new: true }
    );

    if (!updatedWorkerInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to set worker status to Active." });
    }

    sendWorkerActivationEmail(
      updatedWorkerInfo.firstName,
      updatedWorkerInfo.email
    ); // Sends activation email.

    return res
      .status(200)
      .json({ success: true, message: "Worker Status set to Active" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const softDeleteWorker = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentWorker = await Worker.findOne({ userId });

    if (!currentWorker) {
      res
        .status(404)
        .json({ success: false, message: "Worker does not exist" });
    }

    const updatedWorkerInfo = await User.findByIdAndUpdate(
      userId,
      {
        status: "Inactive", // Updates worker status to Inactive.
      },
      { new: true }
    );

    if (!updatedWorkerInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to Soft Delete Worker." });
    }

    sendWorkerDeactivationEmail(
      updatedWorkerInfo.firstName,
      updatedWorkerInfo.email
    ); // Sends deactivation email.

    return res
      .status(200)
      .json({ success: true, message: "Successfully Soft Deleted Worker" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteWorker = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await Worker.findOneAndDelete({ userId }); // Removes the worker record.

    if (!deleteUser) {
      return res
        .status(500)
        .json({ success: false, message: "User not Found." });
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      role: "User", // Resets user role to "User".
    });

    if (!updateUser) {
      return res
        .status(400)
        .json({ success: false, message: "Error in Updating user role." });
    }

    sendAccountDeletion(deleteUser.firstName, deleteUser.email); // Sends account deletion email.
    
    return res.status(200).json({
      success: true,
      message: "Worker Information Deleted Successfully.",
    });
  } catch (error) {
    console.log("Error in deleting user.", error); // Logs errors for debugging.
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
    
    // Formats the last login time to a more readable format
    const updatedUserInfo = filteredUserInfo.map(user => {
      const lastLogin = new Date(user.lastLogin);

      // Formats the date and time to a more readable format
      const updatedLoginTime = lastLogin.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "short",
        timeStyle: "short",
        hour12: false
      });
      
      // Returns the updated user info with the formatted last login time
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
    // Checks if all fields are filled out
    if(!firstName || !lastName || !email || !phoneNumber || !birthDate || !gender || !address) {
      throw new Error("All fields are required.");
    }
    
    // Checks if the user already exists in the database
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
      return res.status(400).json({success:false, message: "User already exists"});
    }

    // Generates a Random Password for the User
    const userGeneratedPassword = generator.generate({
      length: 12,
      numbers: true,
    })
    
    // Hashes the generated password
    const hashedPassword = await bcryptjs.hash(userGeneratedPassword, 10);

    // Creates a new User
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber, 
      birthDate,
      gender,
      address,
      status: "Active",
      isVerified: true
    });

    await user.save();

    adminWelcomeEmail(user.firstName, user.email, user.phoneNumber, userGeneratedPassword);

    // Returns the user information without the password for security
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

    // Filters the user info to only show the necessary fields
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

    // Formats the birthdate to a more readable format
    const formattedBirthDate = format(new Date(specificUser.birthDate), "dd/mm/yyyy");
    
    // Returns the updated user info with the formatted birthdate
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
  // Gets the user id from the params and the updated user info from the body
  const userId = req.params.id;
  const { firstName, lastName, birthDate, gender, phoneNumber, email, address} = req.body;

    try {
      // Checks if the user exists
      const currentUser = await User.findOne({_id: new Object(userId)})
      if(!currentUser) {
        res.status(404).json({success:false, message:"User does not exist"});
      }
      
      // Updates the user info based on the id and the updated user info
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
        
        // Returns a success message if the user info is updated
        res.status(200).json({success: true, message: "Successfully Updated User Information!"})

    } catch (error) {
      res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

export const deleteUser = async(req, res) => {
  const userId = req.params.id;

  try {
    // Deletes the user based on the id sent
    const deleteUser = await User.findByIdAndDelete(userId)

    if(!deleteUser) {
      return res.status(500).json({ success: false, message: "User not Found."});
    }

    // Sends an account deletion email to the user
    sendAccountDeletion(deleteUser.firstName, deleteUser.email);
    
    // Returns a success message if the user is deleted
    return res.status(200).json({
      success: true, 
      message: "User Deleted Successfully."
    })

  } catch (error) {
    // Logs the error if there is an error in deleting the user
    console.log("Error in deleting user.", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const softDeleteUser = async(req, res) => {
  // Gets the user id from the params
  const userId = req.params.id;

    try {
      //  Checks if the user exists
      const currentUser = await User.findOne({_id: new Object(userId)})
      
      if(!currentUser) {
        res.status(404).json({success:false, message:"User does not exist"});
      }

      // Updates the user status to Inactive and sends an email
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
      
      // Updates the user status to Active and sends an email
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
  // Gets the service name, area details, number of workers, and price from the body
  const { serviceName, areaDetails, serviceDuration, numberOfWorkers, price} = req.body;
  console.log("Received request body:", req.body); // Data Checker
  
  try {
    if(!serviceName || !areaDetails || !serviceDuration || !numberOfWorkers || !price) {
      throw new Error("All fields are required.");
    }
    
    // Checks if the service already exists in the database
    const serviceAlreadyExists = await Service.findOne({ serviceName });
    if(serviceAlreadyExists) {
      return res.status(400).json({success:false, message: "Service already exists"});
    }

    // Creates a new Service
    const service = new Service({
      serviceName,
      areaDetails,
      serviceDuration,
      numberOfWorkers, 
      price
    });

    // Saves the service to the database
    await service.save();
    console.log(JSON.stringify(service, null, 2));

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

// Dashboard Controllers 
export const getWorkerCount = async (req, res) => {
  try {
    const activeWorkers = await User.countDocuments({role: "Worker", status: "Active"});
    return res.status(200).json({success: true, count: activeWorkers})
  } catch (error) {
    return res.status(500).json({success: false, error: error});
  }
};

export const getYearlyEarnings = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getMonthlyEarnings = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getWeeklyEarnings = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getYearlyAppointments = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getMontlyAppointment = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getWeeklyAppointment = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getYearlyEarningsByService = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getMonthlyEarningsByService = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const getWeeklyEarningsByService = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};


// Applicant Controllers 
export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await User.find({role: "Applicant"});

    if(!applicants) {
      return res.status(404).json({success: false, message: "No Applicant Found."})
    }
    
    return res.status(200).json({success: true, message: "Fetched Applicants Lists.", applicants: applicants})

  } catch (error) {
    return res.status(500).json({success: false, error: error})
  }
};

export const getClickedApplicant = async (req, res) => {
  const applicantId = req.params.id;
  
  try {
    // Gets specific user info based on id sent 
    const specificApplicant = await User.findOne({_id: new Object(applicantId), role: "Applicant"});

    if(!specificApplicant) {
      return res.status(404).json({success: false, message: "Applicant does not exist."});
    }

    // Filters the user info to only show the necessary fields
    const filteredApplicantInfo = {
      userId: specificApplicant._id,
      email: specificApplicant.email,
      firstName: specificApplicant.firstName,
      lastName: specificApplicant.lastName,
      address: specificApplicant.address,
      phoneNumber: specificApplicant.phoneNumber,
      gender: specificApplicant.gender,
      birthDate: specificApplicant.birthDate,
      applicantDetails: specificApplicant.applicationDetails // Includes all application details, including files that are need to be converted to the frontend
    };

    // Formats the birthdate to a more readable format
    const formattedBirthDate = format(new Date(specificApplicant.birthDate), "dd/mm/yyyy");
    
    // Returns the updated user info with the formatted birthdate
    const updatedApplicantInfo = {
        ...filteredApplicantInfo, 
        birthDate: formattedBirthDate
      }
    
    // console.log(updatedApplicantInfo);
    res.status(200).json({success: true, message:"Successfully Fetched User Information", applicant: updatedApplicantInfo});

  } catch (error) {
    console.log("Error in Fetching Specific User", error);
    res.status(500).json({success:false, message:"Server Error"});
  }
  
};

export const acceptApplicant = async (req, res) => {
  const applicantId = req.params.id;

  try {
    const applicant = await User.findOne({_id: new Object(applicantId), role: "Applicant"})

    if(!applicant) {
      return res.status(404).json({success: false, message: "No Applicant Found."});
    }

    const service = await Service.findOne(
      {
        serviceName: applicant.applicationDetails.serviceCategory,
        "areaDetails.sizeOfArea": applicant.applicationDetails.areaAssigned
      },
      {
        areaDetails: { $elemMatch: { sizeOfArea: applicant.applicationDetails.areaAssigned } }
      }
    );

    if(!service) {
      return res.status(404).json({success: false, message: "Service does not exist.", error: error.message});
    }

    const areaDetails = service.areaDetails[0];

    const worker = new Worker({
      userId: applicantId,
      serviceCategory: applicant.applicationDetails.serviceCategory,
      isApplicantVerified: "Verified",
      workerAvailability: {
        areaAssigned: areaDetails.sizeOfArea,
        day: [],
        startTime: areaDetails.startTime
      },
      totalEarnings: 0,
      rating: 0,
      assignedAppointments: []
    })

    const updateUserRole = await User.findByIdAndUpdate(
      applicantId,
      {
        role: "Worker",
        $unset: { applicationDetails: {} }
      }
    )

    if(!updateUserRole) {
      return res.status(400).json({success: false, message: "Error in Updating User Information."})
    }

    await worker.save();

    // SEND ACCEPTANCE EMAIL TO USER
    return res.status(200).json({success: true, message: "Applicant accepted as Worker.", worker: worker});

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message})
  }
};

export const rejectApplicant = async (req, res) => {
  const applicantId = req.params.id;

  try {
    const applicant = await User.findOne({_id: new Object(applicantId), role: "Applicant"})

    if(!applicant) {
      return res.status(404).json({success: false, message: "No Applicant Found."});
    }

    const updateUserRole = await User.findByIdAndUpdate(
      applicantId,
      {
        role: "User",
        $unset: { applicationDetails: {} }
      }
    )

    if(!updateUserRole) {
      return res.status(400).json({success: false, message: "Error in Updating User Information."})
    }

    // SEND REJECTION EMAIL TO USER
    return res.status(200).json({success: true, message: "Applicant Rejected."});

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message})
  }
};

/*
export const addField = async (req, res) => {
  try {
    const result = await User.updateMany(
      {},
      { 
        $set: { resume: null }  // This will remove the 'resume' field
      }
    );
    
    const updatedUsers = await User.find({ role: "User" }).limit(5);
    console.log(updatedUsers); // Verify if 'resume' is missing

    console.log(result); // Logs the result of the update operation
    return res.status(200).json({success: true, message: "Update Success", result: result})
  } catch (error) {
    console.error(error); // Logs any error that occurs during the operation
  }
  
};
*/