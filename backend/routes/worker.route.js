import express from "express";
import { editWorkerAccountInformation, editWorkerServiceInformation, getWorkerAccountInformation, getWorkerAppointments, getWorkerDetails, markAppointmentAsPaid, viewWorkerAppointment } from "../controllers/worker.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProfile } from "../middleware/profileUpload.js";

const router = express.Router();

// Profile
router.get("/getWorkerAccountInformation", verifyToken, getWorkerAccountInformation);
router.get("/getWorkerDetails", verifyToken, getWorkerDetails)
router.put("/editWorkerAccountInformation", verifyToken, uploadProfile, editWorkerAccountInformation);

// Appointments
router.get("/getWorkerAppointments", verifyToken, getWorkerAppointments);
router.get("/viewWorkerAppointment/:id", verifyToken, viewWorkerAppointment)
router.put("/markAppointmentAsPaid/:id", verifyToken, markAppointmentAsPaid);

// Scheduling 
router.put("/editWorkerServiceInformation", verifyToken, editWorkerServiceInformation);

// Earnings 

export default router;