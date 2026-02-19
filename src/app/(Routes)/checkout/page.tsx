"use client";

import { useCart } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const router = useRouter();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const total = useMemo(() => getTotalPrice(), [cart]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, address } = customerInfo;
    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    console.log("Order details:", { customerInfo, cart, total });

    clearCart();
    router.push("/checkout/success");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black px-4">
        <p className="text-xl text-center">
          Your cart is empty.{" "}
          <a href="/shop" className="text-[#BD955E] underline">
            Shop now
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-52 px-4 md:px-12 pb-10">
      <h1 className="text-4xl font-bold mb-10 text-[#BD955E] text-center">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Customer Info Form */}
        <motion.form
          onSubmit={handlePlaceOrder}
          className="flex-1 bg-[#0a0a0a] p-6 rounded-2xl shadow-lg space-y-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          role="form"
        >
          <h2 className="text-2xl font-bold text-[#BD955E] mb-4">
            Customer Information
          </h2>

          {["name", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field} className="font-semibold capitalize">
                {field}
              </label>
              <motion.input
                id={field}
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
                aria-label={field}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#BD955E] focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <motion.textarea
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              aria-label="address"
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#BD955E] focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white resize-none"
              whileFocus={{ scale: 1.02 }}
              required
              rows={4}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`mt-4 w-full bg-[#BD955E] text-black py-3 rounded-xl font-semibold text-lg hover:bg-[#a6854e] transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Confirm Store Pickup"}
          </motion.button>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          className="flex-1 bg-[#0a0a0a] p-6 rounded-2xl shadow-lg md:sticky md:top-32 max-h-screen overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#BD955E] mb-4">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-[#222] pb-3"
              >
                <div className="w-16 h-16 relative rounded overflow-hidden shrink-0">
                  <Image
                    src={
                      item.images?.[0]
                        ? item.images[0] + ".jpg"
                        : "/placeholder.png"
                    }
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
