import { UserModel } from "../../models/userModel/userModel.js";

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      data: users,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { getAllUsers };
