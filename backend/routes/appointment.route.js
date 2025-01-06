import express from 'express';
import { setAppointment, getServices, getSpecificService, testEmailBooking, getAvailableWorkers } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Main Routes
router.post("/setAppointment", verifyToken ,setAppointment);
router.get("/getServices", getServices);
router.get("/getSpecificService/:id", getSpecificService);
router.post("/getAvailableWorkers", getAvailableWorkers)


// Backend Testing
router.post("/testEmailBooking", testEmailBooking);

export default router;