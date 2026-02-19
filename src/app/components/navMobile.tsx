"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function NavMobile() {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    if (cartOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  return (
    <div className={navOpen ? "overflow-hidden" : "overflow-auto"}>
      {/* ===================== TOP BAR ===================== */}
      {!navOpen && (
        <div className="fixed top-0 right-0 flex items-center justify-end gap-4 px-5 py-5 w-full bg-black/95 backdrop-blur-md z-50 md:hidden border-b border-[#1a1a1a]">
          {/* Logo */}
          <Link href="/">
            <Image
              className="absolute left-4 top-4 w-36 h-auto"
              src="/logomobile.svg"
              height={140}
              width={140}
              alt="logo"
            />
          </Link>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <Image src="/icons/cart.svg" height={22} width={22} alt="cart" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#BD955E] to-[#e6c78b] text-black text-[10px] font-bold px-1.5 py-[2px] rounded-full shadow-md">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>

          {/* Menu */}
          <Image
            className="w-6 h-auto cursor-pointer"
            src="/icons/menu.svg"
            height={24}
            width={24}
            alt="menu"
            onClick={() => setNavOpen(true)}
          />
        </div>
      )}

      {/* ===================== NAV OVERLAY ===================== */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setNavOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ×
            </button>

            <Link href="/" onClick={() => setNavOpen(false)}>
              <Image
                src="/logowhite.png"
                height={60}
                width={60}
                alt="logo"
                className="mb-12"
              />
            </Link>

            <div className="flex flex-col gap-10 text-white text-lg tracking-widest uppercase">
              {["Home", "Shop", "Brands", "About", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="hover:text-[#BD955E] transition duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== CART ===================== */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black backdrop-blur-md z-40"
              onClick={() => setCartOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#0e0e0e] z-50 flex flex-col shadow-2xl border-l border-[#1c1c1c]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#1a1a1a]">
                <h2 className="text-white text-lg tracking-wider uppercase">
                  Your Cart
                </h2>
                <button
                  className="text-white text-2xl"
                  onClick={() => setCartOpen(false)}
                >
                  ×
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center mt-16">
                    Your cart is empty.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {item.images?.[0] && (
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                          <Image
                            src={item.images[0] + ".jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.brand}</p>

                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 border border-[#333] text-white rounded"
                          >
                            −
                          </button>
                          <span className="text-white">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 border border-[#333] text-white rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className="text-[#BD955E] font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#1a1a1a]">
                  <div className="flex justify-between text-white mb-5 text-lg">
                    <span>Total</span>
                    <span className="text-[#BD955E] font-bold">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => (window.location.href = "/checkout")}
                    className="w-full bg-gradient-to-r from-[#BD955E] to-[#e6c78b] text-black py-3 rounded-lg font-semibold tracking-wide shadow-lg hover:opacity-90 transition mb-3"
                  >
                    Secure Checkout
                  </button>

                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full border border-[#333] text-white py-3 rounded-lg font-medium hover:bg-[#111] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
