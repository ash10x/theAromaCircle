"use server";

import { db } from "../index";
import { orders } from "../schema";
import { sendEmail } from "../mailer";
import { sendWhatsApp } from "../whatsapp";

export type OrderItem = {
  id: number;
  name: string;
  brand?: string;
  quantity: number;
  price: number;
  images?: string[];
};

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cart: OrderItem[];
  total: number;
};

// ─── helpers ─────────────────────────────────────────────────────────────────

const gold = "#BD955E";
const bg = "#0D0D0D";
const bgDeep = "#080808";
const border = "#1A1A1A";
const textMuted = "#888888";
const textDim = "#555555";

function baseWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Aroma Circle</title>
</head>
<body style="margin:0;padding:0;background-color:${bgDeep};font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#FFFFFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgDeep};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${bg};border:1px solid ${border};">

          <!-- Header -->
          <tr>
            <td style="padding:40px 48px 32px;border-bottom:1px solid ${border};text-align:center;">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.45em;text-transform:uppercase;color:${gold};font-weight:300;">
                The Aroma Circle
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:300;color:#FFFFFF;letter-spacing:0.02em;">
                Where Scents Become Signatures
              </h1>
            </td>
          </tr>

          ${content}

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;border-top:1px solid ${border};text-align:center;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">
                14 Strand St · China Doll Plaza, Montego Bay, Jamaica
              </p>
              <p style="margin:0;font-size:11px;color:${textDim};font-style:italic;font-family:Georgia,'Times New Roman',serif;">
                Where Scents Become Signatures
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function itemRows(cart: OrderItem[]) {
  return cart
    .map(
      (item) => `
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid ${border};">
            <p style="margin:0 0 3px;font-size:15px;font-family:Georgia,'Times New Roman',serif;font-weight:300;color:#FFFFFF;">
              ${item.name}
            </p>
            ${item.brand ? `<p style="margin:0;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${gold};">${item.brand}</p>` : ""}
          </td>
          <td style="padding:16px 0;border-bottom:1px solid ${border};text-align:center;vertical-align:top;">
            <p style="margin:0;font-size:13px;color:${textMuted};">×${item.quantity}</p>
          </td>
          <td style="padding:16px 0;border-bottom:1px solid ${border};text-align:right;vertical-align:top;">
            <p style="margin:0;font-size:14px;color:${gold};">$${(item.price * item.quantity).toFixed(2)}</p>
            ${item.quantity > 1 ? `<p style="margin:3px 0 0;font-size:10px;color:${textDim};">$${item.price.toFixed(2)} each</p>` : ""}
          </td>
        </tr>`,
    )
    .join("");
}

// ─── user email ───────────────────────────────────────────────────────────────

