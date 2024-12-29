import mongoose from "mongoose";
import { User } from "./user.model.js";

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
  serviceCategory: {
    type: String, 
    enum: ['Residential Cleaning', 'Deep Cleaning', 'Move In/Out Cleaning', 'Post-Renovation Cleaning', 'Office Cleaning', 'Window Cleaning'],
    required: true
  },
  isApplicantVerified: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: "Pending", required: true },
  totalEarnings: { type: Number, default: 0.00 },
  rating: { type: Number, default: 0.00 },
  workSchedule: { type: [String], required: true },
  timeRange: { type: [String], required: true }
});

export const Worker = mongoose.model("Worker", workerSchema)