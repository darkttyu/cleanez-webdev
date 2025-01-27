import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";

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

// Profile 
export const fetchWorker = async(id) => {
  const user = await User.findById({ _id: new Object(id) });
    if(!user){
      throw new Error("User does not exist.");
    }
      if(user.role !== "Worker"){
        throw new Error("Bad Request. User is not a worker.");
      }
  
  return user;
};

export const fetchWorkerDetails = async(id) => {
  const worker = await Worker.find({"userId": new Object(id)});
    if(!worker){
      throw new Error("Worker Information does not exist.");
    }

  return worker;
}
export const updateWorker = async(id, body, profile) => {
  const user = await User.findOne({ _id: new Object(id) });

    if(!user){
      throw new Error("User does not exist.");
    }
      if(user.role !== "Worker"){
        throw new Error("Bad Request. Account is not Verified as a Worker.");
      }
        if(profile && profile.length > 0){
          profile = {
            data: profile[0].buffer, // Store profile picture buffer
            contentType: profile[0].mimetype // Store profile picture's MIME type
            };
        }
    
    const { birthDate, gender, phoneNumber, email, block, province, municipal, barangay } = body; // Extract the request body.

    // Updates the user info based on the id and the updated user info
    const updatedData = {
      email,
      birthDate,
      gender,
      phoneNumber, 
      "address.block": block,
      "address.province": province,
      "address.municipal": municipal,
      "address.barangay": barangay,
    }

      if(profile){
        updatedData.profilePicture = profile; // Updates the profile picture if it is uploaded
      }

    const updatedWorker = await User.findByIdAndUpdate(id, updatedData, { new: true }); // Updates worker information to the database.
      if(!updatedWorker){
        throw new Error("Error in Updating Worker Data.");
      }
    
    return updatedWorker;
};

// Appointment
export const fetchAppointments = async(id) => {
  const worker = await Worker.findOne({ userId: new Object(id) });

    if(!worker){
      throw new Error("Worker not Found.");
    }

    // Extracts the IDs of assigned appointments from the worker's data and stores them in an array.
    const appointmentIdArray = worker.assignedAppointments.map((appointment) => appointment.appointmentId);

    // Uses Promise.all to fetch data for multiple appointments at the same time.
    const appointmentInformation = await Promise.all(
    // Maps over the array of appointment IDs, retrieves detailed information for each, and stores it in a new array.
    appointmentIdArray.map(async (appointmentId) => {
        const { _id, customerFirstName, customerLastName, scheduleDetails, 
                appointmentStatus, paymentStatus } = await Appointment.findById(appointmentId);
                  
        // Slices the date to a more readable format (eg. 2025-01-01)
        let slicedDate ='';
            if(scheduleDetails.date instanceof Date){
                slicedDate = scheduleDetails.date.toISOString().slice(0,10);
            }
            return {
              _id,
              customerName: customerFirstName + " " + customerLastName,
              scheduledDate: slicedDate,
              scheduledTime: scheduleDetails.startTime,
              appointmentStatus,
              paymentStatus
            };
          })
        );

        // Filters the array to get only those appointments within the range of 7 days.
        const upcomingAppointment = appointmentInformation.filter(appointment => {
          const appointmentDate = moment(appointment.scheduledDate);
          return appointmentDate.isBetween(moment(), moment().add(7, 'days'), 'day', []);
        })

        return upcomingAppointment;

};

