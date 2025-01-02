import { Service } from "../models/service.model.js";
import { Worker } from "../models/worker.model.js";
import { User } from "../models/user.model.js";
import { Appointment } from "../models/appointment.model.js";

// Done before clicking the book now, assigns ID to all Services 
export const getServices = async (req, res) => {
  try {
    // Gets all the Service information and is Stored in an Array of Objects
    const serviceList = await Service.find()
    console.log(JSON.stringify(serviceList, null, 2)); // Used for readability of the address since only [Object] is displayed without it

    if(!serviceList) {
      return res.status(404).json({ success: false, message: "Services not found" });
    }
    return res.status(200).json({success: true, message: "Successfully Fetched Service List", services: serviceList});

  } catch (error) {
    console.log("Error in Fetching Services Information", error);
    return res.status(500).json({success:false, message:"Server Error"});

  }
  
};

// Requested upon user clicking Book Now on a specific service
export const getSpecificService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById({ _id: new Object(id)});

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    return res.status(200).json({success: true, message: "Successfully Fetched Service Information", data: service});

  } catch (error) {
    console.log("Error in Fetching Services Information", error);
    return res.status(500).json({success:false, message:"Server Error"});
  }
}

export const getAssignedWorkers = async (req, res) => {
  const { assignedWorkers } = req.body;

  try {
    const workers = await Worker.find({ _id: { $in: assignedWorkers}});

    if(!workers) {
      return res.status(404).json({ success: false, message: "Workers not found" });
    }
    
    console.log("Assigned Worker Details: ", JSON.stringify(workersz, null, 2));
    return res.status(200).json({ success: true, message: "Successfully Fetched Worker Information", workers: workers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const setAppointment = async (req, res) => {
  const { customerFirstName, customerLastName, phoneNumber, 
    address, serviceDetails, scheduleDetails, 
    assignedWorkers, serviceCost} = req.body;

    // console.log("Received request Body: ", req.body);
  
  // Fetching all Assigned Workers
  try {
    if(!customerFirstName || !customerLastName || !phoneNumber || !address || !serviceDetails || !scheduleDetails || !assignedWorkers || !serviceCost){
      return res.status(400).json({ message: "Please fill up all fields" });
    }

    const userId = req.userId; // Extracting the userId from the request object

    const newAppointment = new Appointment({
      userId,
      customerFirstName,
      customerLastName,
      phoneNumber,
      address,
      serviceDetails,
      scheduleDetails,
      assignedWorkers,
      serviceCost
    });
   
    const savedAppointment = await newAppointment.save();

    for (const workerId of assignedWorkers) {
      await Worker.findByIdAndUpdate(
        workerId, {
          $push: {
            'assignedAppointments.appointmentId': savedAppointment._id, 
            'assignedAppointments.date': scheduleDetails.date,
            'assignedAppointments.startTime': scheduleDetails.startTime
          }
        },
          { new: true }
      )
    };


    return res.status(201).json({ success: true, message: "Appointment has been booked successfully!" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  
};