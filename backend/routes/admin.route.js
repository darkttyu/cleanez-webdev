import express from 'express';
import { addUser, clickedUser, deleteUser, editUserInfo, findAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();

//Admin Routes
router.get("/findAllUsers", findAllUsers); // Retrieves all user information
router.post("/addUser", addUser); // Directly Creates a new user
router.get("/clickedUser/:id", clickedUser); // Reads and Retrieves specific user data upon profile clicking
router.put("/editUserInfo/:id", editUserInfo) // Updates User Information
router.delete("/deleteUser/:id", deleteUser); // Deletes User Entirely from the Database

export default router;