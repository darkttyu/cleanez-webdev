import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOMING_EMAIL } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (firstName, email, verificationToken) => {
  const recepient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recepient,
      subject:"Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken).replace("{firstName}", firstName),
      category: "Email Verification"
    })

    console.log("Email Sent Successfully", response)
  } catch (error) {
    console.error(`Error sending verification`, error)
  }
}

export const sendWelcomeEmail = async (firstName, email) => {
  const recepient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recepient,
      subject:"Welcome to CleanEZ",
      html: WELCOMING_EMAIL.replace("{firstName}", firstName),
      category: "Welcoming Message"
    })

    console.log("Email Sent Successfully", response)
  } catch (error) {
    console.error(`Error sending welcoming email.`, error)
  }
}

export const sendPasswordResetEmail = async (firstName, email, resetURL) => {
  const recepient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{firstName}", firstName).replace("{resetURL}", resetURL),
      category: "Password Reset"
    })
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export const sendResetSuccessEmail = async(firstName, email) => { 
  const recepient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from: sender, 
      to: recepient, 
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{firstName}", firstName),
      category: "Password Reset Success"
    })
  } catch (error) {
    console.error( `Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);

  }
}