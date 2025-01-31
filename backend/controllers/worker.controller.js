import { fetchAppointments, fetchWorker, fetchWorkerDetails, markAppointment, 
  updateWorker, updateWorkerService, viewAppointment } from "../services/worker.service.js";

// Profile
export const getWorkerAccountInformation = async (req, res) => {
  try {
    const worker = await fetchWorker(req.userId);
    return res.status(200).json({success: true, message: "Fetched User Information", user: worker});
  } catch (error) {
    return res.status(400).json({success: false, message: error.message });
  }
};

export const getWorkerDetails = async (req, res) => {
  try {
    const workerDetails = await fetchWorkerDetails(req.userId);
    return res.status(200).json({success: true, message: "Fetched Worker Information.", worker: workerDetails})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
};

export const editWorkerAccountInformation = async (req, res) => {
    try {
      const accountInfo = JSON.parse(req.body.accInfo);
      const updatedWorker = await updateWorker(req.userId, accountInfo, req.files?.profile); // Data from multipart-form
      // Returns a success message if the worker info is updated
      res.status(200).json({ success: true, message: "Successfully Updated Worker Information!", updatedUser: updatedWorker})

    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
};

// Appointments 
export const getWorkerAppointments = async (req, res) => {
  try {
    const upcomingAppointments =  await fetchAppointments(req.userId);
    return res.status(200).json({ success: true, message: "Successfully Fetched Upcoming Appointments.", data: upcomingAppointments});
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
};

export const viewWorkerAppointment = async (req, res) => {
    try {
      const appointment = await viewAppointment(req.params.id);
      
      return res.status(200).json({ success: true, message: "Successfully Viewed Appointment.", data: appointment });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message })
    }
};

export const markAppointmentAsPaid = async (req, res) => {

  try {
    const markedAppointment = await markAppointment(req.params.id)

    return res.status(200).json({ success: true, message: "Appointment Mark as Paid. Worker earnings are distributed.", data: markedAppointment });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Scheduling 
export const editWorkerServiceInformation = async (req, res) => {
    try {
      const updatedWorkerService = await updateWorkerService(req.userId, req.body);

      // Returns a success message if the update is successful
      return res.status(200).json({ success: true, message: "Updated Worker Service Information.", updatedWorkerService});
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message })
    }
};


