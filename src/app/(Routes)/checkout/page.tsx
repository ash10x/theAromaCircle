"use client";

import { useCart } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo, useTransition } from "react";
import { MapPin } from "lucide-react";

const STORE_ADDRESS = "14 Strand St · China Doll Plaza, Montego Bay, Jamaica";

const FIELD_CONFIG = [
  { key: "name", label: "Full Name", type: "text", placeholder: "Jane Doe" },
  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 876 123 4567" },
] as const;

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const total = useMemo(() => getTotalPrice(), [cart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { name, email, phone } = customerInfo;
    if (!name || !email || !phone) {
      setMessage("Please complete all fields to continue.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...customerInfo, address: STORE_ADDRESS, cart, total }),
        });

        if (!response.ok) throw new Error("Order failed.");

        clearCart();
        router.push("/checkout/success");
      } catch (error) {
        console.error(error);
        setMessage("We were unable to place your pre-order right now. Please try again.");
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#080808] px-6 gap-4">
        <p
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          className="text-white/40 text-2xl font-light italic"
        >
          Your cart is empty.
        </p>
        <a
          href="/shop"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-[11px] text-[#BD955E] tracking-[0.3em] uppercase hover:underline"
        >
          Explore Collection
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 md:pt-39 px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center py-12 md:py-16 border-b border-white/4 mb-12">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-3"
          >
            Pre-Order
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[36pt] max-sm:text-[26pt] font-light"
          >
            Reserve Your Fragrance
          </h1>
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="mt-4 text-white/30 text-sm font-light tracking-wide max-w-lg mx-auto leading-relaxed"
          >
            Place your pre-order and collect in-store within 1–2 days.
            Visit us to smell your selection before finalising your purchase.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handlePlaceOrder}
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border border-white/6 bg-[#0D0D0D] p-8 space-y-6">
              <div className="pb-4 border-b border-white/4">
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[10px] text-[#BD955E] tracking-[0.4em] uppercase font-light mb-1"
                >
                  Your Details
                </p>
                <h2
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  className="text-2xl font-light"
                >
                  Contact Information
                </h2>
              </div>

              {FIELD_CONFIG.map(({ key, label, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label
                    htmlFor={key}
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[10px] text-white/30 tracking-[0.35em] uppercase block"
                  >
                    {label}
                  </label>
                  <input
                    id={key}
                    type={type}
                    name={key}
                    value={(customerInfo as any)[key]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="w-full bg-[#080808] border border-white/8 px-5 py-3.5 text-white text-sm placeholder-white/15 focus:border-[#BD955E]/40 focus:outline-none transition-colors duration-300 tracking-wide"
                  />
                </div>
              ))}
            </div>

            {/* Store pickup notice */}
            <div className="border border-[#BD955E]/20 bg-[#BD955E]/5 p-6 flex gap-4 items-start">
              <MapPin size={16} strokeWidth={1.5} className="text-[#BD955E] mt-0.5 shrink-0" />
              <div>
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[10px] text-[#BD955E] tracking-[0.35em] uppercase mb-2"
                >
                  Store Collection
                </p>
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-white/60 text-sm font-light leading-relaxed"
                >
                  Your order will be ready for collection at our boutique within <span className="text-white/80">1–2 days</span>.
                  You are welcome to smell any fragrance before finalising your purchase in-store.
                </p>
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[#BD955E]/70 text-xs font-light mt-3 tracking-wide"
                >
                  A valid government-issued ID is required at the time of collection.
                </p>
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-white/40 text-xs mt-2 tracking-wide"
                >
                  {STORE_ADDRESS}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-[#BD955E] py-4 text-black text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Processing Your Pre-Order…" : "Place Pre-Order"}
            </button>

            {message && (
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-center text-sm text-[#BD955E]/60 font-light"
              >
                {message}
              </p>
            )}
          </motion.form>

          {/* Order Summary */}
          <motion.aside
            className="lg:w-96 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="border border-white/6 bg-[#0D0D0D] p-8 sticky top-28">
              <div className="pb-4 border-b border-white/4 mb-6">
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[10px] text-[#BD955E] tracking-[0.4em] uppercase font-light mb-1"
                >
                  Pre-Order Summary
                </p>
                <h2
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  className="text-2xl font-light"
                >
                  Your Selection
                </h2>
              </div>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-5 border-b border-white/4 last:border-0 last:pb-0">
                    <div className="relative h-16 w-16 overflow-hidden bg-[#111] shrink-0">
                      <Image
                        src={item.images?.[0] ? `${item.images[0]}.jpg` : "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                        className="text-white text-sm font-medium truncate"
                      >
                        {item.name}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-[#BD955E] text-sm shrink-0"
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/4 space-y-3">
                <div className="flex justify-between text-xs text-white/30 tracking-wide">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/30 tracking-wide">
                  <span>Collection</span>
                  <span className="text-white/50">In-Store Pickup</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-white/4">
                  <span
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[10px] tracking-[0.35em] uppercase text-white/40"
                  >
                    Total
                  </span>
                  <span
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[#BD955E] text-xl font-light"
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Reassurance */}
              <div className="mt-6 pt-5 border-t border-white/4 space-y-2">
                {[
                  "Ready for collection in 1–2 days",
                  "Smell before you commit in-store",
                  "100% authentic fragrances",
                  "Valid gov't ID required for pickup",
                ].map((note) => (
                  <div key={note} className="flex items-center gap-2.5">
                    <span className="w-3 h-px bg-[#BD955E]/40 shrink-0" />
                    <p
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-white/25 text-[11px] font-light tracking-wide"
                    >
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
