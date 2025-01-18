import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";

// Profile
export const getAccountInformation = async (req, res) => {
  const id = req.userId;

  try {
    const user = await User.findById({_id: new Object(id)});

    if(!user) {
      return res.status(400).json({success: false, message: "Error in Fetching User Information."});
    }

    return res.status(200).json({success: true, message: "Fetched User Information", user: user});

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const editAccountInformation = async (req, res) => {
  // Gets the user id by from the localStorage and token
  const id = req.userId

  let { profile } = req.files;
  const { birthDate, gender, phoneNumber, email, block, province, municipal, barangay} = req.body;

    try {
      // Checks if the user exists
      const currentUser = await User.findOne({_id: new Object(id)})

      if(!currentUser) {
        res.status(404).json({ success:false, message:"User does not exist", error: error.message });
      }

      profile = {
        data: profile[0].buffer, // Store profile picture buffer
        contentType: profile[0].mimetype // Store profile picture's MIME type
      };

      // Updates the user info based on the id and the updated user info
      const updatedUserInfo = await User.findByIdAndUpdate(
        id, 
        {
          profilePicture: profile, 
          email,
          birthDate,
          gender,
          phoneNumber, 
          "address.block": block,
          "address.province": province,
          "address.municipal": municipal,
          "address.barangay": barangay,
        },
        { new: true}
      );
    
        if(!updatedUserInfo) {
          return res.status(400).json({success: false, message: "Failed to update user."})
        }
        
        // Returns a success message if the user info is updated
        res.status(200).json({success: true, message: "Successfully Updated User Information!", updatedUser: updatedUserInfo})

    } catch (error) {
      res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

// Appointment 
export const getAllUserAppointments = async (req, res) => {
  const id = req.userId;

  try {
    // Gets the total number of appointments made by the user, whether cancelled or completed
    const userAppointmentCount = await Appointment.countDocuments({userId: new Object(id)})
    if(userAppointmentCount === 0) {
      return res.status(400).json({success: true, message: "User has not set an appointment.", data: userAppointmentCount})
    }

    // Gets the total number of completed appointments by the user.
    const completeAppointmentCount = await Appointment.countDocuments({userId: new Object(id), appointmentStatus: "Completed", paymentStatus: "Completed"})
    if(userAppointmentCount === 0) {
      return res.status(400).json({success: true, message: "User has not completed any Appointments.", data: completeAppointmentCount})
    }

    // Gets the upcoming appointments within the 7-day period.
    const userAppointments = await Appointment.find({userId: new Object(id)});
    const upcomingAppointment = userAppointments.filter(appointment => {
      const appointmentDate = moment(appointment.scheduleDetails.date);
      return appointmentDate.isBetween(moment(), moment().add(7, 'days'), 'day', '[]'); // isBetween arguments are start, end, unit, and inclusive [], () means exclusive
    });

    const userAppointmentDetails = {
      userAppointmentCount,
      completeAppointmentCount,
      upcomingAppointment
    }
    
    return res.status(200).json({success: true, message: "Successfully Fetched All User Appointments.", data: userAppointmentDetails})
  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message})
  }
};

export const viewAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  let appointmentInformation = await Appointment.findById(appointmentId).lean();

  if(!appointmentInformation) {
    return res.status(404).json({success: false, message: "Appointment Information Does Not Exist.", data: appointmentInformation});
  }

  const assignedWorkersNames = [];

  console.log(appointmentInformation)
  // Loops through each worker ID to retrieve the workers full names and returns it as an array.
  for (const workerId of appointmentInformation.assignedWorkers) {
    const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database.
          
        console.log(worker)
        if (!worker) {
          return res.status(400).json({success: false, message: "Worker Not Found.", error: error.message})
        }
          
        const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker

        if (!user) {
          return res.status(400).json({success: false, message: "User Not Found.", error: error.message})
        }
          
        const { firstName, lastName } = user;
        assignedWorkersNames.push(`${firstName} ${lastName}`);
    }
    
    appointmentInformation = {
      ...appointmentInformation,
      assignedWorkers: assignedWorkersNames
    }
    return res.status(200).json({success: true, message: "Fetched Specific Appointment Information.", data: appointmentInformation});
};

export const setAppointmentAsCompleted = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};