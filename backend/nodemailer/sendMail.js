import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('USER:', process.env.USER);
console.log('APP_PASSWORD:', process.env.APP_PASSWORD);
console.log('EMAIL:', process.env.EMAIL);

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 465 for secure connections
  secure: true, // true for port 465
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Mail options
const mailOptions = {
  from: {
    name: "Carl Matthew",
    address: process.env.EMAIL,
  },
  to: ["cmfernandez.0209@gmail.com"], // list of receivers
  subject: "Test Email", // Subject line
  text: "Test test", // plain text body
  html: "<b>Cute q</b>", // html body
};

// Function to send email
const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the function
sendMail(transporter, mailOptions);
