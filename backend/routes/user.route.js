import express from "express";
import { editAccountInformation, getAccountInformation, getAllUserAppointments, viewAppointment } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProfile } from "../middleware/profileUpload.js";

const router = express.Router();

// Profile
router.get("/getAccountInformation", verifyToken, getAccountInformation);
router.post("/editAccountInformation", verifyToken, uploadProfile, editAccountInformation);

// Dashboard
router.get("/getAllUserAppointments", verifyToken, getAllUserAppointments);
router.get("/viewAppointment/:id", viewAppointment);

export default router;