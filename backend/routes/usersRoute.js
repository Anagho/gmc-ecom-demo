import express from "express";
import { getAllUsers } from "../controllers/userController/getusers.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

export default router;
