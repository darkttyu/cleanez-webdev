import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String, 
      enum: [
        'Residential Cleaning',
        'Deep Cleaning',
        'Move In/Out Cleaning',
        'Post-Renovation Cleaning',
        'Office Cleaning',
        'Window Cleaning'
      ],
      unique: true,
      required: true
    },
    sizeOfArea: {
      type: [String],
      enum: [
        'Small Apartment',
        'Medium House',
        'Large House',
        'Small Office', 
        'Medium Office',
        'Large Office',
        'Full House',
        'Interior Window',
        'Exterior Window'
      ],
      required: true
    },
    numberOfWorkers: {
      type: [Number], 
      required: true
    },
    price: {
      type: [Number], 
      required: true
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export const Service = mongoose.model("Service", serviceSchema);
