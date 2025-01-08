import express from 'express';
import { uploadDocuments } from '../middleware/fileUpload.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { submitApplicationForm  } from '../controllers/applicant.controller.js';

const router = express.Router();

router.post("/submitApplicationForm", uploadDocuments, verifyToken, submitApplicationForm)

export default router;