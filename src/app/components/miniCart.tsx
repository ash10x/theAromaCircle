"use client";

import { useCart } from "../context/cartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";

export default function MiniCart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, closeCart } =
    useCart();

  const pathname = usePathname();
  const total = getTotalPrice();

  useEffect(() => {
    if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) {
      closeCart();
    }
  }, [pathname, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-18 right-6 w-80 bg-[#0A0A0A] border border-white/8 z-50 flex flex-col max-h-[80vh] shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/6">
              <div>
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[10px] text-white/30 tracking-[0.35em] uppercase mb-0.5"
                >
                  Your Selection
                </p>
                <h2
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  className="text-white text-lg font-light"
                >
                  Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/25 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Empty state */}
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 gap-3">
                <ShoppingBag size={28} strokeWidth={1} className="text-white/10" />
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-white/25 text-sm tracking-wide"
                >
                  Your cart is empty
                </p>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
                  {cart.map((item) => {
                    const imageSrc =
                      item.images && item.images.length > 0
                        ? `${item.images[0]}.jpg`
                        : "/products/placeholder.jpg";

                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-14 h-14 relative overflow-hidden shrink-0 bg-[#111]">
                          <Image
                            src={imageSrc}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/products/placeholder.jpg";
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                            className="text-white text-sm font-medium leading-tight line-clamp-2"
                          >
                            {item.name}
                          </p>
                          <p className="text-[#BD955E] text-sm mt-1">${item.price.toFixed(2)}</p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 border border-white/10 text-white/40 hover:border-[#BD955E]/40 hover:text-[#BD955E] transition text-xs flex items-center justify-center disabled:opacity-30"
                            >
                              −
                            </button>
                            <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 border border-white/10 text-white/40 hover:border-[#BD955E]/40 hover:text-[#BD955E] transition text-xs flex items-center justify-center"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                              className="ml-auto text-white/20 hover:text-white/50 text-xs transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total + Actions */}
                <div className="px-6 py-5 border-t border-white/6 space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-[10px] text-white/30 tracking-[0.3em] uppercase"
                    >
                      Total
                    </span>
                    <span className="text-[#BD955E] font-medium">${total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout" onClick={closeCart}>
                    <button className="w-full bg-[#BD955E] py-3 text-black text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-300">
                      Secure Checkout
                    </button>
                  </Link>

                  <Link href="/cart" onClick={closeCart}>
                    <button
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="w-full border border-white/10 text-white/40 py-2.5 text-[11px] tracking-[0.25em] uppercase hover:text-white hover:border-white/20 transition-colors duration-300"
                    >
                      View Cart
                    </button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
