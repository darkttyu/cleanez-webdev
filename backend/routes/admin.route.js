import express from 'express';
import { findAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();

//Admin Routes
router.get("/findAllUsers", findAllUsers);

export default router;