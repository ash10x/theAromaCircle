"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const STORE_ADDRESS = "14 Strand St · China Doll Plaza, Montego Bay, Jamaica";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6 py-24 pt-40 md:pt-52 relative overflow-hidden">

      {/* Ambient glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#BD955E]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">

        {/* Animated icon ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center mb-10"
        >
          {/* Outer pulsing ring */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full border border-[#BD955E]/30"
          />
          {/* Inner ring */}
          <span className="w-16 h-16 rounded-full border border-[#BD955E]/40 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BD955E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M4 12.5l5 5L20 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              />
            </svg>
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.2)}
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
        >
          Pre-Order Confirmed
        </motion.p>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.3)}
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          className="text-[38pt] max-sm:text-[28pt] font-light text-white leading-[1.05] mb-6"
        >
          Your Order <br />
          <em className="not-italic text-[#BD955E]/90">is Placed</em>
        </motion.h1>

        {/* Body text */}
        <motion.p
          {...fadeUp(0.4)}
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-white/40 text-sm font-light leading-relaxed tracking-wide max-w-sm mb-10"
        >
          Thank you for your pre-order. A confirmation email has been sent to you.
          Your fragrances will be ready for collection at our boutique within{" "}
          <span className="text-white/70">1–2 days</span>.
        </motion.p>

        {/* Info box */}
        <motion.div
          {...fadeUp(0.5)}
          className="w-full border border-[#BD955E]/20 bg-[#BD955E]/5 p-6 mb-10 text-left"
        >
          <div className="flex gap-4 items-start">
            <MapPin size={15} strokeWidth={1.5} className="text-[#BD955E] mt-0.5 shrink-0" />
            <div className="space-y-3">
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-[#BD955E] tracking-[0.4em] uppercase mb-2"
              >
                Collection Details
              </p>
              {[
                "Ready for in-store collection within 1–2 days",
                "You're welcome to smell any fragrance before finalising",
                "A valid government-issued ID is required at pickup",
              ].map((note) => (
                <div key={note} className="flex items-start gap-2.5">
                  <span className="w-3 h-px bg-[#BD955E]/40 shrink-0 mt-2" />
                  <p
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-white/40 text-[11px] font-light tracking-wide leading-relaxed"
                  >
                    {note}
                  </p>
                </div>
              ))}
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-white/20 text-xs mt-3 tracking-wide"
              >
                {STORE_ADDRESS}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.6)} className="flex items-center gap-5 flex-wrap justify-center">
          <Link
            href="/shop"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="px-10 py-4 bg-[#BD955E] text-black text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-400"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[11px] text-white/30 tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
