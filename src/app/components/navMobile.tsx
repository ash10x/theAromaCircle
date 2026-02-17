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
      {/* Top nav bar */}
      <div
        className={
          !navOpen
            ? "fixed top-0 right-0 flex flex-row items-center gap-2.5 justify-end p-5 h-max w-full bg-black z-50 md:hidden"
            : "hidden"
        }
      >
        <Link href="/">
          <Image
            className="absolute left-2.5 top-4.5 w-40 h-auto cursor-pointer md:hidden"
            src={"/logomobile.svg"}
            height={160}
            width={160}
            alt="logo"
          />
        </Link>

        {/* Search icon */}
        <Image
          className="w-6 h-auto cursor-pointer md:hidden"
          src={"/icons/search.svg"}
          height={25}
          width={25}
          alt="search"
        />

        {/* Cart icon */}
        <div className="relative">
          <Image
            className="w-6 h-auto cursor-pointer md:hidden"
            src={"/icons/cart.svg"}
            height={25}
            width={25}
            alt="cart"
            onClick={() => setCartOpen(true)}
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#BD955E] text-black rounded-full px-1 text-xs font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>

        {/* Menu icon */}
        <Image
          className="w-6 h-auto cursor-pointer md:hidden"
          src={"/icons/menu.svg"}
          height={25}
          width={25}
          alt="menu"
          onClick={() => setNavOpen(true)}
        />
      </div>

      {/* Nav overlay */}
      <div
        className={
          navOpen
            ? "fixed top-0 right-0 flex flex-col items-center justify-center h-screen w-full bg-black z-40 overflow-hidden transition-all duration-300 md:hidden"
            : "fixed top-0 right-0 flex flex-col items-center justify-center h-0 w-full bg-black z-40 overflow-hidden transition-all duration-300 md:hidden"
        }
      >
        {/* Close button */}
        <Image
          className="absolute top-0 mt-6 right-3 w-[34px] h-auto cursor-pointer"
          src={"/icons/arrowup.svg"}
          height={34}
          width={34}
          alt="close"
          onClick={() => setNavOpen(false)}
        />

        <Link href="/">
          <Image
            className="w-auto h-auto mt-5 mb-10"
            src={"/logowhite.png"}
            height={60}
            width={60}
            alt="logo"
            onClick={() => setNavOpen(false)}
          />
        </Link>

        <div className="flex flex-col items-center gap-10 text-white font-semibold mb-20">
          {["Home", "Shop", "Brands", "About", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="cursor-pointer hover:scale-110 hover:text-[#BD955E] transition duration-200"
              onClick={() => setNavOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* MiniCart with Backdrop Blur */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-black z-50 flex flex-col shadow-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-[#222]">
                <h2 className="text-white text-xl font-semibold">Your Cart</h2>
                <button
                  className="text-white text-2xl font-bold"
                  onClick={() => setCartOpen(false)}
                >
                  ×
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center mt-10">
                    Your cart is empty.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center border-b border-[#222] pb-3"
                    >
                      {item.images?.[0] && (
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.brand}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 text-white border border-[#333] rounded"
                          >
                            −
                          </button>
                          <span className="text-white">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 text-white border border-[#333] rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="text-[#BD955E] font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#222]">
                  <div className="flex justify-between mb-4 text-lg font-bold text-white">
                    <span>Total</span>
                    <span className="text-[#BD955E]">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => (window.location.href = "/checkout")}
                    className="w-full bg-[#BD955E] text-black py-3 rounded-lg font-semibold mb-3"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-[#111] text-white border border-[#333] py-3 rounded-lg font-semibold"
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
