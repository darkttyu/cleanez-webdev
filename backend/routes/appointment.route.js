import express from 'express';
import { setAppointment, getServices, getSpecificService, testEmailBooking, getAvailableWorkers, getWorkerInformation, testValidAppointments } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Main Routes
router.post("/setAppointment", verifyToken ,setAppointment);
router.get("/getServices", getServices);
router.get("/getSpecificService/:id", getSpecificService);
router.post("/getAvailableWorkers", getAvailableWorkers)

router.get("/getWorkerInformation/:id", getWorkerInformation);

// Backend Testing
router.post("/testEmailBooking", testEmailBooking);
router.post("/testValidAppointments", verifyToken, testValidAppointments);

export default router;