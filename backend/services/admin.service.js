import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Service } from "../models/service.model.js";
import moment from "moment";
import { adminWelcomeEmail, adminWelcomeWorkerEmail, sendAccountDeletion, sendWorkerActivationEmail, sendWorkerDeactivationEmail, sendWorkerPaidAppointmentEmail, sendUserDeactivationEmail, sendUserActivationEmail, sendApplicationAcceptanceEmail, sendApplicationRejectionEmail } from "../nodemailer/sendMail.js";
import { format } from 'date-fns';
import bcryptjs from 'bcryptjs';
import * as generator from 'generate-password';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

const formatTime = (time) => {
  // Extract hours and minutes from the input time
  let hours = parseInt(time.substring(0, 2), 10); // First two characters are hours
  let minutes = time.substring(2, 4); // Last two characters are minutes

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time string
  return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
};

// Workers
export const fetchWorkers = async(arrayIndex, pageSize, keyword) => {
  
  if(keyword === ''){
    const workers = await Worker.find()
      .skip(arrayIndex)
      .limit(pageSize)
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
  } else {
      const filteredWorkers = await Worker.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId"
          }
        },
        { $unwind: "$userId" },
        {
          $match: {
            $or: [
              { "userId.firstName": { $regex: keyword, $options: "i" }},
              { "userId.lastName": { $regex: keyword, $options: "i" }}
            ]
          }
        },
        { $skip: arrayIndex },
        { $limit: pageSize },
        {
          $project: {
            "userId.firstName": 1,
            "userId.lastName": 1,
            "userId.address": 1, 
            "userId.status": 1,
            serviceCategory: 1,
            totalEarnings: 1
          }
        }
      ])
        return filteredWorkers;
  }
  
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
  const checkWorkerAppointment = await Worker.findOne({userId: userId});
    if(checkWorkerAppointment.assignedAppointments.length > 0){
      throw new Error("Cannot Delete Worker. Worker still has Assigned Appointments")
    }
  
  const deletedWorker = await Worker.findOneAndDelete({userId: userId}) // removes worker record;

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
export const fetchUserList = async (arrayIndex, pageSize, keyword) => {
  let userList;
  if(keyword === ''){
    userList = await User.find()
      .skip(arrayIndex)
      .limit(pageSize)
      .lean();
  } else {
    userList = await User.find({
      $or: [
        { firstName: {$regex: keyword, $options: 'i'} },
        { lastName: {$regex: keyword, $options: 'i'} }
      ]
    }).skip(arrayIndex).limit(pageSize).lean();
  }

  // Gets all the User information and stores it in an array of objects
      if(!userList || userList.length === 0){
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
};

export const getUser = async (userId) => {
  const user = await User.findOne({_id: new Object(userId)}) 

    if(!user){
      throw new Error("Bad Request. User does not exist.");
    }
    
    // Filters the user info to only show the necessary fields
    const filteredUserInfo = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      birthDate: user.birthDate,
      profilePicture: user.profilePicture
    };
    
    const formattedBirthDate = format(new Date(user.birthDate), "MM/dd/yyyy");
        
        // Returns the updated user info with the formatted birthdate
        const updatedUserInfo = {
            ...filteredUserInfo, 
            birthDate: formattedBirthDate
          }

          return updatedUserInfo;
};

export const updateUser = async (userId, body, profile) => {

  const { email, firstName, lastName, birthDate, gender, phoneNumber, address } = body

  // Checks if the user exists
  const currentUser = await User.findOne({_id: new Object(userId)})
    if(!currentUser) {
      throw new Error("Bad Request. User does not exist.")
    }

      if(profile && profile.length > 0){
        profile = {
          data: profile[0].buffer,
          contentType: profile[0].mimetype
        }
      };
  
  const userAppointmentCount = Appointment.countDocuments({userId: new Object(userId), 
    $or: [
        { appointmentStatus: "Scheduled" }, 
        { paymentStatus: "Pending" }
      ] 
    });

    if(userAppointmentCount > 0){
      throw new Error("Bad Request. User still has Pending Appointments.");
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
      address: {
        "block": address.block,
        "province": address.province,
        "municipal": address.municipal,
        "barangay": address.barangay
      }
    },
    { new: true}
  );

    if(profile){
      updatedUserInfo.profilePicture = profile;
    }
      if(!updatedUserInfo) {
        throw new Error("Failed to update user.");
      }
      
      return updatedUserInfo
};

