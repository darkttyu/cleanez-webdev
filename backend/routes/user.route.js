import express from "express";
import { cancelAppointment, editAccountInformation, getAccountInformation, getAllUserAppointments, 
        rateAppointment,setAppointmentAsCompleted, viewAppointment } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProfile } from "../middleware/profileUpload.js";

const router = express.Router();

// Profile
router.get("/getAccountInformation", verifyToken, getAccountInformation);
router.put("/editAccountInformation", verifyToken, uploadProfile, editAccountInformation);

// Dashboard
router.get("/getAllUserAppointments", verifyToken, getAllUserAppointments);
router.get("/viewAppointment/:id", viewAppointment);
router.get("/setAppointmentAsCompleted/:id", setAppointmentAsCompleted);
router.get("/cancelAppointment/:id", cancelAppointment);
router.post("/rateAppointment/:id", rateAppointment);

export default router;