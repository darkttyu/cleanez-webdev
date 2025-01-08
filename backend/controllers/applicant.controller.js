import { User } from "../models/user.model.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const submitApplicationForm = async (req, res) => {

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  const user = await User.findById(userId);

  if(!user) {
    return res.status(404).json({success: false, message:""})
  }

  const resume = req.file;

  user.role = "Applicant";
  user.resume = {
    data: req.file.buffer,
    contentType: req.file.mimetype
  };

  await user.save();

  res.status(200).json({success: true, message: "Application Form Submitted Successfully"});
}