import express from 'express';
import { addUser, clickedUser, findAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();

//Admin Routes
router.get("/findAllUsers", findAllUsers); // Retrieves all user information
router.post("/addUser", addUser); // Directly creates a new user
router.get("/clickedUser/:id", clickedUser); // Retrieves specific user data upon profile clicking

export default router;