export const serviceDeleteUser = async (userId) => {
  const id = new Object(userId)

  const user = await User.findById(id);
    if(!user){
      throw new Error("Bad Request. User does not exist.");
    }
      if(user.role === "Worker"){
        const worker = await Worker.findOne({userId: id});
          if(!worker){
            throw new Error("Bad Request. Worker does not exist.");
          }

        const deleteWorker = await Worker.findOneAndDelete({userId: id});
          if(!deleteWorker){
            throw new Error("Bad Request. Error in Deleting Worker Information.")
          }
      }
  
  const userAppointmentCount = await Appointment.countDocuments({userId: id, 
    $or:[
      { appointmentStatus: "Scheduled" }, 
      { paymentStatus: "Pending" }
    ] 
  });

    if(userAppointmentCount > 0){
      throw new Error("Bad Request. User still has Pending Appointments.")
    }

  const deleteUserInformation = await User.findOneAndDelete({_id: id}); 
    if(!deleteUserInformation){
      throw new Error("Bad Request. Error in Deleting User with User ID: ${userId}")
    }
  
    // Sends an account deletion email to the user
    sendAccountDeletion(deleteUserInformation.firstName, deleteUserInformation.email);
    return deleteUserInformation;
};

export const serviceUpdateUserStatus = async (userId) => {
  const user = await User.findById(userId);
    if(!user){
      throw new Error("Bad Request. User does not exist.");
    }

  const userAppointmentCount = await Appointment.countDocuments({
    userId,
    $or: [
      { appointmentStatus: "Scheduled " },
      { paymentStatus: "Pending" }
    ]
  })
    if(userAppointmentCount > 0){
      throw new Error("Bad Request. User still has Scheduled / Pending Appointments.")
    }
      
      if(user.status === 'Active'){
        const updatedUserStatus = await User.findByIdAndUpdate(
          userId,
          { status: "Inactive" },
          { new: true }
        );
          
          if(!updatedUserStatus){
            throw new Error("Bad Request. Error in Updating User Status.");
          }

          sendUserDeactivationEmail(updatedUserStatus.firstName, updatedUserStatus.email);
          return true;
      } else {
        const updatedUserStatus = await User.findByIdAndUpdate(
          userId,
          { status: "Active" },
          { new: true }
        );
          
          if(!updatedUserStatus){
            throw new Error("Bad Request. Error in Updating User Status.");
          }
          sendUserActivationEmail(updatedUserStatus.firstName, updatedUserStatus.email);
          return true;
      }
};

// Applicants 
export const fetchApplicants = async(arrayIndex, pageSize, keyword) => {
  let applicantList;
  if(keyword === ''){
    applicantList = await User.find({ role: "Applicant" })
    .skip(arrayIndex)
    .limit(pageSize)
    .lean();
  } else {
    applicantList = await User.find({
      $or: [
        { customerFirstName: { $regex: keyword, $options: "i"}}, 
        { customerLastName: { $regex: keyword, $options: "i"}}
      ]
    }).skip(arrayIndex).limit(pageSize).lean();
  }

    if(!applicantList){
      throw new Error("Bad Request. Error Fetching Applicant List");
    }

    return applicantList;
};

