import express from "express";
import { registerUser, verifyEmail } from "../controllers/userController/registerUsers.js";
import { loginUser } from "../controllers/userController/loginUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", (req, res) => {
    res.send("logout route")
})

router.post("/verify-email", verifyEmail)


export default router;
