import { fetchAppointments, fetchUser, insertAppointmentRating, markAppointmentAsCancelled, markAppointmentAsComplete, updateUser, viewAllAppointments, viewUserAppointment } from "../services/user.service.js";

// Profile
export const getAccountInformation = async (req, res) => {
  try {
    const user = await fetchUser(req.userId);
    return res.status(200).json({ success: true, message: "Fetched User Information", user: user });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const editAccountInformation = async (req, res) => {
    try {
      const accountInfo = JSON.parse(req.body.accInfo);
      const updatedUser = await updateUser(req.userId, accountInfo, req.files?.profile);
      // Returns a success message if the user info is updated
      res.status(200).json({success: true, message: "Successfully Updated User Information!", updatedUser: updatedUser})

    } catch (error) {
      res.status(400).json({success: false, message: error.message})
    }
};

// Dashboard
export const getAllUserAppointments = async (req, res) => {
    try {
      const allAppointmentInformation = await fetchAppointments(req.userId);
        if(allAppointmentInformation.length === 0){
          return res.status(404).json({success: false, message: "There are no upcoming appointments.", data: []});
        } 

      return res.status(200).json({success: true, message: "Successfully Fetched All Upcoming Appointments.", data: allAppointmentInformation})
    } catch (error) {
      return res.status(400).json({success: false, message: error.message})
    }
};

export const viewAppointment = async (req, res) => {
  try {
    const appointment = await viewUserAppointment(req.params.id);
      if(appointment.length === 0){
        return res.status(404).json({success: false, message: "Appointment Not Found.", data: []});
      }

    return res.status(200).json({success: true, message: "Fetched Specific Appointment Information.", data: appointment});
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
};

export const setAppointmentAsCompleted = async (req, res) => {
  try {
    const markedAppointment = await markAppointmentAsComplete(req.params.id);
    return res.status(200).json({success: true, message: "Appointment Marked as Completed.", data: markedAppointment})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await markAppointmentAsCancelled(req.params.id);
    return res.status(200).json({ success: true, message: "Successfully Cancelled the Appointment.", data: appointment })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const rateAppointment = async (req, res) => {

  try {
    const ratedAppointment = await insertAppointmentRating(req.body, req.params.id)
    return res.status(200).json({success: true, message: "Worker Rating Updated.", data: ratedAppointment});
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
};

// Appointments
export const viewAppointmentHistory = async (req, res) => {
    try {
      const userAppointments = await viewAllAppointments(req.userId);
        if(userAppointments.length === 0){
          return res.status(404).json({success: false, message: "Empty Appointment History", appointments: []})
        }      
      return res.status(200).json({ success: true, message: "Appointment History Fetched Successfully.", appointments: userAppointments})

    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error.", error: error.message})
    }
};