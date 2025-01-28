import express from 'express';
import { addUser, addWorker, clickedUser, deleteUser, editUserInfo, 
  findAllUsers, findAllWorkers, clickedWorker, editWorkerSchedule, 
  deleteWorker, insertService, 
  getWorkerCount, getAllApplicants, getClickedApplicant, acceptApplicant, rejectApplicant,
  getUserDetails,
  updateWorkerStatus,
  updateUserStatus
} from '../controllers/admin.controller.js';
import { uploadProfile } from "../middleware/profileUpload.js";

const router = express.Router();

// Dashboard Tab
router.get("/getWorkerCount", getWorkerCount);

// Appointments Tab

// Applicants Tab

// Worker Tab
router.get("/findAllWorkers", findAllWorkers);

router.get("/getUserDetails", getUserDetails);
router.post("/addWorker", addWorker);

router.get("/clickedWorker/:id", clickedWorker);
router.put("/editWorkerSchedule/:id", editWorkerSchedule);
router.put("/updateWorkerStatus/:id", updateWorkerStatus);
router.delete("/deleteWorker/:id", deleteWorker);

// User Tab
router.get("/findAllUsers", findAllUsers); // Retrieves all user information
router.post("/addUser", addUser); // Directly Creates a new user
router.get("/clickedUser/:id", clickedUser); // Reads and Retrieves specific user data upon profile clicking
router.put("/editUserInfo/:id", uploadProfile, editUserInfo); // Updates User Information
router.delete("/deleteUser/:id", deleteUser); // Deletes User Entirely from the Database
router.put("/updateUserStatus/:id", updateUserStatus); // Sets Status of User to Inactive

// router.put("/addField", addField);
// router.put("/updateProfile", uploadProfile, updateProfile)

// Service 
router.post("/insertService", insertService);

// Applicants
router.get("/getAllApplicants", getAllApplicants);
router.get("/getApplicant/:id", getClickedApplicant);
router.put("/acceptApplicant/:id", acceptApplicant);
router.put("/rejectApplicant/:id", rejectApplicant);

export default router;