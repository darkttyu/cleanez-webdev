import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // References the `Service` model
      required: true,
    },
    dateOfAppointment: {
      type: Date,
      required: true,
    },
    timeOfAppointment: {
      type: String,
      required: true,
    },
    assignedWorkers: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Worker", // References the `Worker` model
        required: true,
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
    appointmentStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
