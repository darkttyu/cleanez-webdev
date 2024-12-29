import express from 'express';
import { addUser, addWorker, clickedUser, deleteUser, editUserInfo, findAllUsers, softDeleteUser } from '../controllers/admin.controller.js';

const router = express.Router();


// Dashboard Tab

// Appointments Tab

// Applicants Tab

// Worker Tab
router.get("/findAllWorkers", findAllUsers);
router.post("/addWorker", addWorker);

// User Tab
router.get("/findAllUsers", findAllUsers); // Retrieves all user information
router.post("/addUser", addUser); // Directly Creates a new user
router.get("/clickedUser/:id", clickedUser); // Reads and Retrieves specific user data upon profile clicking
router.put("/editUserInfo/:id", editUserInfo); // Updates User Information
router.delete("/deleteUser/:id", deleteUser); // Deletes User Entirely from the Database
router.put("/softDeleteUser/:id", softDeleteUser); // Sets Status of User to Inactive

export default router;