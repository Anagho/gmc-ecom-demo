import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

// Send welcome email function
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "10c2cae3-5136-4861-9d32-c5024336a8c1",
      template_variables: {
        company_info_name: "Farmgry",
        first_name: name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// Send password reset email function
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

     console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.log(`Error in sending password reset email: ${error}`);

    throw new Error(`Error in sending password reset email: ${error}`);
  }
};

// Send Password reset success email function
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })

    console.log("Password rest email sent successfully", response)
  } catch (error) {
    console,log("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success ${error}`)
  }
}