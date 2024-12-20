import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOMING_EMAIL } from "./emailTemplates.js";

dotenv.config({path: './.env' });

console.log('Current working directory:', process.cwd());

console.log('USER:', process.env.USER);
console.log('APP_PASSWORD:', process.env.APP_PASSWORD);

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sender = '"CleanEZ" <no-reply@cleanez.com>'; // Sender address

export const sendVerificationEmail = async (firstName, email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email], // Recipient email
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken).replace("{firstName}", firstName),
    });

    console.log("Verification email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendWelcomeEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Welcome to CleanEZ",
      html: WELCOMING_EMAIL.replace("{firstName}", firstName),
    });

    console.log("Welcome email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendPasswordResetEmail = async (firstName, email, resetURL) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{firstName}", firstName).replace("{resetURL}", resetURL),
    });

    console.log("Password reset email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{firstName}", firstName),
    });

    console.log("Password reset success email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
