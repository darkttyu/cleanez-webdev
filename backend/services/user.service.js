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
export const fetchUser = async(id) => {
  const user = await User.findById(id);
    if(!user){
      throw new Error("User does not exist.");
    }

    return user;
};

export const updateUser = async(id, body, profile) => {
  const { birthDate, gender, phoneNumber, email, address } = body;
  const { block, province, municipal, barangay } = address;
    const user = await User.findById({ _id: new Object(id) });
      if(!user){
        throw new Error("User does not exist");
      } 
        
        if(profile && profile.length > 0){
          profile = {
            data: profile[0].buffer, // Store profile picture buffer
            contentType: profile[0].mimetype // Store profile picture's MIME type
          };
      }

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

            if(profile) {
              updatedData.profilePicture = profile;
            }

          const updatedUserInfo = await User.findByIdAndUpdate(id, updatedData, { new: true });
            if(!updatedUserInfo) {
              throw new Error("Bad Request. Error in Updating User Information.");
            }

            const updatedUser = {
              name: updatedUserInfo.firstName + " " + updatedUserInfo.lastName,
              birthDate: updatedUserInfo.birthDate,
              gender: updatedUserInfo.gender,
              phoneNumber: updatedUserInfo.phoneNumber,
              email: updatedUserInfo.email,
              address: {
                block: updatedUserInfo.address.block,
                barangay: updatedUserInfo.address.barangay,
                municipal: updatedUserInfo.address.municipal,
                province: updatedUserInfo.address.province
              }
            }

          return updatedUser;
};

// Dashboard 
export const fetchAppointments = async(id) => {
  // Gets the total number of appointments made by the user, whether cancelled or completed
  const userAppointmentCount = await Appointment.countDocuments({ userId: new Object(id) })

  // Gets the total number of completed appointments by the user.
  const completeAppointmentCount = await Appointment.countDocuments({userId: new Object(id), appointmentStatus: "Completed", paymentStatus: "Paid"})

  // Gets the upcoming appointments
  const userAppointments = await Appointment.find({ userId: new Object(id) });
    // Filters the appointment information to get only needed data from each appointment.
    const filteredAppointments = await Promise.all(
      userAppointments.map(async (appointment) => {
        const { _id, serviceDetails, scheduleDetails, appointmentStatus, paymentStatus, appointmentRating } = await Appointment.findById(appointment._id)
          // Slices the date to a more readable format (eg. 2025-01-01)
            let slicedDate ='';
              if(scheduleDetails.date instanceof Date){
                slicedDate = scheduleDetails.date.toISOString().slice(0,10);
              }
            let formattedTime = formatTime(scheduleDetails.startTime)
                return {
                  _id,
                  serviceDetails: serviceDetails.serviceCategory,
                  scheduledDate: slicedDate,
                  scheduledTime: formattedTime,
                  rating: appointmentRating,
                  appointmentStatus,
                  paymentStatus
                }
          })
      )

        // Filters all the appointments only to get the appointments within 30 days.
        const unsortedAppointment = filteredAppointments.filter(appointment => {
          const appointmentDate = moment(appointment.scheduledDate);
            return appointmentDate.isBetween(moment(), moment().add(30, 'days'), 'day', '[]'); // isBetween arguments are start, end, unit, and inclusive [], () means exclusive
        });

          const upcomingAppointment = unsortedAppointment.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

        const userAppointmentDetails = {
          userAppointmentCount,
          completeAppointmentCount,
          upcomingAppointment
        }

        return userAppointmentDetails;
};

export const viewUserAppointment = async(appointmentId) => {
  const appointment = await Appointment.findById(appointmentId).lean();
    if(!appointment){
      throw new Error("Appointment not Found.")
    }

    const assignedWorkersNames = [];
    // Loops through each worker ID to retrieve the workers full names and returns it as an array.
    for (const workerId of appointment.assignedWorkers) {
      const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database.
          if (!worker) {
            continue;
          }

          const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker
            if (!user) {
              throw new Error("User Not Found.")
            }
            
            const { firstName, lastName } = user;
            assignedWorkersNames.push(`${firstName} ${lastName}`);
      }
      
      const formattedTime = formatTime(appointment.scheduleDetails.startTime)
      
      const appointmentInformation = {
        ...appointment,
        appointmentTime: formattedTime,
        assignedWorkers: assignedWorkersNames
      }

      return appointmentInformation;
};

export const markAppointmentAsComplete = async(appointmentId) => {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    {
      "appointmentStatus": "Completed"
    },
    { new: true }
  );

    if(!appointment){ 
      throw new Error("Error in Marking Appointment as Complete.");
    }

      return appointment;
};

