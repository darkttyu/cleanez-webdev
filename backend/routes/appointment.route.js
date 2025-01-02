import express from 'express';
import { setAppointment, getServices, getSpecificService } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/setAppointment", verifyToken ,setAppointment);
router.get("/getServices", getServices);
router.get("/getSpecificService/:id", getSpecificService);


export default router;