"use server";

import { db } from "../index";
import { orders } from "../schema";
import { sendEmail } from "../mailer";

export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  brand?: string;
};

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cart: OrderItem[];
  total: number;
};

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

  const itemRows = payload.cart
    .map(
      (item) =>
        `<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;">${item.name}</td><td style="padding:10px 0; text-align:right;">${item.quantity}</td><td style="padding:10px 0; text-align:right;">$${(
          item.price * item.quantity
        ).toFixed(2)}</td></tr>`,
    )
    .join("");

  const userHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>Order confirmed</h1>
      <p>Thank you, ${payload.name}. Your order has been received and is being processed.</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:10px 0;">Item</th>
            <th style="text-align:right;padding:10px 0;">Qty</th>
            <th style="text-align:right;padding:10px 0;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
      <p><strong>Total:</strong> $${payload.total.toFixed(2)}</p>
      <p>Shipping details:</p>
      <p>${payload.address}</p>
      <p>We will email you with status updates shortly.</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.7;">
      <h1>New order received</h1>
      <p><strong>Customer:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      <p><strong>Address:</strong> ${payload.address}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:10px 0;">Item</th>
            <th style="text-align:right;padding:10px 0;">Qty</th>
            <th style="text-align:right;padding:10px 0;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
      <p><strong>Total:</strong> $${payload.total.toFixed(2)}</p>
      <p>Received at ${new Date(timestamp).toLocaleString()}</p>
    </div>
  `;

  await sendEmail({
    to: payload.email,
    subject: "Your Aroma Circle order is confirmed",
    html: userHtml,
  });

  if (process.env.EMAIL_ADMIN) {
    await sendEmail({
      to: process.env.EMAIL_ADMIN,
      subject: `New order from ${payload.name}`,
      html: adminHtml,
    });
  }

  return { success: true };
}
