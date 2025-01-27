import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";
import { adminWelcomeWorkerEmail } from "../nodemailer/sendMail.js";

// Workers
export const fetchWorkers = async() => {
  const workers = await Worker.find()
      .populate({
        path: "userId", // Populates user data (firstName, lastName, address, status).
        select: "firstName lastName address status",
      })
      .select("serviceCategory totalEarnings"); // Selects only specified fields from Worker.

    // console.log(JSON.stringify(workers, null, 2)); // Debugging: Print worker list for readability.
      if(!workers){
        throw new Error("Workers not Found");
      }

  return workers;
};

export const fetchUsers = async() => {
  const users = await User.find({role: "User"});
   
    if(!users){
      throw new Error("Users not Found.");
    }

    
  const userData = users.map(user => ({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName
  }))

  return userData;
};

export const postWorker = async(body) => {
  const { userId, serviceCategory, workerAvailability } = body;

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
          throw new Error("Worker already exists");
        }
      
      // Checks if an applicant / worker to be added still has an appointment
      const applicantAppointment = await Appointment.find({"userId": userId, appointmentStatus: "Pending"})
        if(applicantAppointment.length >= 1){
          return res.status(400).json({success: false, message: "User has scheduled appointments. Insertion Rejected"});
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
};