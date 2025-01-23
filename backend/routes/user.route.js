import express from "express";
import { cancelAppointment, editAccountInformation, getAccountInformation, getAllUserAppointments, 
        rateAppointment,setAppointmentAsCompleted, viewAppointment, 
        viewAppointmentHistory
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProfile } from "../middleware/profileUpload.js";

const router = express.Router();

// Profile
router.get("/getAccountInformation", verifyToken, getAccountInformation);
router.put("/editAccountInformation", verifyToken, uploadProfile, editAccountInformation);

// Dashboard
router.get("/getAllUserAppointments", verifyToken, getAllUserAppointments);
router.get("/viewAppointment/:id", viewAppointment);
router.put("/setAppointmentAsCompleted/:id", setAppointmentAsCompleted);
router.put("/cancelAppointment/:id", cancelAppointment);
router.post("/rateAppointment/:id", rateAppointment);

// Appointment 
router.get("/viewAppointmentHistory", verifyToken, viewAppointmentHistory);

export default router;