import { UserModel } from "../../models/userModel/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../../mailtrap/emails.js";

async function registerUser(req, res) {
  const { email, name, password } = req.body;

  if (validator.isEmpty(name, { ignore_whitespace: true })) {
    return res
      .status(400)
      .json({ message: "Please provide your name", status: "failed" });
  }

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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // Check if a user already exists
    const userAlreadyExist = await UserModel.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
        success: "false",
        status: "failed",
      });
    }

    // Token to verify a user during signup
    const verificationToken = generateVerificationToken();

    // register user here
    const user = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hrs, 1000 is one milli seconds
    });
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      status: "success",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

async function verifyEmail(req, res) {
  // 1 2 3 4 5 6
  const { code } = req.body;
  try {
    const user = await UserModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code"})
    }

    user.isVerified = true;
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save();

    await sendWelcomeEmail(user.email, user.name)

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    console.log("Error in verifyEmail", error)
    res.status(500).json({ message: "Server error", status: "failed", success: false})
    
  }
}

export { registerUser, verifyEmail };
