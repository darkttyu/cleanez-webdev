import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    maxlength: 10,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6,
  },
  role: {
    type: String,
    default: "Admin",
  },
  lastLogin: {
    type: Date, 
    default: Date.now,
  },

}, {timestamps: true});

export const Admin = mongoose.model("Admin", adminSchema);

