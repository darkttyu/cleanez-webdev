import express from 'express';
import { forgotPassword, login, logout, signup, verifyEmail, resetPassword, checkAuth, adminLogin, adminLogout} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//User Auth Routes
router.get("/check-auth", verifyToken, checkAuth)
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Admin Auth Routes
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);

export default router;