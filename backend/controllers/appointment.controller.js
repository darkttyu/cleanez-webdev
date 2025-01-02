// Importing necessary models from the models directory.
import { Service } from "../models/service.model.js";
import { Worker } from "../models/worker.model.js";
import { User } from "../models/user.model.js";
import { Appointment } from "../models/appointment.model.js";

/**
 * Fetches all the available services from the database.
 * This function is executed when the user requests to view all services.
 * It returns a list of services available in the system.
 */
export const getServices = async (req, res) => {
  try {
    // Retrieves all the service documents from the database.
    const serviceList = await Service.find();

    // Logs the service list for debugging and readability purposes.
    console.log(JSON.stringify(serviceList, null, 2)); // Used for better readability of the output.

    // If no services are found, responds with a 404 status code and an appropriate message.
    if (!serviceList) {
      return res.status(404).json({ success: false, message: "Services not found" });
    }

    // If services are found, responds with a 200 status code and the service data.
    return res.status(200).json({ success: true, message: "Successfully Fetched Service List", services: serviceList });

  } catch (error) {
    // If there's an error in fetching the service data, logs the error and returns a 500 status code with an error message.
    console.log("Error in Fetching Services Information", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Fetches information for a specific service based on the provided ID.
 * This function is executed when a user selects a specific service to book.
 */
export const getSpecificService = async (req, res) => {
  // Extracts the service ID from the request parameters.
  const { id } = req.params;

  try {
    // Retrieves the service document by ID from the database.
    const service = await Service.findById({ _id: new Object(id) });

    // If the service is not found, returns a 404 error.
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // If the service is found, responds with the service details.
    return res.status(200).json({ success: true, message: "Successfully Fetched Service Information", data: service });

  } catch (error) {
    // If there's an error while fetching the service, logs the error and returns a 500 status code with an error message.
    console.log("Error in Fetching Services Information", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Creates a new appointment in the system by validating the schedule details and assigning workers.
 * This function is triggered when a user books an appointment.
 */
export const setAppointment = async (req, res) => {
  // Destructures the required fields from the request body.
  const { customerFirstName, customerLastName, phoneNumber, address, serviceDetails, scheduleDetails, assignedWorkers, serviceCost } = req.body;

  // Loops through each worker ID to check if there are any scheduling conflicts.
  for (const workerId of assignedWorkers) {
    // Retrieves the worker document from the database using the worker ID.
    const worker = await Worker.findById(workerId).lean();

    // If the worker is not found or does not have assigned appointments, it skips the check.
    if (!worker || !worker.assignedAppointments) {
      continue;
    }

    // Checks if any appointment exists with the same date and start time as the new schedule.
    const isConflict = worker.assignedAppointments.some(appointment => 
      new Date(appointment.date).toISOString() === new Date(scheduleDetails.date).toISOString() && 
      appointment.startTime === scheduleDetails.startTime
    );

    // If there's a conflict, responds with a 400 status and a conflict message.
    if (isConflict) {
      return res.status(400).json({ message: "Worker is already assigned to an appointment at this time" });
    }
  }

  try {
    // Validates if all required fields are provided in the request body.
    if (!customerFirstName || !customerLastName || !phoneNumber || !address || !serviceDetails || !scheduleDetails || !assignedWorkers || !serviceCost) {
      return res.status(400).json({ message: "Please fill up all fields" });
    }

    // Extracts the user ID from the request object.
    const userId = req.userId;

    // Creates a new appointment document.
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

    // Saves the appointment document to the database.
    const savedAppointment = await newAppointment.save();

    // Updates each assigned worker with the new appointment ID.
    for (const workerId of assignedWorkers) {
      await Worker.findByIdAndUpdate(
        workerId, 
        {
          $push: {
            assignedAppointments: {
              appointmentId: savedAppointment._id, // Associates the appointment with the worker
              date: scheduleDetails.date, // The date of the appointment
              startTime: scheduleDetails.startTime // The start time of the appointment
            }
          }
        },
        { new: true }
      );
    }

    // Responds with a 201 status and a success message if the appointment is booked successfully.
    return res.status(201).json({ success: true, message: "Appointment has been booked successfully!" });

  } catch (error) {
    // If there's an error during the appointment creation process, returns a 500 status with an error message.
    return res.status(500).json({ success: false, message: error.message });
  }
};
