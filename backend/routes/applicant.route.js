import express from 'express';
import fileUpload from '../middleware/fileUpload.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { submitApplicationForm  } from '../controllers/applicant.controller.js';

const router = express.Router();

router.post("/submitApplicationForm", fileUpload.single('resume'), verifyToken, submitApplicationForm)

export default router;