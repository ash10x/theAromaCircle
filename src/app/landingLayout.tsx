"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./components/AnimatedSection";
import { useCart } from "./context/cartContext";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function Home({ data }: Readonly<{ data: any }>) {
  const { addToCart, openCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    if (loadingId === product.id) return;
    setLoadingId(product.id);
    addToCart({ ...product, quantity: 1 });
    openCart();
    setTimeout(() => setLoadingId(null), 400);
  };

  const pageFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemFade: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div {...pageFade} className="w-full bg-[#080808] overflow-hidden">
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <main className="relative h-screen w-full">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/backgrounds/bg2.jpg"
            alt="Luxury fragrance background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* layered overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        <div className="absolute top-44 max-sm:top-20 left-0 right-0 bottom-0 flex justify-end items-start max-sm:justify-center">
          <AnimatedSection className="mr-20 mt-10 max-sm:mr-0 max-sm:mt-8 max-sm:px-8 text-white max-sm:text-center max-w-lg">
            {/* Eyebrow label */}
            <div className="flex items-center gap-4 max-sm:justify-center mb-6">
              <span className="w-8 h-px bg-[#BD955E]/60" />
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                }}
                className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light"
              >
                The Aroma Circle
              </p>
            </div>

            <h1
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-[52pt] max-sm:text-[34pt] font-light leading-[1.05] tracking-tight"
            >
              Curated Luxury <br />
              <em className="font-light not-italic text-[#BD955E]/90">
                Fragrance
              </em>{" "}
              Collection
            </h1>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
              className="text-white/50 mt-6 text-[15px] leading-relaxed font-light tracking-wide max-w-sm max-sm:mx-auto"
            >
              Authentic designer scents crafted for distinction, presence, and
              unforgettable moments.
            </p>

            <div className="flex items-center gap-6 mt-10 max-sm:justify-center">
              <Link
                href="/shop"
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                }}
                className="inline-flex items-center gap-4 px-10 py-4 border border-[#BD955E]/60 text-[#BD955E] text-[11px] tracking-[0.3em] uppercase font-light hover:bg-[#BD955E] hover:text-black transition-all duration-500"
              >
                Explore Collection
                <span className="text-base leading-none">→</span>
              </Link>
              <Link
                href="/shop/brands"
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                }}
                className="text-white/30 text-[11px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300 hidden sm:block"
              >
                View Brands
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-white/40"
          />
        </div>
      </main>

      {/* ═══════════════════════ BRANDS ═══════════════════════ */}
      <AnimatedSection className="py-28 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
          >
            Signature Houses
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[38pt] max-sm:text-[26pt] text-white font-light tracking-tight"
          >
            The World's Finest Perfume Brands
          </h2>

          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {["christiandior", "coach", "polo", "versace", "gucci"].map(
              (brand, index) => (
                <AnimatedSection
                  key={brand}
                  delay={index * 0.08}
                  className="group w-28 h-28 border border-white/8 hover:border-[#BD955E]/40 bg-[#0D0D0D] transition-all duration-500 flex items-center justify-center"
                >
                  <Image
                    src={`/fragranceBrands/${brand}.png`}
                    alt={`${brand} brand logo`}
                    width={90}
                    height={90}
                    className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500"
                  />
                </AnimatedSection>
              ),
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════ BEST SELLERS ═══════════════════════ */}
      <AnimatedSection className="py-28 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
          >
            Timeless Icons of Modern Elegance
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[38pt] max-sm:text-[26pt] text-white font-light"
          >
            Best Sellers
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-wrap justify-center gap-10 mt-20"
          >
            {data.map(
              (product: {
                brand: ReactNode;
                images: any;
                id: Key | null | undefined;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                price:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <motion.div
                  key={product.id}
                  variants={itemFade}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 22 },
                  }}
                >
                  <div className="group block w-52 bg-[#0D0D0D] border border-white/6 hover:border-[#BD955E]/30 transition-all duration-400 overflow-hidden">
                    <Link href={`/shop/product/${product.id}`}>
                      <div className="relative w-full h-64 overflow-hidden">
                        <Image
                          src={product.images[0] + ".jpg"}
                          alt={String(product.name) ?? "Product image"}
                          fill
                          sizes="(max-width: 768px) 50vw, 220px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      </div>

                      <div className="px-5 py-4 text-center">
                        <p
                          style={{
                            fontFamily:
                              "var(--font-dm-sans), system-ui, sans-serif",
                          }}
                          className="text-[#BD955E] text-[10px] tracking-[0.35em] uppercase font-light"
                        >
                          {product.brand}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                          }}
                          className="text-white text-lg font-light mt-1 tracking-wide truncate"
                        >
                          {product.name}
                        </p>
                        <p
                          style={{
                            fontFamily:
                              "var(--font-dm-sans), system-ui, sans-serif",
                          }}
                          className="text-[#BD955E] text-base mt-2 font-light"
                        >
                          ${product.price}
                          <span className="text-[10px] text-[#BD955E]/50 ml-1 tracking-wider">
                            JMD
                          </span>
                        </p>
                      </div>
                    </Link>

                    <div className="px-5 pb-5">
                      <button
                        disabled={loadingId === product.id}
                        onClick={(e) => handleAddToCart(e, product)}
                        style={{
                          fontFamily:
                            "var(--font-dm-sans), system-ui, sans-serif",
                        }}
                        className="w-full border border-[#BD955E]/40 text-[#BD955E] py-2.5 text-[10px] tracking-[0.25em] uppercase font-light hover:bg-[#BD955E] hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {loadingId === product.id ? "Adding…" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>

          <div className="mt-14">
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
              className="inline-flex items-center gap-3 text-[11px] text-white/40 tracking-[0.35em] uppercase hover:text-[#BD955E] transition-colors duration-300"
            >
              View All Products
              <span>→</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════ TRUST PILLARS ═══════════════════════ */}
      <AnimatedSection className="py-24 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-0 text-center divide-x divide-white/[0.04]">
          {[
            {
              label: "Authenticity Guaranteed",
              body: "Every fragrance is sourced directly from authorised brand distributors.",
            },
            {
              label: "Smell Before You Buy",
              body: "Visit our boutique to experience any scent in person before committing to your purchase.",
            },
            {
              label: "1–2 Day Collection",
              body: "Place your pre-order online and collect your fragrance in-store within 1–2 days.",
            },
          ].map((item) => (
            <div key={item.label} className="px-10 py-4 first:pl-0 last:pr-0">
              <div className="w-8 h-px bg-[#BD955E]/40 mx-auto mb-5" />
              <h4
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                className="text-white text-xl font-light mb-3"
              >
                {item.label}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                }}
                className="text-white/30 text-xs font-light leading-relaxed tracking-wide"
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════ CATEGORIES ═══════════════════════ */}
      <AnimatedSection className="py-28">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
          >
            Refined For Every Identity
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[38pt] max-sm:text-[26pt] text-white font-light"
          >
            Shop by Category
          </h2>

          <div className="flex justify-center gap-8 mt-16 flex-wrap">
            {[
              { href: "/shop/men", img: "mencat.png", label: "Men" },
              { href: "/shop/women", img: "womencat.png", label: "Women" },
              { href: "/shop/unisex", img: "unisexcat.png", label: "Unisex" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative block overflow-hidden border border-white/8 hover:border-[#BD955E]/40 transition-all duration-500"
              >
                <Image
                  src={`/category/${cat.img}`}
                  alt={cat.label}
                  width={240}
                  height={300}
                  sizes="240px"
                  className="block transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 text-left">
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="text-[10px] text-[#BD955E] tracking-[0.4em] uppercase font-light mb-1"
                  >
                    Collection
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                    className="text-white text-2xl font-light"
                  >
                    {cat.label}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="text-[10px] text-white/60 tracking-[0.3em] uppercase border border-white/20 px-3 py-1"
                  >
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </motion.div>
  );
}
