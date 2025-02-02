import { UserModel } from "../../models/userModel/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
  const { email, name, password } = req.body;

  if (validator.isEmpty(name, { ignore_whitespace: true })) {
    return res
      .status(400)
      .json({ message: "Please provide your name", status: "failed" });
  }

  if (validator.isEmail(email) === false) {
    return res
      .status(400)
      .json({
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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // register user here
  try {
    const user = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    await user.save();

    res.status(201).json({ message: "Account created successfully", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { registerUser };
