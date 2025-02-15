// Logout function
export const logoutUser = (req, res) => {
   res.clearCookie("token", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: "strict", // prevents CSRF attacks
   });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
