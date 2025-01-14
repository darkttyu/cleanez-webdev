import express from "express";
import { getAccountInformation } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getAccountInformation", verifyToken, getAccountInformation);

export default router;