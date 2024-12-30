import express from 'express';
import { addUser, addWorker, clickedUser, deleteUser, editUserInfo, findAllUsers, softDeleteUser, findAllWorkers, clickedWorker, editWorkerSchedule, deleteWorker, softDeleteWorker, setWorkerToActive, setUserToActive } from '../controllers/admin.controller.js';

const router = express.Router();


// Dashboard Tab

// Appointments Tab

// Applicants Tab

// Worker Tab
router.get("/findAllWorkers", findAllWorkers);
router.post("/addWorker", addWorker);
router.get("/clickedWorker/:id", clickedWorker);
router.put("/editWorkerSchedule/:id", editWorkerSchedule);
router.delete("/deleteWorker/:id", deleteWorker);
router.put("/softDeleteWorker/:id", softDeleteWorker);
router.put("/setWorkertoActive/:id", setWorkerToActive);

// User Tab
router.get("/findAllUsers", findAllUsers); // Retrieves all user information
router.post("/addUser", addUser); // Directly Creates a new user
router.get("/clickedUser/:id", clickedUser); // Reads and Retrieves specific user data upon profile clicking
router.put("/editUserInfo/:id", editUserInfo); // Updates User Information
router.delete("/deleteUser/:id", deleteUser); // Deletes User Entirely from the Database
router.put("/softDeleteUser/:id", softDeleteUser); // Sets Status of User to Inactive
router.put("/setUserToActive/:id", setUserToActive);

export default router;