import express from "express";
import { registerUser, verifyEmail } from "../controllers/authController/registerUsers.js";
import { loginUser } from "../controllers/authController/loginUser.js";
import { logoutUser } from "../controllers/authController/logoutUser.js";
import { forgotPassword } from "../controllers/authController/forgotPassword.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword)


export default router;
