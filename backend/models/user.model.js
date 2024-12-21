import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    maxlength: 50,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6,
  },
  firstName: {
    type: String, 
    required: true, 
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true, 
    maxlength: 30
  },
  phoneNumber: {
    type: String,
    required: true, 
    match: /^[0-9]{11}$/,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    block: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    municipal: {
      type: String, 
      required: true,
    },
    barangay: {
      type: String, 
      required: true,
    }
  },
  role: {
    type: String,
    enum: ["User", "Worker", "Admin"],
    default: "User",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date, 
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date, 
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);