import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Service } from "../models/service.model.js";
import { Appointment } from "../models/appointment.model.js";
import bcryptjs from 'bcryptjs';
import { adminWelcomeEmail, sendAccountDeletion, sendUserActivationEmail, sendUserDeactivationEmail } from "../nodemailer/sendMail.js";
import { format } from 'date-fns';
import * as generator from 'generate-password';
import { fetchUserList, fetchUsers, fetchWorker, fetchWorkers, getUser, postWorker, serviceDeleteWorker, updateStatus } from "../services/admin.service.js";


// Worker Controllers
export const findAllWorkers = async (req, res) => {
  try {
    const workers = await fetchWorkers();
    return res.status(200).json({ success: true, message: "Successfully Fetched Worker List", worker: workers});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await fetchUsers();
    return res.status(200).json({success: true, users: user})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
};

export const addWorker = async (req, res) => {
  try {
    const addedWorker = await postWorker(req.body);
    return res.status(200).json({ success: true, message: addedWorker})
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const clickedWorker = async (req, res) => {
  try {
    const worker = await fetchWorker(req.params.id);
    return res.status(200).json({ success: true, message: "Successfully Fetched Worker", worker: worker});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editWorkerSchedule = async (req, res) => {
  try {
    const currentWorkerSchedule = await updateSchedule(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Successfully Updated User Information!", data: currentWorkerSchedule});
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateWorkerStatus = async (req, res) => {
  try {
    const updatedWorker = await updateStatus(req.param.id);
    return res.status(200).json({success: true, message: "Updated Worker Status.", worker: updatedWorker });
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
}

export const deleteWorker = async (req, res) => {
  try {
    const deletedWorker = await serviceDeleteWorker(req.params.id);
    return res.status(200).json({success: true, message: "Deleted Worker Information."})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User Controllers
export const findAllUsers = async (req, res) => {
  try {
    const users = await fetchUserList();
    return res.status(200).json({success: true, message: "Fetched Users", userList: users})
  
  } catch (error) {
    console.log("Error in Fetching Users", error);
    res.status(500).json({ success: false, message: error.message});
  }
  
};

export const addUser = async (req, res) => {  
  try {
    const newUser = postUser(req.body);
    
    res.status(201).json({success: true,message: "User Created Successfully", user: { ...newUser._doc, password: undefined, }
      })

  } catch (error) {
    return res.status(400).json({success:false, message: error.message});
  }
};

export const clickedUser = async(req, res) => {  
  try {
    const user = await getUser(req.params.id);
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

// const fetchDefaultProfile = async() => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
  
//   const profilePath = path.join(__dirname, "../images/defaultProfile1.jpg");

//   const imageBuffer = fs.readFileSync(profilePath);

//   return { 
//     data: imageBuffer,
//     contentType: 'image/jpeg'
//   }
// };

// export const updateProfile = async(req, res) => {
//   const profile = await fetchDefaultProfile();

//   const updatedProfile = await User.updateMany(
//     {},
//     {
//       $set: { "profilePicture": { data: profile.data, contentType: profile.contentType } }
//     },
//     { new: true }
//   )

//   return res.status(200).json({success: true, message: updatedProfile})
// }