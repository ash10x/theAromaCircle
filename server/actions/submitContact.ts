"use server";

import { db } from "../index";
import { messages } from "../schema";
import { sendEmail } from "../mailer";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContact(formData: ContactMessage) {
  const timestamp = Date.now();

  await db.insert(messages).values({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    created_at: timestamp,
  });

  const userHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>Thanks for reaching out, ${formData.name}</h1>
      <p>We received your message and our fragrance specialists will respond shortly.</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <p>Warm regards,<br/>The Aroma Circle Team</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>New contact submission</h1>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <p>Received at ${new Date(timestamp).toLocaleString()}</p>
    </div>
  `;

  await sendEmail({
    to: formData.email,
    subject: "We received your message",
    html: userHtml,
    text: `Thanks for reaching out. We received your message: ${formData.message}`,
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `New contact request from ${formData.name}`,
      html: adminHtml,
      text: `New message from ${formData.name} <${formData.email}>: ${formData.message}`,
    });
  }

  return { success: true };
}
