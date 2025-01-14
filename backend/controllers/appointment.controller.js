// Importing necessary models from the models directory.
import { Service } from "../models/service.model.js";
import { Worker } from "../models/worker.model.js";
import { User } from "../models/user.model.js";
import { Appointment } from "../models/appointment.model.js";
import { sendUserAppointmentConfirmation, sendWorkerAppointmentConfirmation } from "../nodemailer/sendMail.js";
import { response } from "express";

const formatTime = (time) => {
  // Extract hours and minutes from the input time
  let hours = parseInt(time.substring(0, 2), 10); // First two characters are hours
  let minutes = time.substring(2, 4); // Last two characters are minutes

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time string
  return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
};

const formatDay = (date) => {
  const stringDate = date;

  const unformattedDate = new Date(stringDate);

  const dayNumber = unformattedDate.getDay();

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return `${daysOfWeek[dayNumber]}`;
};

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

    const earnings = serviceCost / serviceDetails.numberOfWorkers

      // Updates each assigned worker with the new appointment ID.
      for (const workerId of assignedWorkers) {
        await Worker.findByIdAndUpdate(
          workerId, 
          {
            $push: {
              assignedAppointments: {
                appointmentId: savedAppointment._id, // Associates the appointment with the worker
                date: scheduleDetails.date, // The date of the appointment
                startTime: scheduleDetails.startTime, // The start time of the appointment
                estimatedEarnings: earnings // Computed estimated earnings of a worker 
              }
            }
          },
          { new: true }
        );
      }

      try {
        const assignedWorkersNames = [];

        // Loops through each worker ID to retrieve the workers full names and returns it as an array.
        for (const workerId of assignedWorkers) {
          const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database.
          
          if (!worker) {
            throw new Error(`Worker with ID ${workerId} not found`);
          }
          
          const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker

          if (!user) {
            throw new Error(`User with ID ${worker.userId} not found`);
          }
          
          const { firstName, lastName } = user;
          assignedWorkersNames.push(`${firstName} ${lastName}`);
        }

        // Loops through the workers and sends an email to them.
        for (const workerId of assignedWorkers) {
          const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database.
          
          if (!worker) {
            throw new Error(`Worker with ID ${workerId} not found`);
          }
          
          const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker

          if (!user) {
            throw new Error(`User with ID ${worker.userId} not found`);
          }
          
          const workerTime = formatTime(scheduleDetails.startTime);
          const earnings = serviceCost / serviceDetails.numberOfWorkers
          
          // Sends the appointment confirmation email to the worker
          sendWorkerAppointmentConfirmation(
            user.firstName, user.email, customerFirstName, 
            customerLastName, address.block, address.municipal,
            address.province, address.barangay, serviceDetails.serviceCategory,
            serviceDetails.sizeOfArea, scheduleDetails.date, 
            workerTime, assignedWorkersNames, earnings); 
          
            console.log("Successfully Sent Worker Confirmation"); 
        }

      } catch (error) {
          console.error("Error during email sending:", error);
          return res.status(500).json({ success: false, message: error.message });
      }
    
    const user = await User.findById(userId); // Retrieves user information for the customer
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
    const userTime = formatTime(scheduleDetails.startTime);
    // Sends the appointment confirmation email to the customer
    sendUserAppointmentConfirmation(user.firstName, user.email, customerFirstName, customerLastName, 
      address.block, address.province, address.municipal, address.barangay, 
      serviceDetails.serviceCategory, serviceDetails.sizeOfArea, scheduleDetails.date, 
      userTime, serviceCost); 

    console.log("Successfully Sent User Confirmation");
    
    // Responds with a 201 status and a success message if the appointment is booked successfully.
    return res.status(201).json({ success: true, message: "Appointment has been booked successfully!" });

  } catch (error) {
    // If there's an error during the appointment creation process, returns a 500 status with an error message.
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Gets all available workers based on the user preference during appointments.
 */
export const getAvailableWorkers = async (req, res) => {
  const { serviceDetails, scheduleDetails } = req.body; 

  // Extracts the service category and size of area from the service details.
  const { serviceCategory, sizeOfArea } = serviceDetails;
  const { date, startTime } = scheduleDetails; 
  
  // Formats the date to the day of the week.
  const formatDate = formatDay(date);

  try {
    // Retrieves all workers that match the service category, area assigned, day, and start time.
    let workers = await Worker.find({
      "serviceCategory": serviceCategory, 
      "workerAvailability.areaAssigned": sizeOfArea, 
      "workerAvailability.day": { $in: [formatDate] },  
      "workerAvailability.startTime": { $in: [startTime] }
    }).lean(); // .lean ensures that plain objects will be returned instead of mongoose documents.

    // If no workers are found, respond with an error message.
    if (workers.length === 0) {
      return res.status(404).json({ message: "No available workers found" });
    }

    // Initialize an array to store available workers.
    const availableWorkers = []

    // Loops through each worker to check if they are available at the specified date and time.
    workers.forEach(worker => {
      const isConflict = worker.assignedAppointments.some(appointment => 
        new Date(appointment.date).getTime() === new Date(date).getTime() 
        && appointment.startTime === startTime
      );

      if(!isConflict) {
        availableWorkers.push(worker);
      }
    });

    // If no available workers are found, respond with an error message.
    if (availableWorkers.length === 0) {
      return res.status(404).json({ success: false, message: "No workers are available at this time",  availableWorkers: availableWorkers });
    }
    
    // Maps the availableWorkers array and extracts the userId and assigns it in a new array.
    const workeruserId = availableWorkers.map(availableWorkers => availableWorkers.userId);

    // console.log(workeruserId);

    // Loops through the 
    for (const [index, userId] of workeruserId.entries()) {
      const workerInformation = await User.findById(userId);

      availableWorkers[index] = {
        ...availableWorkers[index],
        userDetails: {
          firstName: workerInformation.firstName,
          lastName: workerInformation.lastName,
          address: workerInformation.address
        }
      };
    }

    console.log(availableWorkers);
    // Successfully fetched available workers.
    return res.status(200).json({ message: "Successfully fetched available workers", workers: availableWorkers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Testing Controllers 
// This function is used for testing purposes only and sends an email to the assigned workers for the appointment.
export const testEmailBooking = async (req, res) => {
  const { assignedWorkers } = req.body; 

  // Used for sending emails to the assigned workers for the appointment. 
  for (const workerId of assignedWorkers) {
    const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database. 
    console.log(worker);
    const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker

    //sendWorkerAppointmentConfirmation(user.firstName, user.email);
  }
  return res.status(200).json({ message: "Request Success" });
}; 