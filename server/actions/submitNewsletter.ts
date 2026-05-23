"use server";

import { db } from "../index";
import { subscribers } from "../schema";
import { sendEmail } from "../mailer";

export type NewsletterPayload = {
  name: string;
  email: string;
};

export async function submitNewsletter(payload: NewsletterPayload) {
  const timestamp = Date.now();

  await db.insert(subscribers).values({
    name: payload.name,
    email: payload.email,
    created_at: timestamp,
  });

  const userHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>Welcome to The Aroma Circle</h1>
      <p>Thanks for joining our newsletter, ${payload.name}.</p>
      <p>You’ll receive exclusive release alerts and premium offers directly to your inbox.</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>New newsletter signup</h1>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p>Signed up at ${new Date(timestamp).toLocaleString()}</p>
    </div>
  `;

  await sendEmail({
    to: payload.email,
    subject: "Welcome to The Aroma Circle Newsletter",
    html: userHtml,
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `New newsletter signup: ${payload.name}`,
      html: adminHtml,
    });
  }

  return { success: true };
}
