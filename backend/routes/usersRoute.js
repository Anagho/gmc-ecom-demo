import express from "express";
import { getAllUsers } from "../controllers/userController/getUsers.js";
import { getUserInfo } from "../controllers/userController/getSingleUserInfo.js";

const router = express.Router();

router.get("/all-users", getAllUsers);
router.get("/user-info/:userId", getUserInfo)

export default router;
