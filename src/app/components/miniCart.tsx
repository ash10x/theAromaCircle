"use client";

import { useCart } from "../context/cartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MiniCart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-12 right-0 w-80 bg-[#0a0a0a] border border-[#BD955E] rounded-lg shadow-lg z-50 p-4 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-[#BD955E]">Cart</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-[#BD955E] font-bold"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-white text-sm text-center py-4">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-white font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-[#BD955E] text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-[#BD955E] text-black rounded hover:bg-[#a6854e] transition"
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
                          className="px-2 py-1 bg-[#BD955E] text-black rounded hover:bg-[#a6854e] transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Total */}
              <div className="mt-2 border-t border-[#BD955E] pt-3 flex justify-between items-center">
                <p className="text-white font-bold">Total:</p>
                <p className="text-[#BD955E] font-bold">
                  ${getTotal().toFixed(2)}
                </p>
              </div>

              {/* Checkout Button */}
              <Link href="/cart">
                <button className="mt-3 w-full bg-[#692437] py-2 rounded-lg font-semibold text-white hover:bg-[#a6854e] transition">
                  View Cart
                </button>
              </Link>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