export const viewApplicant = async(userId) => {
  const applicant = await User.findOne({_id: new Object(userId), role: "Applicant"});
    if(!applicant){
      throw new Error("Bad Request. Error Viewing Applicant Data.");
    }

      // Filters the user info to only show the necessary fields
      const filteredApplicantInfo = {
        userId: applicant._id,
        email: applicant.email,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        address: applicant.address,
        phoneNumber: applicant.phoneNumber,
        gender: applicant.gender,
        birthDate: applicant.birthDate,
        applicantDetails: applicant.applicationDetails // Includes all application details, including files that are need to be converted to the frontend
      };
  
      // Formats the birthdate to a more readable format
      const formattedBirthDate = format(new Date(applicant.birthDate), "MM/dd/yyyy");
      
      // Returns the updated user info with the formatted birthdate
      const updatedApplicantInfo = {
          ...filteredApplicantInfo, 
          birthDate: formattedBirthDate
        }

      return updatedApplicantInfo;
};

export const serviceAcceptApplicant = async(userId) => {
  const applicant = await User.findOne({_id: new Object(userId), role: "Applicant"});
    if(!applicant) {
      throw new Error("Bad Request. Applicant not Found.");
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
          throw new Error("Bad Request. Service does not exist.")
        }

      const areaDetails = service.areaDetails[0];

      const worker = new Worker({
        userId: userId,
        serviceCategory: applicant.applicationDetails.serviceCategory,
        isApplicantVerified: "Verified",
        workerAvailability: {
          areaAssigned: areaDetails.sizeOfArea,
          day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          startTime: areaDetails.startTime
        },
        totalEarnings: 0,
        rating: 0,
        assignedAppointments: []
      })

      const updateUserRole = await User.findByIdAndUpdate(
        userId,
        {
          role: "Worker",
          $unset: { applicationDetails: {} }
        }
      )
  
        if(!updateUserRole) {
          throw new Error("Bad Request. Error in Updating User Role.");
        }
  
        await worker.save();
        sendApplicationAcceptanceEmail(applicant.firstName, applicant.email);
        return true;
};

export const serviceRejectApplicant = async(userId) => {
  const applicant = await User.findOne({_id: new Object(userId), role: "Applicant"})

    if(!applicant) {
      throw new Error("Applicant not Found.");
    }
    
    const updateUserRole = await User.findByIdAndUpdate(
      userId,
      {
        role: "User",
        $unset: { applicationDetails: {} }
      }
    )

      if(!updateUserRole) {
        throw new Error("Bad Request. Error in Removing Application Details and Role Reset..")
      }

      sendApplicationRejectionEmail(applicant.firstName, applicant.email);
      return true;

};

// Appointments 
export const fetchAppointments = async (arrayIndex, pageSize) => {
  const appointmentList = await Appointment.find()
    .skip(arrayIndex)
    .skip(pageSize)
    .lean();

    if(!appointmentList){
      throw new Error("Bad Request. Appointment List not Found.");
    }

    const filteredAppointments = appointmentList.map(({ customerFirstName, customerLastName, serviceDetails, scheduleDetails, appointmentStatus, paymentStatus }) => {
      let slicedDate = '';
      
      if (scheduleDetails.date instanceof Date) {
          slicedDate = scheduleDetails.date.toISOString().slice(0, 10);
      }
  
      return {
          customerName: customerFirstName + ' ' + customerLastName,  
          serviceName: serviceDetails.serviceCategory,  
          date: slicedDate,  
          appointmentStatus: appointmentStatus,  
          paymentStatus: paymentStatus  
      };
  });
    return filteredAppointments;
};

