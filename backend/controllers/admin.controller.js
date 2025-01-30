import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Service } from "../models/service.model.js";
import { Appointment } from "../models/appointment.model.js";
import bcryptjs from 'bcryptjs';
import { adminWelcomeEmail, sendAccountDeletion, sendUserActivationEmail, sendUserDeactivationEmail } from "../nodemailer/sendMail.js";
import * as generator from 'generate-password';
import { fetchApplicants, fetchAppointments, fetchUserList, fetchUsers, fetchWorker, fetchWorkers, getUser, postWorker, serviceAcceptApplicant, serviceDeleteUser, serviceDeleteWorker, serviceRejectApplicant, serviceUpdateUserStatus, updateStatus, updateUser, viewApplicant } from "../services/admin.service.js";


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
    res.status(200).json({success: true, message:"Successfully Fetched User Information", user: user });

  } catch (error) {
    console.log("Error in Fetching Specific User", error);
    res.status(400).json({success:false, message: error.message });
  }
  
};

export const editUserInfo = async(req, res) => {
  // Multipart-form
    try {
      const updatedUser = await updateUser(req.params.id, accountInfo, req.files?.profile);
      // Returns a success message if the user info is updated
      res.status(200).json({ success: true, message: "Successfully Updated User Information!", user: updatedUser })

    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
};

export const deleteUser = async(req, res) => {
  try {
    const user = await serviceDeleteUser(req.params.id);

    if(user){
      return res.status(200).json({ success: true, message: "User Deleted Successfully." })
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUserStatus = async(req, res) => {
  try {
    const user = await serviceUpdateUserStatus(req.params.id);
    return res.status(200).json({success: true, message: "Succesfully Updated User Status", user: user})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
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

// Applicant Controllers 
export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await fetchApplicants();
    return res.status(200).json({success: true, message: "Fetched Applicants Lists.", applicants: applicants});
  } catch (error) {
    return res.status(400).json({success: false, error: message.error});
  }
};

export const getClickedApplicant = async (req, res) => {
  
  try {
    // Gets specific user info based on id sent 
    const applicant = await viewApplicant(req.params.id);
 
    // console.log(updatedApplicantInfo);
    res.status(200).json({success: true, message:"Successfully Fetched User Information", applicant: applicant});
  } catch (error) {
    console.log("Error in Fetching Specific User", error);
    res.status(400).json({success:false, message:"Server Error"});
  }
  
};

export const acceptApplicant = async (req, res) => {
  try {
    const acceptedApplicant = await serviceAcceptApplicant(req.params.id)
      
      if(acceptedApplicant){
        return res.status(200).json({success: true, message: "Applicant accepted as Worker."});
      }
  } catch (error) {
    return res.status(400).json({success: false, message: error.message })
  }
};

export const rejectApplicant = async (req, res) => {
  try {
    const rejectedApplicant = await serviceRejectApplicant(req.params.id);

      if(!rejectedApplicant){
        return res.status(200).json({success: true, message: "Applicant Rejected."});
      }
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
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

// Appointments
export const getAppointments = async (req, res) => {
  try {
    const appointment = await fetchAppointments();
      if(appointment){
        return res.status(200).json({success: true, message: "Fetched Appointments List.", appointmentList: appointment});
      }
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
};

export const markAppointmentAsComplete = async (req, res) => {

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