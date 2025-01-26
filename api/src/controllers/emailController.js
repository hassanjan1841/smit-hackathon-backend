import nodemailer from "nodemailer";
import sendResponse from "../helpers/sendResponse.js";

export const sendEmail = async (req, res) => {
  try {
    const { senderName, sender, receiver, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });
    const sendEmail = async (
      senderName,
      sender,
      receiver,
      subject,
      message
    ) => {
      try {
        const info = await transporter.sendMail({
          from: `${senderName} 👻" <${sender}>`, // sender address
          to: receiver, // list of receivers
          subject: subject, // Subject line
          text: message, // plain text body
          html: message, // html body
        });
        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    await sendEmail(senderName, sender, receiver, subject, message);
    sendResponse(res, "Email sent successfully");
  } catch (error) {
    console.log(error);
    sendResponse(res, "Failed to send email", null, true, 500);
  }
};
