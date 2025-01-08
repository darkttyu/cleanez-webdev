import { User } from "../models/user.model.js";

export const submitApplicationForm = async (req, res) => {

  const userId = req.userId;
  const { resume, ID1, ID2 } = req.files;
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
    data: resume[0].buffer,
    contentType: resume[0].mimetype
  };
  user.applicationDetails.validID.ID1 = {
    data: ID1[0].buffer,
    contentType: ID1[0].mimetype
  }
  user.applicationDetails.validID.ID2 = {
    data: ID2[0].buffer,
    contentType: ID2[0].mimetype
  }


  await user.save();

  res.status(200).json({success: true, message: "Application Form Submitted Successfully"});
}