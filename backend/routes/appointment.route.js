import express from 'express';
import { setAppointment, getServices, getSpecificService } from '../controllers/appointment.controller.js';

const router = express.Router();

router.post("/setAppointment", setAppointment);
router.get("/getServices", getServices);
router.get("/getSpecificService/:id", getSpecificService);

export default router;