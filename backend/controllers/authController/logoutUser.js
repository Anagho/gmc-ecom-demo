// Logout function
export const logoutUser = (req, res) => {
   res.clearCookie("token", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-origin cookies
   });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
