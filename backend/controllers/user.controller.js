import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";

// Profile
export const getAccountInformation = async (req, res) => {
  const id = req.userId;

  try {
    const user = await User.findById({_id: new Object(id)});

    if(!user) {
      return res.status(400).json({success: false, message: "Error in Fetching User Information."});
    }

    return res.status(200).json({success: true, message: "Fetched User Information", user: user});

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const editAccountInformation = async (req, res) => {
  // Gets the user id by from the localStorage and token
  const id = req.userId

  let profile = req.files?.profile;
  const { birthDate, gender, phoneNumber, email, block, province, municipal, barangay} = req.body;

    try {
      // Checks if the user exists
      const currentUser = await User.findOne({_id: new Object(id)})

      if(!currentUser) {
        res.status(404).json({ success:false, message:"User does not exist"});
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
          updatedData.profilePicture = profile
        }
    
      const updatedUserInfo = await User.findByIdAndUpdate(id, updatedData, { new: true });
        
        if(!updatedUserInfo) {
          return res.status(400).json({success: false, message: "Errr in Updating User Information."})
        }
        
      // Returns a success message if the user info is updated
      res.status(200).json({success: true, message: "Successfully Updated User Information!", updatedUser: updatedUserInfo})

    } catch (error) {
      res.status(500).json({success: false, message: "Server Error: ", error: error.message})
    }
};

// Dashboard
export const getAllUserAppointments = async (req, res) => {
  const id = req.userId;

  try {
    // Gets the total number of appointments made by the user, whether cancelled or completed
    const userAppointmentCount = await Appointment.countDocuments({userId: new Object(id)})
      if(userAppointmentCount === 0) {
        return res.status(400).json({success: true, message: "User has not set an appointment.", data: userAppointmentCount})
      }

    // Gets the total number of completed appointments by the user.
    const completeAppointmentCount = await Appointment.countDocuments({userId: new Object(id), appointmentStatus: "Completed", paymentStatus: "Completed"})
      if(userAppointmentCount === 0) {
        return res.status(400).json({success: true, message: "User has not completed any Appointments.", data: completeAppointmentCount})
      }

    // Gets the upcoming appointments
    const userAppointments = await Appointment.find({ userId: new Object(id) });
      // Filters the appointment information to get only needed data from each appointment.
      const filteredAppointments = await Promise.all(
        userAppointments.map(async (appointment) => {
          const { _id, serviceDetails, scheduleDetails, appointmentStatus, paymentStatus } = await Appointment.findById(appointment._id)

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
                  appointmentStatus,
                  paymentStatus
                }
        })
      )
      
    // Filters all the appointments only to get the appointments within 7 days.
    const upcomingAppointment = filteredAppointments.filter(appointment => {
      const appointmentDate = moment(appointment.scheduledDate);
        return appointmentDate.isBetween(moment(), moment().add(7, 'days'), 'day', '[]'); // isBetween arguments are start, end, unit, and inclusive [], () means exclusive
    });

    

    const userAppointmentDetails = {
      userAppointmentCount,
      completeAppointmentCount,
      upcomingAppointment
    }
    
    return res.status(200).json({success: true, message: "Successfully Fetched All User Appointments.", data: userAppointmentDetails})
  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message})
  }
};

export const viewAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  let appointmentInformation = await Appointment.findById(appointmentId).lean();

  if(!appointmentInformation) {
    return res.status(404).json({success: false, message: "Appointment Information Does Not Exist.", data: appointmentInformation});
  }

  const assignedWorkersNames = [];

  console.log(appointmentInformation)
  // Loops through each worker ID to retrieve the workers full names and returns it as an array.
  for (const workerId of appointmentInformation.assignedWorkers) {
    const worker = await Worker.findById(workerId).lean(); // Retrieves the worker information from the database.
          
        console.log(worker)
        if (!worker) {
          return res.status(400).json({success: false, message: "Worker Not Found.", error: error.message})
        }
          
        const user = await User.findById(worker.userId).lean(); // Retrieves the user information from the database with a role of Worker

        if (!user) {
          return res.status(400).json({success: false, message: "User Not Found.", error: error.message})
        }
          
        const { firstName, lastName } = user;
        assignedWorkersNames.push(`${firstName} ${lastName}`);
    }
    
    appointmentInformation = {
      ...appointmentInformation,
      assignedWorkers: assignedWorkersNames
    }
    return res.status(200).json({success: true, message: "Fetched Specific Appointment Information.", data: appointmentInformation});
};

export const setAppointmentAsCompleted = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        "appointmentStatus": "Completed"
      }
    ).lean();

    if(!appointment) {
      return res.status(404).json({success: false, message: "Error in Fetching Appointment."});
    }

    console.log(appointment);
    return res.status(200).json({success: true, message: "Appointment Marked as Completed.", data: appointment})

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    // Fetches the Appointment Information
    const appointment = await Appointment.findById(appointmentId).lean();

      if(!appointment) {
        return res.status(404).json({success: false, message: "Error in Fetching Appointment."});
      }

    // Compares the hours today to the hours of the time of creation
    const appointmentDate = moment(appointment.createdAt);
    const currentTime = moment();
    const hourDifference = currentTime.diff(appointmentDate, 'hours');

      //Sends an error message if the user attempts to cancel an appointment 1 Day after booking.
      if(hourDifference >= 2) {
        return res.status(400).json({ 
            success: false, 
            message: "Cannot Cancel an Appointment 2 hours after Booking.",
            data: hourDifference
          })
      }

    const user = await User.findById(appointment.userId);
      if(!user) {
        return res.status(404).json({success: false, message: "Error in Fetching User."})
      }

      // Checks if the user exceeds the limit of cancellation
      if(user.cancelledAppointment >= 30) {
        return res.status(400).json({
          success: false, 
          message: "Cancellation Rejected. Number of Cancellations Exceeded.",
        })
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
    const increaseFlagCount = await User.findByIdAndUpdate(
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
              console.log("Updated Worker Assigned Appointment");
            }
        }

    // SEND CANCELLATION EMAIL TO USER AND WORKER 
    return res.status(200).json({success: true, message: "Successfully Cancelled the Appointment.", data: workerList})

  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
  }
};

export const rateAppointment = async (req, res) => {
  const { appointmentRating } = req.body;
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findById(appointmentId).lean();

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

        return res.status(200).json({success: true, message: "Worker Rating Updated."});
    } 
  } catch (error) {
    return res.status(500).json({success: false, message: "Server Error", error: error.message})
  }
};

// Appointments
export const viewAppointmentHistory = async (req, res) => {

};