import { User } from "../models/user.model.js";

export const submitApplicationForm = async (req, res) => {

  const userId = req.userId;
  const { serviceCategory, areaAssigned } = req.body;
  
  if (!userId) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  const user = await User.findById(userId);

  if(!user) {
    return res.status(404).json({success: false, message:""})
  }

  user.role = "Applicant";
  user.applicationDetails.serviceCategory = serviceCategory;
  user.applicationDetails.areaAssigned = areaAssigned
  user.applicationDetails.applicationStatus = 'Pending';
  user.applicationDetails.resume = {
    data: req.file.buffer,
    contentType: req.file.mimetype
  };

  await user.save();

  res.status(200).json({success: true, message: "Application Form Submitted Successfully"});
}