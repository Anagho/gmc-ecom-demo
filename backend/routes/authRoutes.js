import express from "express";
import { registerUser } from "../controllers/userControllers/registerUsers.js";
import { loginUser } from "../controllers/userControllers/loginUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
