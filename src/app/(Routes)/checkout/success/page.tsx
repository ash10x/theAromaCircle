"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function CheckoutSuccessPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track window size for confetti
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
        recycle={false}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-col items-center gap-6 z-10 pt-12"
      >
        <CheckCircle2 className="text-[#BD955E] w-24 h-24" />
        <h1 className="text-5xl font-bold text-[#BD955E] text-center">
          Order Confirmed!
        </h1>
        <p className="text-center text-white text-lg max-w-md">
          Thank you for your order. Your items will be ready for store pickup
          shortly. You will also receive a confirmation email with your order
          details.
        </p>
        <Link href="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-[#692437] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#a6854e] transition"
          >
            Back to Shop
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