export const viewAppointment = async (appointmentId) => {
  // Find the appointment by its ID in the database
  const fullAppointment = await Appointment.findById(appointmentId);

  // Throw an error if the appointment does not exist
  if (!fullAppointment) {
    throw new Error("Appointment does not exist.");
  }
  
  // Extract worker IDs from the assignedWorkers array in the appointment
  const workerId = fullAppointment.assignedWorkers.map((worker) => worker._id);

  // Fetch the userId of each worker using their worker ID
  const workerUserIds = await Promise.all(
    workerId.map(async (id) => {
      const worker = await Worker.findById(id); // Fetch worker details by ID
      return worker.userId; // Return the userId of the worker
    })
  );

  // Fetch full names of workers from the User collection using their userIds
  const workers = await Promise.all(
    workerUserIds.map(async (id) => {
      const worker = await User.findById(id); // Fetch user details by ID
      return worker.firstName + " " + worker.lastName; // Return the worker's full name
    })
  );

  // Format the appointment date (if it's a valid Date object) into YYYY-MM-DD format
  let appointmentDate = '';
  if (fullAppointment.scheduleDetails.date instanceof Date) {
    appointmentDate = fullAppointment.scheduleDetails.date.toISOString().slice(0, 10);
  }

  // Format the start time into a readable format (e.g., "9:00 AM")
  const time = formatTime(fullAppointment.scheduleDetails.startTime);

  // Construct the final appointment object to return
  const appointment = {
    clientName: fullAppointment.customerFirstName + " " + fullAppointment.customerLastName, // Full name of the client
    phoneNumber: fullAppointment.phoneNumber, // Client's phone number
    address: fullAppointment.address.block + " " + 
      fullAppointment.address.barangay + " " + 
      fullAppointment.address.municipal + ", " + 
      fullAppointment.address.province, // Full address of the client
    date: appointmentDate, // Appointment date
    time: time, // Appointment start time
    workers: workers, // List of assigned workers' full names
    service: fullAppointment.serviceDetails.serviceCategory, // Service category for the appointment
    sizeOfArea: fullAppointment.serviceDetails.sizeOfArea // Size of the service area
  };

  // Return the constructed appointment object
  return appointment;
};

export const markAppointment = async (appointmentId) => {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    {
      "paymentStatus": "Paid"
    },
    { new: true } 
  );
    if(!appointmentId){
      throw new Error("Appointment does not exist.");
    }

    // Extract worker IDs from the assignedWorkers array in the appointment
    const workerId = appointment.assignedWorkers.map((worker) => worker._id);
      
    // Fetch the userId of each worker using their worker ID
    const workerUserIds = await Promise.all(
      workerId.map(async (id) => {
        const worker = await Worker.findById(id); // Fetch worker details by ID
        return worker.userId; // Return the userId of the worker
      })
  );

    // Divides the service cost to the number of assigned workers for the service.
    // Adds the amount to the totalEarnings of each worker.
    // Also removes the appointment from the assigned workers, meaning that they have completed the service.
    const distributedAmount = appointment.serviceCost / appointment.assignedWorkers.length;
      await Promise.all(
        workerUserIds.map(async (id) => {
          await Worker.findOneAndUpdate(
            { userId: new Object(id) }, 
            {
              $inc: { "totalEarnings": distributedAmount },
              $pull: { "assignedAppointments": { "appointmentId": appointmentId }}
            },
            { new: true }
          ); 
        })
      );
    
    return appointment;
};

// Scheduling 
export const updateWorkerService = async(id, body) => {
  const { serviceCategory, workerAvailability } = body

    const worker = await Worker.findOne({ userId: new Object(id) }); // Gets the worker information from the id 
      // Worker Validations
      if(!worker){
        throw new Error("Worker not Found.")
      }

        // Checks if the worker still has assigned appointments 
        // if they want to change their service category
        if(worker.serviceCategory !== serviceCategory) {
          if(worker.assignedAppointments.length !== 0) {
            throw new Error("Bad Request. Worker still has assigned appointments.")
          }
        }
    
    const updateWorkerServiceInfo = {
      "serviceCategory": serviceCategory,
      "workerAvailability.areaAssigned": workerAvailability.areaAssigned,
      "workerAvailability.day": workerAvailability.day,
      "workerAvailability.startTime": workerAvailability.startTime
    }

    // Updates the worker service info if it passes all validations.
    const updatedWorkerService = await Worker.findOneAndUpdate(
      { userId: id },
      updateWorkerServiceInfo,
      { new: true}
    )

      if(!updatedWorkerService){
        throw new Error("Error in Updating Worker Service Information.")
      }

    return updatedWorkerService;
};

// Earnings 
export const getDailyEarnings = async () => {

};

export const getWeeklyEarnings = async () => {

};

export const getMonthlyEarnings = async() => {

};

export const getYearlyEarnings = async() => {

};

