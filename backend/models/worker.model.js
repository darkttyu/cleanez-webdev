import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' , 
    required: true },
  serviceCategory: {
    type: String, 
    enum: ['Residential Cleaning', 'Deep Cleaning', 'Move In/Out Cleaning', 
      'Post-Renovation Cleaning', 'Office Cleaning', 'Window Cleaning'],
    required: true
  },
  isApplicantVerified: { 
    type: String, 
    enum: ['Pending', 'Verified', 'Rejected'], 
    default: "Pending", 
    required: true 
  },
  assignedAppointments: {
    appointmentId: { 
      type: [mongoose.Schema.Types.ObjectId], 
      ref: 'Appointment', 
      default: []
    },
    date: {
      type: [Date], 
      default: []
    },
    timeSlot: {
      type: [String],
      default: []
    }
  },
  workerAvailability: {
    day: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    timeSlot: {
      type: [String],
      required: true
    }
  },
  totalEarnings: { 
    type: Number, 
    default: 0.00 },
  rating: { 
    type: Number, 
    default: 0.00 
  },
});

export const Worker = mongoose.model("Worker", workerSchema)