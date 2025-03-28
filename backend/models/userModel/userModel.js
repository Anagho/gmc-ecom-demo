import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      trim: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String, 
    resetPasswordExpiresAt: Date,
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

export { UserModel };
