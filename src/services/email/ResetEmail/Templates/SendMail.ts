import nodemailer from "nodemailer";
import * as fs from 'fs';
import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// Create a transporter using SMTP


const SendResetPasswordMail = (names: string, username: string, link: string) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // SMTP server hostname
  port: 587, // SMTP server port
  secure: false, // Use SSL/TLS
  auth: {
    user: process.env.WELCOME_REGISTER_EMAIL_USERNAME,
    pass: process.env.WELCOME_REGISTER_EMAIL_PASSWORD
  },
});

const templatePath = path.join(__dirname, 'reset_email_templates.html');

const template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders in the template with actual data
const personalizedTemplate = template
  .replace('{{name}}', names)
  .replace('{{resetLink}}', link);

// Create an email message
const message = {
    from: process.env.WELCOME_REGISTER_EMAIL_USERNAME,
    to: username,
    subject: "Password Changed Successfully!",
    html: personalizedTemplate,
  };

  // Send the email
  return new Promise((resolve) => {
    transporter.sendMail(message, (err) => {
      if (err) {
        resolve({success: false}); // Reject the promise in case of error
      } else {
        resolve({success : true}); // Resolve the promise if the email is sent successfully
      }
    });
  })
}

export default SendResetPasswordMail;