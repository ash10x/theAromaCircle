"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu } from "lucide-react";

const NAV_LINKS = ["Home", "Shop", "Brands", "About", "Contact"];

export default function NavMobile() {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    if (cartOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  /* Lock body scroll when nav or cart is open */
  useEffect(() => {
    document.body.style.overflow = navOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen, cartOpen]);

  return (
    <div>
      {/* ── TOP BAR ── */}
      {!navOpen && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-4 bg-[#080808]/95 backdrop-blur-md z-50 md:hidden border-b border-white/[0.06]">
          <Link href="/">
            <Image
              src="/logomobile.svg"
              height={25}
              width={100}
              alt="The Aroma Circle"
              className="h-5 w-auto"
            />
          </Link>

          <div className="flex items-center gap-5">
            <button
              className="relative text-white/50 hover:text-[#BD955E] transition-colors"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#BD955E] text-black rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-semibold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setNavOpen(true)}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      {/* ── NAV OVERLAY ── */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#080808] z-50 flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setNavOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <Link href="/" onClick={() => setNavOpen(false)} className="mb-14">
              <Image
                src="/logowhite.png"
                height={52}
                width={52}
                alt="The Aroma Circle"
              />
            </Link>

            <div className="flex flex-col items-center gap-9">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                    onClick={() => setNavOpen(false)}
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="text-white/60 text-[11px] tracking-[0.35em] uppercase hover:text-[#BD955E] transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-10 flex gap-1 items-center">
              <span className="w-8 h-px bg-white/10" />
              <p
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                className="text-white/20 text-sm tracking-widest italic px-3"
              >
                The Aroma Circle
              </p>
              <span className="w-8 h-px bg-white/10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CART PANEL ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
            />

            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[320px] bg-[#0A0A0A] z-50 flex flex-col border-l border-white/[0.06]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-7 py-6 border-b border-white/[0.06]">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="text-[10px] text-white/30 tracking-[0.35em] uppercase mb-0.5"
                  >
                    Your Selection
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                    className="text-white text-xl font-light tracking-wide"
                  >
                    Cart
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-7 py-6 space-y-7">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 pb-10">
                    <ShoppingBag
                      size={32}
                      strokeWidth={1}
                      className="text-white/10"
                    />
                    <p
                      style={{
                        fontFamily:
                          "var(--font-dm-sans), system-ui, sans-serif",
                      }}
                      className="text-white/30 text-sm tracking-wide"
                    >
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {item.images?.[0] && (
                        <div className="w-16 h-16 relative overflow-hidden shrink-0 bg-[#111]">
                          <Image
                            src={item.images[0] + ".jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily:
                              "var(--font-dm-sans), system-ui, sans-serif",
                          }}
                          className="text-white text-sm font-medium truncate"
                        >
                          {item.name}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5 tracking-wide">
                          {item.brand}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 border border-white/10 text-white/40 hover:border-[#BD955E]/50 hover:text-[#BD955E] transition text-xs flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="text-white text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 border border-white/10 text-white/40 hover:border-[#BD955E]/50 hover:text-[#BD955E] transition text-xs flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between shrink-0">
                        <p className="text-[#BD955E] text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/20 hover:text-white/50 text-xs transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="px-7 py-6 border-t border-white/[0.06] space-y-4">
                  <div className="flex justify-between items-center">
                    <span
                      style={{
                        fontFamily:
                          "var(--font-dm-sans), system-ui, sans-serif",
                      }}
                      className="text-[10px] text-white/40 tracking-[0.3em] uppercase"
                    >
                      Total
                    </span>
                    <span className="text-[#BD955E] font-medium">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <Link href="/checkout" onClick={() => setCartOpen(false)}>
                    <button className="w-full bg-[#BD955E] py-3.5 text-black text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-300">
                      Secure Checkout
                    </button>
                  </Link>

                  <button
                    onClick={() => setCartOpen(false)}
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="w-full border border-white/10 text-white/40 py-3 text-[11px] tracking-[0.25em] uppercase hover:text-white hover:border-white/20 transition-colors duration-300"
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
