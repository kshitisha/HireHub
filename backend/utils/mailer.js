import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,   
        pass: process.env.MAIL_PASS    
    }
});
export const sendApplicationConfirmation = async (toEmail, applicantName, jobTitle, companyName) => {
    const mailOptions = {
  from: `"HireHub" <${process.env.MAIL_USER}>`,
  to: toEmail,
  subject: `Application Received - ${jobTitle} at ${companyName}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px;">
      <h2 style="color: #4f46e5;">HireHub</h2>
      <p>Hi <strong>${applicantName}</strong>,</p>
      <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been received.</p>
      <p>The recruiter will review your profile and reach out if there's a match.</p>
      <br/>
      <p style="color: #6b7280; font-size: 13px;">This is an automated message. Please do not reply.</p>
      <p style="color: #6b7280; font-size: 13px;">— The HireHub Team</p>
    </div>
  `
};

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${toEmail}`);
    } catch (error) {
        console.error("Email send failed:", error.message);
        // Non-blocking — don't throw, just log
    }
};
