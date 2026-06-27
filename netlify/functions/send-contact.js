const nodemailer = require("nodemailer");

const RECIPIENT_EMAIL = "jsavaliya.tech@gmail.com";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function clean(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { message: "Invalid request body" });
  }

  if (clean(data.website)) {
    return json(200, { message: "Message received" });
  }

  const senderName = clean(data.name);
  const senderEmail = clean(data.email);
  const projectType = clean(data.type) || "Not specified";
  const budgetRange = clean(data.budget) || "Not specified";
  const projectMessage = clean(data.message);

  if (!senderName || !senderEmail || !projectMessage) {
    return json(400, { message: "Name, email, and message are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    return json(400, { message: "Please enter a valid email address" });
  }

  const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length) {
    return json(500, { message: "Email service is not configured" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const text = [
    "New priority portfolio inquiry",
    "",
    `Name: ${senderName}`,
    `Email: ${senderEmail}`,
    `Project Type: ${projectType}`,
    `Budget Range: ${budgetRange}`,
    "",
    "Message:",
    projectMessage,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${senderName}" <${senderEmail}>`,
      subject: `Priority portfolio inquiry from ${senderName}`,
      text,
      html: `
        <h2>New priority portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(senderName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Budget Range:</strong> ${escapeHtml(budgetRange)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(projectMessage).replace(/\n/g, "<br>")}</p>
      `,
      priority: "high",
      headers: {
        Importance: "high",
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
      },
    });

    return json(200, { message: "Message sent" });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return json(500, { message: "Unable to send message right now" });
  }
};
