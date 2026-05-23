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

const gold = "#BD955E";
const bg = "#0D0D0D";
const bgDeep = "#080808";
const border = "#1A1A1A";
const textMuted = "#888888";
const textDim = "#555555";

function wrap(content: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Aroma Circle</title>
</head>
<body style="margin:0;padding:0;background-color:${bgDeep};font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#FFFFFF;">
  <span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgDeep};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${bg};border:1px solid ${border};">
        <tr>
          <td style="padding:40px 48px 32px;border-bottom:1px solid ${border};text-align:center;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.45em;text-transform:uppercase;color:${gold};font-weight:300;">The Aroma Circle</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#FFFFFF;">Where Scents Become Signatures</h1>
          </td>
        </tr>
        ${content}
        <tr>
          <td style="padding:28px 48px;border-top:1px solid ${border};text-align:center;">
            <p style="margin:0;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">14 Strand St · China Doll Plaza, Montego Bay, Jamaica</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function submitContact(formData: ContactMessage) {
  const timestamp = Math.floor(Date.now() / 1000);

  await db.insert(messages).values({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    created_at: timestamp,
  });

  const userHtml = wrap(`
    <tr><td style="padding:40px 48px 0;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">Message Received</p>
      <h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:300;color:#FFFFFF;">Thank you, ${formData.name}.</h2>
      <p style="margin:0;font-size:13px;color:${textMuted};line-height:1.7;">Our fragrance specialists have received your message and will respond as soon as possible.</p>
    </td></tr>
    <tr><td style="padding:28px 48px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid ${border};">
        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${textDim};">Your Message</p>
          <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Subject</p>
          <p style="margin:0 0 16px;font-size:14px;color:#FFFFFF;">${formData.subject}</p>
          <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Message</p>
          <p style="margin:0;font-size:13px;color:${textMuted};line-height:1.7;">${formData.message}</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:28px 48px 40px;">
      <p style="margin:0;font-size:12px;color:${textDim};font-style:italic;font-family:Georgia,'Times New Roman',serif;">— The Aroma Circle Team</p>
    </td></tr>`,
    `We received your message and will be in touch shortly.`,
  );

  const adminHtml = wrap(`
    <tr><td style="padding:40px 48px 0;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">New Contact Submission</p>
      <h2 style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:300;color:#FFFFFF;">Message Received</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid ${border};margin-bottom:24px;">
        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 14px;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${textDim};">From</p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:3px 0;width:72px;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Name</p></td>
              <td style="padding:3px 0;"><p style="margin:0;font-size:14px;color:#FFFFFF;">${formData.name}</p></td>
            </tr>
            <tr>
              <td style="padding:3px 0;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Email</p></td>
              <td style="padding:3px 0;"><p style="margin:0;font-size:14px;color:#FFFFFF;">${formData.email}</p></td>
            </tr>
          </table>
        </td></tr>
      </table>
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Subject</p>
      <p style="margin:0 0 20px;font-size:15px;color:#FFFFFF;">${formData.subject}</p>
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Message</p>
      <p style="margin:0;font-size:13px;color:${textMuted};line-height:1.7;">${formData.message}</p>
    </td></tr>
    <tr><td style="padding:20px 48px 40px;">
      <p style="margin:0;font-size:11px;color:${textDim};">Received: ${new Date(timestamp * 1000).toLocaleString("en-JM", { timeZone: "America/Jamaica" })}</p>
    </td></tr>`,
    `New contact from ${formData.name}: ${formData.subject}`,
  );

  await sendEmail({
    to: formData.email,
    subject: "We received your message — The Aroma Circle",
    html: userHtml,
    text: `Thank you, ${formData.name}.\n\nWe received your message and will respond shortly.\n\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\n— The Aroma Circle`,
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `Contact: ${formData.subject} — from ${formData.name}`,
      html: adminHtml,
      text: `New contact from ${formData.name} <${formData.email}>\n\nSubject: ${formData.subject}\n\n${formData.message}`,
      replyTo: formData.email,
    });
  }

  return { success: true };
}
