import { UserModel } from "../../models/userModel/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie.js";

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

    // If a user is not found
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user === null) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //   compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token and set the cookie
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    // save the user info again to the database
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      status: "success",
    });
  } catch (error) {
    console.log("Error in login", error);
    res
      .status(400)
      .json({ success: false, message: error.message, status: "failed" });
  }
}

export { loginUser };