export const serviceMarkAppointmentAsCompleted = async (appointmentId) => {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
      {
        "appointmentStatus": "Completed",
        "paymentStatus": "Paid"
      },
    { new: true }
  )

    if(!appointment){
      throw new Error("Appointment does not exist.");
    }

        // Extract worker IDs from the assignedWorkers array in the appointment
        const workerId = appointment.assignedWorkers.map((worker) => worker._id);
          
        // Fetch the userId of each worker using their worker ID
        const workerUserIds = await Promise.all(
          workerId.map(async (id) => {
            const worker = await Worker.findById(id); // Fetch worker details by ID
            return worker.userId; // Return the userId of the worker
          })
      );
    
        // Divides the service cost to the number of assigned workers for the service.
        // Adds the amount to the totalEarnings of each worker.
        // Also removes the appointment from the assigned workers, meaning that they have completed the service.
        const distributedAmount = appointment.serviceCost / appointment.assignedWorkers.length;
          await Promise.all(
            workerUserIds.map(async (id) => {
              await Worker.findOneAndUpdate(
                { userId: new Object(id) }, 
                {
                  $inc: { "totalEarnings": distributedAmount },
                  $pull: { "assignedAppointments": { "appointmentId": appointmentId }}
                },
                { new: true }
              ); 
            })
          );
        
          await Promise.all(
            workerUserIds.map(async (id) => {
              const workerInfo = await User.findById(id);
              sendWorkerPaidAppointmentEmail(workerInfo.firstName, workerInfo.lastName, workerInfo.email, appointment.customerFirstName, 
                appointment.customerLastName, appointment.serviceDetails.serviceCategory, appointment.scheduleDetails.date, 
                appointment.address.block, appointment.address.municipal, appointment.address.province, appointment.address.barangay,
                appointment.serviceCost)
            })
          );

          return true;
};

export const serviceMarkAppointmentAsCancelled = async (appointmentId) => {
  const appointment = await Appointment.findById(appointmentId).lean();
    if(!appointment) {
      throw new Error("Bad Request. Error in Fetching Appointment.");
    }

      if(appointment.paymentStatus === "Paid" || appointment.appointmentStatus === "Completed"){
        throw new Error("Bad Request. Can not cancelled already processed appointments.");
      }

      // Updates the status of the appointment
      await Appointment.findByIdAndUpdate(
        appointmentId,
          {
            "appointmentStatus": "Cancelled",
            "paymentStatus": "Cancelled"
          }
      ).lean();

      // Worker Update 
    let workerList = []
    appointment.assignedWorkers.forEach(worker => {
      workerList.push(worker);
    })
      // Loops through the workerList array to get the workers to be updated.
      for(const workerId of workerList) {
          const workerInfo = await Worker.findById(workerId);
          if(workerInfo && workerInfo.assignedAppointments) {
            await Worker.findByIdAndUpdate(
              workerId,
              {
                $pull: { assignedAppointments: 
                  { 
                    "appointmentId": appointmentId
                  },
                }
              }
            )
            console.log("Updated Worker Assigned Appointment");
            // SEND CANCELLATION EMAIL TO WORKERS
          }
      }

      // SEND CANCELLATION EMAIL TO USER
      return true;
};

export const fetchAppointment = async (appointmentId) => {
  const appointment = await Appointment.findById(appointmentId);
    if(!appointment){
      throw new Error("Bad Request. Errr in Fetching Appointment Details.");
    }
  
    let slicedDate = '';
      
    if(appointment.scheduleDetails.date instanceof Date) {
        slicedDate = appointment.scheduleDetails.date.toISOString().slice(0, 10);
    }
     
  const formattedTime = formatTime(appointment.scheduleDetails.startTime);

  let workerNames = [];
  for(const workerId of appointment.assignedWorkers){
    const worker = await Worker.findById(workerId);
    const user = await User.findById(worker.userId);

    workerNames.push(user.firstName + ' ' + user.lastName);
  }

  const appointmentDetails = {
    customerFirstName: appointment.customerFirstName,
    customerLastName: appointment.customerLastName,
    address: {
      block: appointment.address.block,
      municipal: appointment.address.municipal,
      province: appointment.address.province,
      barangay: appointment.address.barangay
    },
    phoneNumber: appointment.phoneNumber,
    serviceCategory: appointment.serviceDetails.serviceCategory,
    areaAssigned: appointment.serviceDetails.areaAssigned,
    serviceCost: appointment.serviceCost,
    appointmentDate: slicedDate,
    appointmentTime: formattedTime,
    assignedWorkers: workerNames
  }

  return appointmentDetails;
};
