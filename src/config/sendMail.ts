import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // SMTP server hostname
  port: 587, // SMTP server port
  secure: false, // Use SSL/TLS
  auth: {
    user: "welcome@knowledgeforcurious.com",
    pass: "Knowledgeforcurious@123",
  },
});

// Create an email message
const message = {
    from: "welcome@knowledgeforcurious.com",
    to: "rahul52us@gmail.com",
    subject: "Hello, World!",
    text: "This is the body of the email",
  };

  // Send the email
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info);
    }
  });
