import express from 'express';
import { addUser, findAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();

//Admin Routes
router.get("/findAllUsers", findAllUsers);
router.post("/addUser", addUser);

export default router;