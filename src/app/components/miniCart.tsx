"use client";

import { useCart } from "../context/cartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MiniCart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, closeCart } =
    useCart();

  const total = getTotalPrice();
  const pathname = usePathname();

  /* Close cart automatically when navigating to cart pages */
  useEffect(() => {
    if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) {
      closeCart();
    }
  }, [pathname, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 right-4 sm:right-6 w-72 sm:w-80 bg-[#0a0a0a] border border-[#BD955E] rounded-xl shadow-xl z-50 p-4 flex flex-col gap-4 max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-[#BD955E]">Cart</h2>

              <button
                onClick={onClose}
                className="text-white hover:text-[#BD955E] font-bold text-xl"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Empty State */}
            {cart.length === 0 ? (
              <p className="text-white text-sm text-center py-4">
                Your cart is empty
              </p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[50vh] pr-1">
                  {cart.map((item) => {
                    const imageSrc = item.images?.[0]
                      ? `/products/${item.images[0]}.jpg`
                      : "/products/placeholder.jpg";

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        {/* Product Image */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={imageSrc}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col gap-1">
                          <p className="text-white font-semibold text-sm sm:text-base line-clamp-2">
                            {item.name}
                          </p>

                          <p className="text-[#BD955E] text-sm sm:text-base">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 bg-[#BD955E] text-black rounded-lg hover:bg-[#a6854e] transition disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>

                            <span className="text-white text-sm">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 bg-[#BD955E] text-black rounded-lg hover:bg-[#a6854e] transition"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="mt-3 border-t border-[#BD955E] pt-3 flex justify-between items-center">
                  <p className="text-white font-bold">Total:</p>

                  <p className="text-[#BD955E] font-bold">
                    ${total.toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-3">
                  <Link href="/cart" onClick={closeCart}>
                    <button className="w-full bg-[#692437] py-2 rounded-lg font-semibold text-white hover:bg-[#a6854e] transition">
                      View Cart
                    </button>
                  </Link>

                  <Link href="/checkout" onClick={closeCart}>
                    <button className="w-full bg-[#BD955E] py-2 rounded-lg font-semibold text-black hover:bg-[#a6854e] transition">
                      Checkout
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
