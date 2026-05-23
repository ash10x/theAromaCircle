"use server";

import { db } from "../index";
import { subscribers } from "../schema";
import { sendEmail } from "../mailer";

export type NewsletterPayload = {
  name: string;
  email: string;
};

const gold = "#BD955E";
const bg = "#0D0D0D";
const bgDeep = "#080808";
const border = "#1A1A1A";
const textMuted = "#888888";
const textDim = "#555555";

export async function submitNewsletter(payload: NewsletterPayload) {
  const timestamp = Math.floor(Date.now() / 1000);

  await db.insert(subscribers).values({
    name: payload.name,
    email: payload.email,
    created_at: timestamp,
  });

  const unsubscribeEmail = process.env.EMAIL_ADMIN ?? process.env.EMAIL_SMTP_USER ?? "";
  const unsubscribeHeader = `<mailto:${unsubscribeEmail}?subject=Unsubscribe>`;

  const userHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Aroma Circle</title>
</head>
<body style="margin:0;padding:0;background-color:${bgDeep};font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#FFFFFF;">
  <span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">You're on the list. Exclusive fragrance drops and private offers are coming your way.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgDeep};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${bg};border:1px solid ${border};">
        <tr>
          <td style="padding:40px 48px 32px;border-bottom:1px solid ${border};text-align:center;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.45em;text-transform:uppercase;color:${gold};font-weight:300;">The Aroma Circle</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#FFFFFF;">Where Scents Become Signatures</h1>
          </td>
        </tr>
        <tr><td style="padding:40px 48px 0;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">Private List</p>
          <h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#FFFFFF;">You're on the list, ${payload.name}.</h2>
          <p style="margin:0 0 24px;font-size:13px;color:${textMuted};line-height:1.7;">
            Welcome to The Aroma Circle's private list. You'll receive first access to new arrivals, limited edition releases, and exclusive offers before anyone else.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid #2A1F10;">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 14px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">What to Expect</p>
              ${["Early access to new fragrance arrivals", "Limited edition and exclusive releases", "Private offers for list members only"].map((note) =>
    `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="display:inline-block;width:12px;height:1px;background-color:rgba(189,149,94,0.4);vertical-align:middle;"></span>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.02em;">${note}</p>
              </div>`).join("")}
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:32px 48px 40px;">
          <a href="https://aromacircle.com/shop" style="display:inline-block;background-color:${gold};color:#000000;padding:14px 36px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;text-decoration:none;font-weight:500;">Explore Collection</a>
        </td></tr>
        <tr>
          <td style="padding:24px 48px;border-top:1px solid ${border};text-align:center;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">14 Strand St · China Doll Plaza, Montego Bay, Jamaica</p>
            <p style="margin:8px 0 0;font-size:10px;color:${textDim};">
              You received this because you subscribed at The Aroma Circle.
              <a href="mailto:${unsubscribeEmail}?subject=Unsubscribe" style="color:${textDim};">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Subscriber</title></head>
<body style="margin:0;padding:24px;background-color:${bgDeep};font-family:system-ui,sans-serif;color:#FFFFFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
    <tr><td>
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">New Subscriber</p>
      <h2 style="margin:0 0 20px;font-family:Georgia,serif;font-size:22px;font-weight:300;color:#FFFFFF;">Newsletter Sign-Up</h2>
      <p style="margin:0 0 6px;font-size:13px;color:#FFFFFF;"><strong style="color:${textMuted};font-weight:400;">Name: </strong>${payload.name}</p>
      <p style="margin:0 0 6px;font-size:13px;color:#FFFFFF;"><strong style="color:${textMuted};font-weight:400;">Email: </strong>${payload.email}</p>
      <p style="margin:16px 0 0;font-size:11px;color:${textDim};">Signed up: ${new Date(timestamp * 1000).toLocaleString("en-JM", { timeZone: "America/Jamaica" })}</p>
    </td></tr>
  </table>
</body>
</html>`;

  await sendEmail({
    to: payload.email,
    subject: "You're on the list — The Aroma Circle",
    html: userHtml,
    text: `Welcome to The Aroma Circle's private list, ${payload.name}.\n\nYou'll receive first access to new arrivals, limited editions, and exclusive offers.\n\nExplore our collection: https://aromacircle.com/shop\n\n— The Aroma Circle\n\nTo unsubscribe reply with "Unsubscribe" in the subject line.`,
    headers: {
      "List-Unsubscribe": unsubscribeHeader,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `New subscriber: ${payload.name}`,
      html: adminHtml,
      text: `New newsletter subscriber\n\nName: ${payload.name}\nEmail: ${payload.email}\nTime: ${new Date(timestamp * 1000).toLocaleString()}`,
    });
  }

  return { success: true };
}
