"use client";

import { useCart } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const router = useRouter();
  const total = getTotalPrice();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, address } = customerInfo;
    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Example API call placeholder
    console.log("Order details:", { customerInfo, cart, total });

    clearCart();
    router.push("/checkout/success");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl">
          Your cart is empty.{" "}
          <a href="/shop" className="text-[#BD955E] underline">
            Shop now
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-50 mb-5 px-4 md:px-12">
      <h1 className="text-4xl font-bold mb-10 text-[#BD955E] text-center">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Column: Customer Info Form */}
        <motion.form
          onSubmit={handlePlaceOrder}
          className="flex-1 bg-[#0a0a0a] p-6 rounded-2xl shadow-lg space-y-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#BD955E] mb-4">
            Customer Information
          </h2>

          {["name", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label className="font-semibold capitalize">{field}</label>
              <motion.input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                      ? "tel"
                      : "text"
                }
                name={field}
                value={(customerInfo as any)[field]}
                onChange={handleChange}
                placeholder={
                  field === "name"
                    ? "John Doe"
                    : field === "email"
                      ? "email@example.com"
                      : "+1 234 567 890"
                }
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#BD955E] focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Address</label>
            <motion.textarea
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#BD955E] focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 w-full bg-[#BD955E] text-black py-3 rounded-xl font-semibold text-lg hover:bg-[#a6854e] transition"
          >
            Confirm Store Pickup
          </motion.button>
        </motion.form>

        {/* Right Column: Sticky Order Summary */}
        <motion.div
          className="flex-1 bg-[#0a0a0a] p-6 rounded-2xl shadow-lg md:sticky md:top-32"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#BD955E] mb-4">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-125 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-[#222] pb-3"
              >
                <div className="w-16 h-16 relative rounded overflow-hidden">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-xl font-bold border-t border-[#BD955E] pt-4">
            <span>Total</span>
            <span className="text-[#BD955E]">${total.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
