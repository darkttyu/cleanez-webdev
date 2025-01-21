import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";
import bycryptjs from 'bcryptjs';

// Profile
export const getWorkerAccountInformation = async (req, res) => {
  const id = req.userId;

  try {
    // Extracts the user information and returns it for viewing in the frontend.
    const user = await User.findById({_id: new Object(id)});

    if(!user) {
      return res.status(400).json({success: false, message: "Error in Fetching User Information."});
    }

    if(user.role != 'Worker') {
      return res.status(400).json({success: false, message: "Bad Request. User is not a worker."})
    }

    return res.status(200).json({success: true, message: "Fetched User Information", user: user});
  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const editWorkerAccountInformation = async (req, res) => {
  // Gets the user id by from the localStorage and token
  const id = req.userId

  let profile = req.files?.profile;
  const { birthDate, gender, phoneNumber, email, block, province, municipal, barangay} = req.body;

    try {
      // Checks if the user exists
      const currentWorker = await User.findOne({_id: new Object(id)})

        if(!currentWorker) {
          res.status(404).json({ success: false, message: "Worker does not exist"});
        }

        if(currentWorker.role !== 'Worker') {
          res.status(400).json({ success: false, message: "Bad Request. Account is not Verified as a Worker.", worker: currentWorker})
        }
        
        if(profile && profile.length > 0){
          profile = {
            data: profile[0].buffer, // Store profile picture buffer
            contentType: profile[0].mimetype // Store profile picture's MIME type
            };
        }

      // Updates the user info based on the id and the updated user info
      const updatedData = {
          email,
          birthDate,
          gender,
          phoneNumber, 
          "address.block": block,
          "address.province": province,
          "address.municipal": municipal,
          "address.barangay": barangay,
        }

        if(profile) {
          updatedData.profilePicture = profile
        }
    
      const updatedWorkerInfo = await User.findByIdAndUpdate(id, updatedData, { new: true });
        
        if(!updatedWorkerInfo) {
          return res.status(400).json({ success: false, message: "Error in Updating Worker Information."})
        }
        
      // Returns a success message if the worker info is updated
      res.status(200).json({ success: true, message: "Successfully Updated Worker Information!", updatedUser: updatedWorkerInfo})

    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error: ", error: error.message})
    }
};

// Appointments 
export const getWorkerAppointments = async (req, res) => {
  const id = req.userId
  try {
    // Extracts the worker information
    const worker = await Worker.findOne({ userId: new Object(id) });

      if(!worker){ 
        return res.status(404).json({ success: false, message: "Worker not Found."})
      }

        // Extracts the IDs of assigned appointments from the worker's data and stores them in an array.
        const appointmentIdArray = worker.assignedAppointments.map((appointment) => appointment.appointmentId);

        // Uses Promise.all to fetch data for multiple appointments at the same time.
        const appointmentInformation = await Promise.all(
          // Maps over the array of appointment IDs, retrieves detailed information for each, and stores it in a new array.
          appointmentIdArray.map(async (appointmentId) => {
            const { _id, customerFirstName, customerLastName, scheduleDetails, 
                    appointmentStatus, paymentStatus } = await Appointment.findById(appointmentId);
              
              // Slices the date to a more readable format (eg. 2025-01-01)
              let slicedDate ='';
                if(scheduleDetails.date instanceof Date){
                  slicedDate = scheduleDetails.date.toISOString().slice(0,10);
                }
                  return {
                    _id,
                    customerName: customerFirstName + " " + customerLastName,
                    scheduledDate: slicedDate,
                    scheduledTime: scheduleDetails.startTime,
                    appointmentStatus,
                    paymentStatus
                  };
          })
        );

          // Filters the array to get only those appointments within the range of 7 days.
          const upcomingAppointment = appointmentInformation.filter(appointment => {
            const appointmentDate = moment(appointment.scheduledDate);
            return appointmentDate.isBetween(moment(), moment().add(7, 'days'), 'day', []);
          })

            return res.status(200).json({ success: true, message: "Successfully Fetched Upcoming Appointments.", data: upcomingAppointment});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error.", error: error.message })
  }
};

// Scheduling 
export const editWorkerServiceInformation = async (req, res) => {
  const id = req.userId; // ID from the token
  const { serviceCategory, workerAvailability } = req.body;

    try {
      const worker = await Worker.findOne({ userId: new Object(id) }); // Gets the worker information from the id
      
        // Worker Validations
        if(!worker){
          return res.status(404).json({ success: false, message: "Worker not Found."})
        }

        // Checks if the worker still has assigned appointments 
        // if they want to change their service category
        if(worker.serviceCategory !== serviceCategory) {
          if(worker.assignedAppointments.length !== 0) {
            return res.status(400).json({ success: false, message: "Bad Request. Worker still has assigned appointments."})
          }
        }

      const updateWorkerServiceInfo = {
        "serviceCategory": serviceCategory,
        "workerAvailability.areaAssigned": workerAvailability.areaAssigned,
        "workerAvailability.day": workerAvailability.day,
        "workerAvailability.startTime": workerAvailability.startTime
      }

      // Updates the worker service info if it passes all validations.
      const updatedWorkerService = await Worker.findOneAndUpdate(
        { userId: id },
        updateWorkerServiceInfo,
        { new: true}
      )
    
        if(!updatedWorkerService){
          return res.status(400).json({ success: false, message: "Error in Updating Worker Service Information."})
        }

      // Returns a success message if the update is successful
      return res.status(200).json({ success: true, message: "Updated Worker Service Information.", updatedWorkerService});
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error", error: error.message})
    }
};


