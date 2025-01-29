import { UserModel } from "../../models/userModel/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (validator.isEmail(email) === false) {
    return res.status(400).json({
      message: "Please provide a valid email address",
      status: "failed",
    });
  }

  if (
    validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUpperCase: 1,
    }) === false
  ) {
    return res
      .status(400)
      .json({ message: "Please provide a strong password", status: "failed" });
  }
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

    if (user === null) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    //   compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    user.password = undefined
    res.status(200).json({ user, status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { loginUser };
