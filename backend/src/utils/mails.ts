import "dotenv/config";
import nodemailer from "nodemailer";

interface EmailVar {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMT_USER_NAME,
    pass: process.env.SMT_USER_PASSWORD,
  },
});

export async function sendMail({ to, subject, html }: EmailVar) {
  await transporter.sendMail({
    from: `PROJECT_BORD <${process.env.SMT_USER_NAME}>`,
    to,
    subject,
    html,
  });
}
