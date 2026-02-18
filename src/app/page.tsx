"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const bestSellers = [
    { id: "coachdreams", name: "Coach Dreams", price: "$150" },
    { id: "versaceeros", name: "Versace Eros", price: "$180" },
    {
      id: "marcjacobsdaisydream",
      name: "Marc Jacobs Daisy Dream",
      price: "$160",
    },
    { id: "burberrymrburberry", name: "Burberry Mr. Burberry", price: "$170" },
    { id: "versacelhomme", name: "Versace L'Homme", price: "$190" },
  ];

  return (
    <div className="w-full bg-[#0a0a0a] overflow-hidden">
      {/* ================= HERO ================= */}
      <main className="relative h-screen w-full">
        <Image
          src="/backgrounds/bg2.jpg"
          alt="Luxury fragrance background"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="absolute inset-0 flex justify-end items-end max-sm:justify-center">
          <AnimatedSection className="mr-20 mb-36 max-sm:mr-0 text-white max-sm:text-center max-w-xl">
            <p className="text-sm tracking-[0.3em] uppercase text-[#BD955E]">
              The Aroma Circle
            </p>

            <h1 className="text-[46pt] max-sm:text-[30pt] font-light leading-tight mt-4">
              Curated Luxury <br />
              Fragrance Collection
            </h1>

            <p className="text-neutral-300 mt-6 text-lg leading-relaxed">
              Authentic designer scents crafted for distinction, presence, and
              unforgettable moments.
            </p>

            <Link
              href="/shop"
              className="inline-flex mt-8 px-10 py-4 
              bg-gradient-to-r from-[#BD955E] to-[#e6c78b] 
              text-black font-semibold tracking-wider rounded-md 
              shadow-lg hover:opacity-90 transition duration-300"
            >
              Explore Collection
            </Link>
          </AnimatedSection>
        </div>
      </main>

      {/* ================= BRANDS ================= */}
      <AnimatedSection className="py-28 border-b border-[#141414]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[36pt] max-sm:text-[26pt] text-white font-light tracking-tight">
            Signature Houses
          </h2>

          <p className="text-[#BD955E] mt-4 uppercase tracking-[0.25em] text-xs">
            The World’s Finest Perfume Brands
          </p>

          <div className="flex flex-wrap justify-center gap-10 mt-16">
            {["christiandior", "coach", "polo", "versace", "gucci"].map(
              (brand, index) => (
                <AnimatedSection
                  key={brand}
                  delay={index * 0.1}
                  className="group w-32 h-32 border border-[#BD955E]/30 rounded-2xl 
                  bg-[#111] hover:bg-[#151515]
                  hover:border-[#BD955E] transition-all duration-300 
                  flex items-center justify-center shadow-lg"
                >
                  <Image
                    src={`/fragranceBrands/${brand}.png`}
                    alt={`${brand} brand logo`}
                    width={100}
                    height={100}
                    className="object-contain opacity-70 group-hover:opacity-100 transition duration-300"
                  />
                </AnimatedSection>
              ),
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= BEST SELLERS ================= */}
      <AnimatedSection className="py-28 border-b border-[#141414]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[36pt] max-sm:text-[26pt] text-white font-light">
            Best Sellers
          </h3>

          <p className="text-[#BD955E] mt-4 uppercase tracking-[0.25em] text-xs">
            Timeless Icons of Modern Elegance
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-12 mt-20"
          >
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                variants={itemFade}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="group block w-52 rounded-2xl 
                  bg-[#111] border border-[#BD955E]/25 
                  hover:border-[#BD955E] transition duration-300 
                  overflow-hidden shadow-lg"
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={`/products/${product.id}.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-6 py-5 text-center">
                    <p className="text-white font-medium tracking-wide">
                      {product.name}
                    </p>

                    <p className="text-[#BD955E] text-xl mt-3 font-semibold">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ================= CATEGORIES ================= */}
      <AnimatedSection className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[36pt] max-sm:text-[26pt] text-white font-light">
            Shop by Category
          </h3>

          <p className="text-[#BD955E] mt-4 uppercase tracking-[0.25em] text-xs">
            Refined For Every Identity
          </p>

          <div className="flex justify-center gap-12 mt-16 flex-wrap">
            {[
              { href: "/shop/men", img: "mencat.png", label: "Men" },
              { href: "/shop/women", img: "womencat.png", label: "Women" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative block rounded-2xl overflow-hidden border border-[#BD955E]/30 hover:border-[#BD955E] transition duration-300"
              >
                <Image
                  src={`/category/${cat.img}`}
                  alt={cat.label}
                  width={220}
                  height={220}
                  className="transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-lg tracking-widest uppercase">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
