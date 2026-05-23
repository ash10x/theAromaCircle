"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";
import { useCart } from "@/app/context/cartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
}

export default function CategoryPageClient({
  data,
  title,
  description,
  heroImage,
}: {
  data: Product[];
  title: string;
  description: string;
  heroImage: string;
}) {
  const { addToCart, openCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  const handleNextImage = useCallback((id: number, total: number) => {
    setCurrentImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  }, []);

  const handlePrevImage = useCallback((id: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total,
    }));
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (loadingId === product.id) return;
    setLoadingId(product.id);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images,
      brand: product.brand,
    });
    openCart();
    setTimeout(() => setLoadingId(null), 400);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* ── HERO ── */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/60 to-black/25" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

        {/* Text — anchored to bottom of hero, always below nav */}
        <div className="absolute inset-x-0 bottom-0 px-8 md:px-16 pb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-px bg-[#BD955E]/60" />
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light"
              >
                Our Collection
              </p>
            </div>

            <h1
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-[42pt] max-sm:text-[28pt] font-light text-white leading-[1.05] mb-6"
            >
              {title}
            </h1>

            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-white/55 text-sm font-light leading-relaxed tracking-wide max-w-md"
            >
              {description}
            </p>

            <div className="flex items-center gap-6 mt-8 flex-wrap">
              {[
                "1–2 Day In-Store Collection",
                "Smell Before You Buy",
                "Gov't ID Required for Pickup",
              ].map((note) => (
                <div key={note} className="flex items-center gap-2">
                  <span className="w-3 h-px bg-[#BD955E]/40" />
                  <p
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-light"
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COLLECTION COUNT ── */}
      <section className="px-6 py-8 border-b border-white/4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/20 text-xs tracking-wider"
          >
            {data.length} fragrance{data.length !== 1 ? "s" : ""} in this collection
          </p>
          <Link
            href="/shop"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-white/25 tracking-[0.3em] uppercase hover:text-[#BD955E] transition-colors duration-300"
          >
            ← All Fragrances
          </Link>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product) => {
            const currentIndex = currentImageIndex[product.id] || 0;
            return (
              <div
                key={product.id}
                className="group overflow-hidden bg-[#0D0D0D] border border-white/6 hover:border-[#BD955E]/25 transition-all duration-500 hover:-translate-y-1"
              >
                <Link href={`/shop/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[currentIndex] + ".jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span
                        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                        className="text-[9px] tracking-[0.4em] uppercase text-[#BD955E] bg-black/60 px-3 py-1.5"
                      >
                        Premium
                      </span>
                    </div>

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); handlePrevImage(product.id, product.images.length); }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2.5 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowLeft size={16} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); handleNextImage(product.id, product.images.length); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2.5 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowRight size={16} strokeWidth={1.5} />
                        </button>
                      </>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-[10px] tracking-[0.35em] uppercase text-[#BD955E] font-light"
                    >
                      {product.brand}
                    </p>
                    <span
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-[9px] tracking-[0.25em] uppercase text-white/25 border border-white/8 px-2.5 py-1"
                    >
                      {product.category}
                    </span>
                  </div>

                  <Link href={`/shop/product/${product.id}`}>
                    <h3
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      className="text-xl font-light text-white hover:text-[#BD955E] transition-colors duration-300 leading-tight line-clamp-2"
                    >
                      {product.name}
                    </h3>
                  </Link>

                  <p
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[#BD955E] text-xl font-light mt-5"
                  >
                    ${product.price.toFixed(2)}
                    <span className="text-[10px] text-[#BD955E]/40 ml-1 tracking-wider">JMD</span>
                  </p>

                  <button
                    disabled={loadingId === product.id}
                    onClick={(e) => handleAddToCart(e, product)}
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="mt-5 w-full border border-[#BD955E]/40 text-[#BD955E] py-3 text-[11px] tracking-[0.25em] uppercase font-light hover:bg-[#BD955E] hover:text-black transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loadingId === product.id ? "Adding…" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-28">
            <p
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-white/20 text-2xl font-light italic"
            >
              No fragrances in this collection yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
