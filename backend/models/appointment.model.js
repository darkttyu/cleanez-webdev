import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the `User` model
      required: true,
    },
    customerFirstName: {
      type: String,
      required: true,
      maxlength: 20,
    },
    customerLastName: {
      type: String,
      required: true,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 11,
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
      },
    },
    serviceDetails: {
      serviceCategory: {
        type: String, 
        required: true
      },
      sizeOfArea: {
        type: String, 
        required: true
      },
      numberOfWorkers: {
        type: Number, 
        required: true
      },
      numberOfWindows: {
        type: Number, 
        default: 0
      }
    },
    scheduleDetails: {
      date: {
        type: Date, 
        required: true
      },
      startTime: {
        type: String, 
        required: true
      }
    },
    assignedWorkers: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Worker", // References the `Worker` model
        required: true,
      },
    serviceCost: {
      type: Number,
      required: true,
    },
    appointmentStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
      required: true
    }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
