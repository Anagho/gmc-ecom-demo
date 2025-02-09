import express from "express";
import {
  registerUser,
  verifyEmail,
} from "../controllers/authController/registerUsers.js";
import { loginUser } from "../controllers/authController/loginUser.js";
import { logoutUser } from "../controllers/authController/logoutUser.js";
import { forgotPassword } from "../controllers/authController/forgotPassword.js";
import { resetPassword } from "../controllers/authController/resetPassword.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAuth } from "../controllers/authController/checkAuth.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
