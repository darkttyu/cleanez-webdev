import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";
import { adminWelcomeEmail, adminWelcomeWorkerEmail, sendAccountDeletion, sendWorkerActivationEmail, sendWorkerDeactivationEmail } from "../nodemailer/sendMail.js";
import bcryptjs from 'bcryptjs';
import * as generator from 'generate-password';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

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
          throw new Error("User has scheduled appointments. Insertion Rejected");
        }
  
      // gets service details based on the service category
      const getServiceDetails = await Service.findOne({ serviceName: serviceCategory });
  
        if (!getServiceDetails) { 
          throw new Error("Service Category does not exist.");
        }
  
      // gets area details based on the worker's assigned area    
      const getAreaDetail = getServiceDetails.areaDetails.find((area) => area.sizeOfArea === workerAvailability.areaAssigned);
  
        if (!getAreaDetail) { 
          throw new Error("Area Assigned does not exist.");
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
          throw new Error("Failed to Update User Role." );
        }
  
      adminWelcomeWorkerEmail(updateUserRole.firstName, updateUserRole.email); // Sends welcome email.
  
      return worker;
};

export const fetchWorker = async(userId) => {
  const worker = await Worker.findOne({ userId })
  .populate({
    path: "userId", // Populates user data (firstName, lastName).
    select: "firstName lastName",
  })
  .select("serviceCategory workerAvailability"); // Selects specific worker fields.

  // console.log(JSON.stringify(worker, null, 2)); // Debugging: Prints worker details.

    if(!worker){
      throw new Error("Error Retrieving Worker Information.")
    }

  return worker;
};

export const updateSchedule = async(userId, body) => {
  // Checks if the worker exists.
  const { workerAvailability } = body;
  const currentWorker = await Worker.findById(userId);
    if (!currentWorker) {
      throw new Error("Worker does not exist");
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
      throw new Error("Failed to update worker.");
    }
  
  return updatedWorkerInfo;
};

export const updateStatus = async(userId) => {
  const checkWorker = await Worker.findOne({ userId });
    if(!checkWorker){
      throw new Error("Worker does not exist.");
    }

  const user = await User.findById(userId);
    if(!user){
      throw new Error("User not Found.");
    }
  
      if(user.status === "Active"){
        const updatedWorkerStatus = await User.findByIdAndUpdate(
          userId,
          {
            status: "Active",
          },
          { new: true}
        );

          if(!updatedWorkerStatus){
            throw new Error("Failed to set Worker Status to Active.")
          }

          // Sends Activation Email
          sendWorkerActivationEmail(
            updatedWorkerStatus.firstName, 
            updatedWorkerStatus.email);

          return updatedWorkerStatus;
      } else {
        const updatedWorkerStatus = await User.findByIdAndUpdate(
          userId,
          {
            status: "Inactive",
          },
          { new: true}
        );

          if(!updatedWorkerStatus){
            throw new Error("Failed to Soft Delete Worker.")
          }

          // Sends deactivation email
          sendWorkerDeactivationEmail(
            updatedWorkerInfo.firsName, 
            updatedWorkerInfo.email
          )

          return updatedWorkerStatus;
      }
};

export const serviceDeleteWorker = async(userId) => {
  const checkWorkerAppointment = await Worker.findOne({ userId })
    if(checkWorkerAppointment.assignedAppointments != []){
      throw new Error("Cannot Delete Worker. Worker still has Assigned Appointments")
    }
  
  const deletedWorker = await Worker.findOneAndDelete({ userId }) // removes worker record;

    if(!deletedWorker){
      throw new Error("Worker not Found.");
    }

  const updateUserRole = await User.findByIdAndUpdate(
    userId, 
    {
      role: "User",
    });

    if(!updateUserRole){
      throw new Error("Error in Updating User Role.");
    }

    sendAccountDeletion(updateUserRole.firstName, updateUserRole.email);
    return true;
};

// User 
export const fetchUserList = async () => {
  // Gets all the User information and stores it in an array of objects
  const userList = await User.find();
    if(!userList){
      throw new Error("Error in Fetching Users.");
    }

  // Map allows us to manipulate arrays and transforming them into a new array.
  const filteredUserInfo = userList.map(user => ({
    userId: user._id,
    firstname: user.firstName,
    lastName: user.lastName,
    address: {
      block: user.address.block,
      province: user.address.province,
      municipal: user.address.municipal,
      barangay: user.address.barangay
    },
    status: user.status,
    isVerified: user.isVerified,
    lastLogin: user.lastLogin
  }))

  // Formats the last login time to a more readable format
  const updatedUserInfo = filteredUserInfo.map(user => {
    const lastLogin = new Date(user.lastLogin);

    // Formats the date and time to a more readable format
    const updatedLogintime = lastLogin.toLocaleString
    ("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "short",
        timeStyle: "short",
        hour12: false
      });
    
    // Returns the updated user info with the formatted last login time
    return {
      ...user, 
      lastLogin: updatedLogintime
    }
  })

    return updatedUserInfo;
};

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

export const postUser = async (body) => {
  const { email, firstName, lastName, phoneNumber, birthDate,
    gender, address } = body;

    // Checks if all fields are filled out
    if(!firstName || !lastName || !email || !phoneNumber ||   !birthDate || !gender || !address) {
      throw new Error("All fields are required.");
    }
  
  const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
      throw new Error("User already exists.")
    }
  
  // Generates random password
  const userGeneratedPassword = generator.generate({
    length: 12,
    numbers: true
  })
  
  const hashedPassword = await bcryptjs.hash(userGeneratedPassword, 10);

  const defaultProfile = await fetchDefaultProfile();

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
    isVerified: true, 
    profilePicture: defaultProfile
  })

    await user.save();

    adminWelcomeEmail(user.firstName, user.email, user.phoneNumber, userGeneratedPassword);

    return user;
}

export const getUser = async (userId) => {

};