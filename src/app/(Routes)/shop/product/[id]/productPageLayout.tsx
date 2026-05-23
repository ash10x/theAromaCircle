"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const nextImage = useCallback(() => {
    if (!hasImages) return;
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  }, [product.images.length, hasImages]);

  const prevImage = useCallback(() => {
    if (!hasImages) return;
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product.images.length, hasImages]);

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

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 md:pt-39 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-10 pb-6">
        <Link
          href="/shop"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="inline-flex items-center gap-2 text-[11px] text-white/25 tracking-[0.3em] uppercase hover:text-[#BD955E] transition-colors duration-300"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 mt-4">

        {/* ── IMAGE GALLERY ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square bg-[#0D0D0D] overflow-hidden border border-white/6 hover:border-[#BD955E]/20 transition-colors duration-500">
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
              <div className="flex items-center justify-center h-full text-white/20">
                <p
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  className="text-xl italic font-light"
                >
                  No Image Available
                </p>
              </div>
            )}

            {hasImages && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 text-white/60 hover:text-white transition-all duration-300"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 text-white/60 hover:text-white transition-all duration-300"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Image counter */}
            {hasImages && product.images.length > 1 && (
              <div className="absolute bottom-4 right-4">
                <span
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[10px] text-white/30 tracking-wider"
                >
                  {currentImage + 1} / {product.images.length}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {hasImages && product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-16 h-16 overflow-hidden border transition-colors duration-300 ${
                    currentImage === i
                      ? "border-[#BD955E]/60"
                      : "border-white/6 hover:border-white/20"
                  }`}
                >
                  <Image
                    src={img + ".jpg"}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── PRODUCT DETAILS ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col justify-start pt-4"
        >
          {/* Brand + category */}
          <div className="flex items-center justify-between mb-6">
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[11px] text-[#BD955E] tracking-[0.4em] uppercase font-light"
            >
              {product.brand}
            </p>
            <span
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[9px] tracking-[0.3em] uppercase text-white/20 border border-white/8 px-3 py-1"
            >
              {product.category}
            </span>
          </div>

          {/* Name */}
          <h1
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-4xl md:text-5xl font-light leading-tight tracking-tight"
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-6 pb-6 border-b border-white/6">
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-3xl text-[#BD955E] font-light"
            >
              ${product.price.toFixed(2)}
            </p>
            <span
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[11px] text-[#BD955E]/40 tracking-widest"
            >
              JMD
            </span>
          </div>

          {/* Description */}
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/40 mt-6 leading-relaxed text-sm font-light tracking-wide"
          >
            {product.description ??
              "A premium fragrance crafted for those who appreciate timeless elegance and unforgettable presence. Each note is a statement; each wear, a memory."}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-5 mt-8">
            <span
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[11px] text-white/25 tracking-[0.3em] uppercase"
            >
              Quantity
            </span>

            <div className="flex items-center border border-white/8">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
              >
                −
              </button>
              <span
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="px-5 min-w-12 text-center text-sm text-white"
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="mt-8 w-full bg-[#BD955E] py-4 text-black text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding to Cart…" : "Add to Cart"}
          </button>

          {/* Trust line */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/4">
            <span className="w-4 h-px bg-[#BD955E]/30" />
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-white/20 text-[10px] tracking-[0.35em] uppercase font-light"
            >
              100% Authentic · Smell In-Store Before Purchase · Ready in 1–2 Days · Gov't ID Required for Pickup
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
