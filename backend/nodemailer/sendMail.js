import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOMING_EMAIL, ADMIN_WELCOMING_EMAIL, DELETE_ACCOUNT, ACTIVATE_USER, DEACTIVATE_USER, DEACTIVATE_WORKER, ACTIVATE_WORKER, WELCOME_WORKER, SEND_USER_BOOKING_CONFIRMATION, SEND_WORKER_BOOKING_CONFIRMATION } from "./emailTemplates.js";
import { response } from "express";

dotenv.config({path: './.env' });

// Backend Testing for Email 
//console.log('Current working directory:', process.cwd());
//console.log('USER:', process.env.USER);
//console.log('APP_PASSWORD:', process.env.APP_PASSWORD);

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

export const adminWelcomeEmail = async(firstName, email, phoneNumber, password) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Welcome to CleanEZ",
      html: ADMIN_WELCOMING_EMAIL.replace("{firstName}", firstName).replace("{email}", email).replace("{phoneNumber}", phoneNumber).replace("{generatedPassword}", password)
    });

    console.log("User Welcoming Email sent Successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
};

export const adminWelcomeWorkerEmail = async(firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Welcome to CleanEZ",
      html: ADMIN_WELCOMING_EMAIL.replace("{firstName}", firstName)
    });

    console.log("Worker Welcoming Email sent Successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
}

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

export const sendAccountDeletion = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Account Deletion",
      html: DELETE_ACCOUNT.replace("{firstName}", firstName).replace("{email}", email)
    })

    console.log("Deletion Email Sent Successfully.")
  } catch (error) {
    console.error("Error sending account deletion email:", error);
    throw new Error(`Error sending account deletion email: ${error}`);
  }
};

export const sendUserActivationEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "User Account Activation",
      html: ACTIVATE_USER.replace("{firstName}", firstName),
    });

    console.log("Email Activation Sent Successfully", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendUserDeactivationEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, 
      to: [email],
      subject: "User Account Deactivation",
      html: DEACTIVATE_USER.replace("{firstName}", firstName)
    })

    console.log("Deactivation Email sent Successfully: ", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export const sendWorkerWelcomeEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, 
      to: [email],
      subject: "Welcome to CleanEZ!",
      html: WELCOME_WORKER.replace("{firstName", firstName)
    })

    console.log("Worker Welcoming Email sent Successfully: ", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    
  }
};

export const sendWorkerActivationEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: [email],
      subject: "Worker Account Activation",
      html: ACTIVATE_WORKER.replace("{firstName}", firstName),
    });

    console.log("Email Activation Sent Successfully", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendWorkerDeactivationEmail = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, 
      to: [email],
      subject: "Worker Account Deactivation",
      html: DEACTIVATE_WORKER.replace("{firstName}", firstName)
    })

    console.log("Deactivation Email sent Successfully: ", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export const sendUserAppointmentConfirmation = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, 
      to: [email], 
      subject: "Appointment Confirmed!",
      html: SEND_USER_BOOKING_CONFIRMATION.replace("{firstName}", firstName)
    })
    console.log("User Appointment Confirmation Sent Successfully: ", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

export const sendWorkerAppointmentConfirmation = async (firstName, email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, 
      to: [email], 
      subject: "You have been Booked!",
      html: SEND_WORKER_BOOKING_CONFIRMATION.replace("{firstName}", firstName)
    })
    console.log("Worker Appointment Confirmation Sent Successfully: ", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}