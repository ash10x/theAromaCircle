"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  description?: string;
  images: string[];
}

export default function ProductPage({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasImages = product.images && product.images.length > 0;

  /* ================= IMAGE NAVIGATION ================= */

  const nextImage = useCallback(() => {
    if (!hasImages) return;
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  }, [product.images.length, hasImages]);

  const prevImage = useCallback(() => {
    if (!hasImages) return;
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  }, [product.images.length, hasImages]);

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {
    if (loading) return;

    setLoading(true);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      images: product.images,
      quantity,
    });

    openCart();

    setTimeout(() => setLoading(false), 500);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 px-4 md:px-6 pb-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-20">
        {/* ================= IMAGE GALLERY ================= */}
        <div>
          <div className="relative aspect-square bg-[#111] rounded-2xl overflow-hidden border border-[#1a1a1a] hover:border-[#BD955E]/50 transition">
            {hasImages ? (
              <Image
                src={product.images[currentImage] + ".jpg"}
                alt={product.name}
                fill
                priority
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image
              </div>
            )}

            {hasImages && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 rounded-full transition"
                >
                  <ArrowLeft size={22} />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 rounded-full transition"
                >
                  <ArrowRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* ================= THUMBNAILS ================= */}

          {hasImages && product.images.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border transition ${
                    currentImage === i
                      ? "border-[#BD955E]"
                      : "border-[#1a1a1a] hover:border-[#BD955E]/40"
                  }`}
                >
                  <Image
                    src={img + ".jpg"}
                    alt={`${product.name} thumbnail`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex flex-col justify-center">
          <p className="text-[#BD955E] uppercase tracking-wider text-sm">
            {product.brand}
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-[#BD955E] mt-4">
            ${product.price.toFixed(2)}{" "}
            <span className="text-sm text-[#BD955E]/70 font-semibold tracking-wide">
              JMD
            </span>
          </p>

          {/* DESCRIPTION */}

          <p className="text-gray-400 mt-6 leading-relaxed">
            {product.description ??
              "A premium fragrance crafted for those who appreciate timeless elegance and unforgettable presence."}
          </p>

          {/* ================= QUANTITY ================= */}

          <div className="flex items-center gap-4 mt-8">
            <span className="text-gray-400 text-sm">Quantity</span>

            <div className="flex items-center border border-[#BD955E]/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-[#111] transition"
              >
                -
              </button>

              <span className="px-4 min-w-[40px] text-center">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 hover:bg-[#111] transition"
              >
                +
              </button>
            </div>
          </div>

          {/* ================= ADD TO CART ================= */}

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-8 bg-[#692437] hover:bg-[#692437]/80 py-4 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding to Cart..." : "Add to Cart"}
          </button>

          {/* ================= BACK LINK ================= */}

          <Link
            href="/shop"
            className="mt-6 text-[#BD955E] text-sm hover:underline"
          >
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
