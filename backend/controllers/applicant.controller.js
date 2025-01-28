import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";

// User 
export const submitApplicationForm = async (req, res) => {
  try {
    // Retrieve the userId from the request object (set from the token after logging in)
  const userId = req.userId;
  
  // Retrieve files (resume, ID1, ID2) and fields (serviceCategory, areaAssigned) from the request
  const { resume, ID1, ID2 } = req.files;
  const { firstName, latName, email, phoneNumber, address, serviceCategory, areaAssigned } = JSON.parse(req.body);

    // Check if userId is present (user must be authenticated)
    if (!userId) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

  // Fetch the user from the database using the provided userId
  const user = await User.findById(userId);

    // If user is not found, respond with a 404 status
    if(!user) {
      return res.status(404).json({success: false, message: "User not found"});
    }

  // Checks the database if the applicant already submitted a form
  const applicant = await User.findOne({email, role: "Applicant"});

    if(applicant) {
      return res.status(409).json({success: false, message: "Applicant Already Exists", applicant: applicant})
    }

  // Checks the database if an applicant is already a worker
  const worker = await Worker.findOne({userId: userId});

    if(worker) {
      return res.status(400).json({success: false, message: "Applicant is Already a Worker.", worker: worker})
    }
  
  const appointment = await Appointment.findOne({userId: userId, appointmentStatus: "Pending"})
    if(appointment){
      return res.status(400).json({success: false, message: "User has scheduled appointments. Appointment Rejected", appointment: appointment})
    }

  // Update user's role to "Applicant" and set application details
  user.address.block = address.block;
  user.address.municipal = address.municipal;
  user.address.province = address.province;
  user.address.barangay = address.barangay;
  user.role = "Applicant";
  user.applicationDetails.serviceCategory = serviceCategory; // Set the service category
  user.applicationDetails.areaAssigned = areaAssigned; // Set the assigned area
  user.applicationDetails.applicationStatus = 'Pending'; // Set application status as 'Pending'

  // Store the resume, ID1, and ID2 files as Buffer objects in the applicationDetails field
  user.applicationDetails.resume = {
    data: resume[0].buffer, // Store the resume file data as a Buffer
    contentType: resume[0].mimetype // Store the resume's MIME type
  };
  user.applicationDetails.validID.ID1 = {
    data: ID1[0].buffer, // Store ID1 file data as a Buffer
    contentType: ID1[0].mimetype // Store ID1's MIME type
  };
  user.applicationDetails.validID.ID2 = {
    data: ID2[0].buffer, // Store ID2 file data as a Buffer
    contentType: ID2[0].mimetype // Store ID2's MIME type
  };

  // Save the updated user object to the database
  await user.save();

  // Respond with a success message upon successful submission
  res.status(200).json({success: true, message: "Application Form Submitted Successfully"});
  } catch (error) {
    res.status(500).json({success: false, message: "Error in Application Submission", error: error.message})
  }
};

