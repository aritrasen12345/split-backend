import nodemailer from "nodemailer";

import config from "../config/config.js";

// console.log(config.EMAIL, config.PASSWORD);

const sendEmail = (receiver, content) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: "Email verification : Split Expense",
    html: content,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        reject(false);
      } else {
        console.log("Email send successfully");
        resolve(true);
      }
    });
  });
};

export default sendEmail;
