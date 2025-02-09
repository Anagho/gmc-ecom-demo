import bcrypt from "bcryptjs";
import { UserModel } from "../../models/userModel/userModel.js";
import { sendResetSuccessEmail } from "../../mailtrap/emails.js";

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    console.log(user)

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully"})
  } catch (error) {
    console.log("Error in resetPassword", error)
    res.status(400).json({ success: false, message: error.message})
  }
};
