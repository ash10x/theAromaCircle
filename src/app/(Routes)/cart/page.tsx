"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const total = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <p className="text-xl">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-[#BD955E] underline">
            Shop now
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-50 mb-5 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-[#BD955E] mb-8 text-center">
        Your Cart
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6 bg-[#0a0a0a] p-4 rounded-lg shadow hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="w-32 h-32 relative rounded overflow-hidden">
              <Image
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm text-[#BD955E] font-semibold uppercase">
                {item.brand}
              </p>
              <h2 className="text-xl font-bold">{item.name}</h2>
              {item.rating && (
                <p className="text-amber-400 font-semibold">★ {item.rating}</p>
              )}
              <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-[#BD955E] text-black rounded hover:bg-[#a6854e] transition"
                >
                  -
                </button>
                <span className="text-white font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-[#BD955E] text-black rounded hover:bg-[#a6854e] transition"
                >
                  +
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Cart Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 bg-[#0a0a0a] p-6 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">
            Total: <span className="text-[#BD955E]">${total.toFixed(2)}</span>
          </p>
          <Link href="/checkout">
            <button className="bg-[#692437] px-8 py-3 rounded-lg font-semibold hover:bg-[#a6854e] transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
