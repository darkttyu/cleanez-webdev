import express from "express";
import { editWorkerAccountInformation, editWorkerServiceInformation, getWorkerAccountInformation, getWorkerAppointments } from "../controllers/worker.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProfile } from "../middleware/profileUpload.js";
import { verify } from "crypto";

const router = express.Router();

// Profile
router.get("/getWorkerAccountInformation", verifyToken, getWorkerAccountInformation);
router.put("/editWorkerAccountInformation", verifyToken, uploadProfile, editWorkerAccountInformation);

// Appointments
router.get("/getWorkerAppointments", verifyToken, getWorkerAppointments);

// Scheduling 
router.put("/editWorkerServiceInformation", verifyToken, editWorkerServiceInformation);

// Earnings 

export default router;