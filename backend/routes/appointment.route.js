import express from 'express';
import { setAppointment, getServices, getSpecificService, testEmailBooking } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Main Routes
router.post("/setAppointment", verifyToken ,setAppointment);
router.get("/getServices", getServices);
router.get("/getSpecificService/:id", getSpecificService);


// Backend Testing
// router.post("/testEmailBooking", testEmailBooking);

export default router;