export const markAppointmentAsCancelled = async(appointmentId) => {
  // Fetches the Appointment Information
  const appointment = await Appointment.findById(appointmentId).lean();
    if(!appointment) {
      throw new Error("Error in Fetching Appointment.");
    }

    // Compares the hours today to the hours of the time of creation
    const appointmentDate = moment(appointment.createdAt);
    const currentTime = moment();
    const hourDifference = currentTime.diff(appointmentDate, 'hours');

      //Sends an error message if the user attempts to cancel an appointment 2 hors after booking.
      if(hourDifference >= 2) {
        throw new Error("Cannot Cancel an Appointment 2 hours after Booking.");
      }

    const user = await User.findById(appointment.userId);
      if(!user) {
        throw new Error("Error in Fetching User.");
      }

      // Checks if the user exceeds the limit of cancellation
      if(user.cancelledAppointment >= 30) {
        throw new Error("Cannot Cancel Appointment. Limit Exceeded.")
      }
    
    // Updates the status of the appointment
    const cancelledAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        "appointmentStatus": "Cancelled",
        "paymentStatus": "Cancelled"
      }
    ).lean();

    // Increases the Count of Cancellations Made
    await User.findByIdAndUpdate(
      appointment.userId,
      {
        $inc: { cancelledAppointment: 1 }
      }
    )

    // Worker Update 
    let workerList = []
      appointment.assignedWorkers.forEach(worker => {
        workerList.push(worker);
      })
        // Loops through the workerList array to get the workers to be updated.
        for(const workerId of workerList) {
            const workerInfo = await Worker.findById(workerId);
            if(workerInfo && workerInfo.assignedAppointments) {
              await Worker.findByIdAndUpdate(
                workerId,
                {
                  $pull: { assignedAppointments: 
                    { 
                      "appointmentId": appointmentId
                    },
                  }
                }
              )
              // SEND CANCELLATION TO WORKERS
              console.log("Updated Worker Assigned Appointment");
            }
        }

        // SEND CANCELLATION EMAL TO USER
        return cancelledAppointment;
};

export const insertAppointmentRating = async(body, appointmentId) => {
  const appointment = await Appointment.findById(appointmentId).lean();
  const { appointmentRating } = body;

    if(!appointment){
      return res.status(400).json({success: false, message: "Appointment not Found."})
    }

  let workerList = [];

  appointment.assignedWorkers.forEach(worker => {
    workerList.push(worker);
  })
  
    // Loops through the workerList array to get the workers to be updated.
    for(const workerId of workerList) {
          
      const workerInfo = await Worker.findById(workerId);
        if(!workerInfo){
          continue;
        }
        
      if(workerInfo && workerInfo.assignedAppointments) {
        await Worker.findByIdAndUpdate(
          workerId,
          {
            $push: {
                "accumulatedRating": appointmentRating
              },
          }
        )
        console.log("Updated Worker Accumulated Ratings.");
      
        
        const updatedWorkerInfo = await Worker.findById(workerId);

        const ratingSum = updatedWorkerInfo.accumulatedRating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const rating = ratingSum / updatedWorkerInfo.accumulatedRating.length;

        await Worker.findByIdAndUpdate(
          updatedWorkerInfo,
          {
            "rating": rating
          },
          { new: true }
        )
      } 
    }
  
    const updateAppointmentRating = {
      "appointmentRating": appointmentRating
    }

      const updatedAppointmentRating = await Appointment.findByIdAndUpdate(appointmentId, updateAppointmentRating, {new: true})
      return updatedAppointmentRating;
};

// Appointments 
export const viewAllAppointments = async(id) => {
  const userAppointments = await Appointment.find({ 
    userId: new Object(id), 
    appointmentStatus: { $in: ["Completed", "Cancelled"]}
  });

  // Filters the appointment information to get only needed data from each appointment.
  const filteredAppointments = await Promise.all(
    userAppointments.map(async (appointment) => {
      const { _id, serviceDetails, scheduleDetails, appointmentRating, appointmentStatus,  paymentStatus } = await Appointment.findById(appointment._id)

        // Slices the date to a more readable format (eg. 2025-01-01)
        let slicedDate ='';
          if(scheduleDetails.date instanceof Date){
            slicedDate = scheduleDetails.date.toISOString().slice(0,10);
          }
            return {
              _id,
              serviceDetails: serviceDetails.serviceCategory,
              scheduledDate: slicedDate,
              scheduledTime: scheduleDetails.time,
              rating: appointmentRating,
              appointmentStatus,
              paymentStatus
            }
    })
  )
    let appointmentHistory = [];
    filteredAppointments.map(async (appointment) => {
      if(appointment.appointmentStatus === 'Completed' || appointment.appointmentStatus === 'Cancelled') {
        appointmentHistory.push(appointment);
      }
    })

  return appointmentHistory
}