function buildUserEmail(payload: OrderPayload) {
  const content = `
          <!-- Body -->
          <tr>
            <td style="padding:40px 48px 0;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">Pre-Order Confirmed</p>
              <h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#FFFFFF;">
                Thank you, ${payload.name}.
              </h2>
              <p style="margin:0;font-size:13px;color:${textMuted};line-height:1.7;">
                Your pre-order has been received. Your fragrances will be ready for
                collection at our boutique within <span style="color:#FFFFFF;">1–2 days</span>.
                We invite you to visit us to smell any scent before finalising your purchase in-store.
              </p>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding:32px 48px 0;">
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">Your Selection</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="text-align:left;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Fragrance</th>
                    <th style="text-align:center;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Qty</th>
                    <th style="text-align:right;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows(payload.cart)}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:0 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${border};margin-top:8px;">
                <tr>
                  <td style="padding:20px 0;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${textDim};">Total</p>
                  </td>
                  <td style="padding:20px 0;text-align:right;">
                    <p style="margin:0;font-size:22px;font-family:Georgia,'Times New Roman',serif;font-weight:300;color:${gold};">
                      $${payload.total.toFixed(2)}
                      <span style="font-size:11px;color:${textDim};margin-left:4px;">JMD</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pickup notice -->
          <tr>
            <td style="padding:24px 48px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid #2A1F10;padding:0;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">Collection Details</p>
                    <p style="margin:0 0 6px;font-size:13px;color:#CCCCCC;line-height:1.7;">
                      Ready for in-store collection within <strong style="color:#FFFFFF;">1–2 days</strong>.
                      Payment and final confirmation happen at the boutique.
                    </p>
                    <p style="margin:8px 0 0;font-size:11px;color:${textDim};letter-spacing:0.02em;">
                      ${payload.address}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return baseWrapper(content);
}

// ─── admin email ──────────────────────────────────────────────────────────────

function buildAdminEmail(payload: OrderPayload, timestamp: number) {
  const content = `
          <!-- Body -->
          <tr>
            <td style="padding:40px 48px 0;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${gold};">New Pre-Order</p>
              <h2 style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#FFFFFF;">
                Order Received
              </h2>

              <!-- Customer details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid ${border};margin-bottom:32px;">
                <tr><td style="padding:24px 28px;">
                  <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">Customer</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:4px 0;width:80px;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Name</p></td>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:14px;color:#FFFFFF;">${payload.name}</p></td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Email</p></td>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:14px;color:#FFFFFF;">${payload.email}</p></td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Phone</p></td>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:14px;color:#FFFFFF;">${payload.phone}</p></td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${textDim};">Time</p></td>
                      <td style="padding:4px 0;"><p style="margin:0;font-size:13px;color:${textMuted};">${new Date(timestamp).toLocaleString("en-JM", { timeZone: "America/Jamaica" })}</p></td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding:0 48px 0;">
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${textDim};">Items Ordered</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="text-align:left;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Fragrance</th>
                    <th style="text-align:center;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Qty</th>
                    <th style="text-align:right;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${textDim};font-weight:400;padding-bottom:12px;border-bottom:1px solid ${border};">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows(payload.cart)}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:0 48px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${border};margin-top:8px;">
                <tr>
                  <td style="padding:20px 0;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${textDim};">Order Total</p>
                  </td>
                  <td style="padding:20px 0;text-align:right;">
                    <p style="margin:0;font-size:22px;font-family:Georgia,'Times New Roman',serif;font-weight:300;color:${gold};">
                      $${payload.total.toFixed(2)}
                      <span style="font-size:11px;color:${textDim};margin-left:4px;">JMD</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return baseWrapper(content);
}

// ─── whatsapp message ─────────────────────────────────────────────────────────

function buildWhatsAppMessage(payload: OrderPayload, timestamp: number) {
  const itemLines = payload.cart
    .map((item) => {
      const brand = item.brand ? ` (${item.brand})` : "";
      return `  • ${item.name}${brand}\n    Qty: ${item.quantity}  |  $${(item.price * item.quantity).toFixed(2)} JMD`;
    })
    .join("\n");

  const time = new Date(timestamp).toLocaleString("en-JM", {
    timeZone: "America/Jamaica",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    `*NEW PRE-ORDER — THE AROMA CIRCLE*\n` +
    `─────────────────────────\n` +
    `*CUSTOMER*\n` +
    `Name:  ${payload.name}\n` +
    `Phone: ${payload.phone}\n` +
    `Email: ${payload.email}\n\n` +
    `*ITEMS ORDERED*\n` +
    `${itemLines}\n\n` +
    `*TOTAL:  $${payload.total.toFixed(2)} JMD*\n` +
    `─────────────────────────\n` +
    `Collection: ${payload.address}\n` +
    `Placed: ${time}`
  );
}

// ─── main export ──────────────────────────────────────────────────────────────

export async function submitOrder(payload: OrderPayload) {
  if (!payload.cart || payload.cart.length === 0) {
    throw new Error("Cart cannot be empty.");
  }

  const timestamp = Date.now();

  const orderRecords = payload.cart.map((item) => ({
    user_name: payload.name,
    user_email: payload.email,
    user_address: payload.address,
    user_phone: payload.phone,
    fragrance_id: item.id,
    quantity: item.quantity,
    total_price: item.price * item.quantity,
    status: "pending",
    created_at: timestamp,
  }));

  await db.insert(orders).values(orderRecords);

  await sendEmail({
    to: payload.email,
    subject: "Your Aroma Circle pre-order is confirmed",
    html: buildUserEmail(payload),
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `New pre-order from ${payload.name} — $${payload.total.toFixed(2)} JMD`,
      html: buildAdminEmail(payload, timestamp),
    });
  }

  await sendWhatsApp(buildWhatsAppMessage(payload, timestamp));

  return { success: true };
}
