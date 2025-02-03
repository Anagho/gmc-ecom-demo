import { UserModel } from "../../models/userModel/userModel.js";

async function getUserInfo(req, res) {
  const params = req.params;

  try {
    const userInfo = await UserModel.findOne({ _id: params.userId });
    console.log(userInfo);

    res.status(200).json({ data: userInfo, status: "successful" });
  } catch (error) {
    res.status(400).json({ data: error, status: "failed" });
  }
}

export { getUserInfo };
