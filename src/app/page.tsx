"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  interface Product {
    id: string;
    name: string;
    price: number;
  }

  interface Props {
    bestSellers: Product[];
  }

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
    <div className="w-full bg-black overflow-hidden">
      {/* HERO */}
      <main className="relative h-screen w-full">
        <Image
          src="/backgrounds/bg2.jpg"
          alt="Luxury fragrance background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70 flex justify-end items-end max-sm:justify-center">
          <AnimatedSection className="mr-16 mb-32 max-sm:mr-0 text-white max-sm:text-center">
            <p className="text-[10pt] text-[#BD955E] font-semibold">
              The Aroma Circle
            </p>

            <h1 className="text-[40pt] max-sm:text-[28pt] font-bold mt-2">
              Luxury Fragrances. Authentic Brands.
            </h1>

            <p className="text-[14pt] max-sm:text-[12pt] text-[#BD955E] mt-2">
              Discover authentic designer fragrances crafted to captivate and
              inspire.
            </p>

            <Link
              href="/shop"
              className="inline-flex mt-6 w-40 h-14 max-sm:w-32 max-sm:h-12 items-center justify-center bg-[#692437] rounded-md font-semibold transition-all hover:scale-105 hover:bg-[#BD955E]"
            >
              Shop Now
            </Link>
          </AnimatedSection>
        </div>
      </main>

      {/* BRANDS */}
      <AnimatedSection className="py-20 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-[32pt] max-sm:text-[24pt] text-white font-semibold tracking-tight">
            Elite Signature Collections
          </h2>

          <p className="text-[#BD955E] mt-3 text-sm tracking-wide uppercase">
            Discover timeless creations from the world’s most prestigious
            perfume brands.
          </p>

          {/* Brand Grid */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {["christiandior", "coach", "polo", "versace", "gucci"].map(
              (brand, index) => (
                <AnimatedSection
                  key={brand}
                  delay={index * 0.1}
                  className="group w-28 h-28 md:w-32 md:h-32 border border-[#BD955E]/40 rounded-xl 
                     flex items-center justify-center 
                     bg-neutral-950 hover:bg-neutral-900
                     hover:border-[#BD955E]
                     transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={`/fragranceBrands/${brand}.png`}
                    alt={`${brand} fragrance brand logo`}
                    width={100}
                    height={100}
                    className="object-contain opacity-80 group-hover:opacity-100 
                       transition duration-300"
                  />
                </AnimatedSection>
              ),
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* BEST SELLERS */}
      <AnimatedSection className="py-24 bg-black border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h3 className="text-[32pt] max-sm:text-[24pt] text-white font-semibold tracking-tight">
            Luxury Best Sellers
          </h3>

          <p className="text-[#BD955E] mt-3 text-sm uppercase tracking-widest">
            Best-selling scents that leave a lasting impression — every time.
          </p>

          {/* Product Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-10 mt-16"
          >
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                variants={itemFade}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="cursor-pointer"
              >
                <Link
                  href={`/shop/${product.id}`}
                  aria-label={`View ${product.name}`}
                  className="group block w-47.5 max-sm:w-37.5 
                     rounded-xl overflow-hidden 
                     border border-[#BD955E]/40 
                     bg-neutral-950 hover:bg-neutral-900
                     transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full h-52.5 max-sm:h-40 overflow-hidden">
                    <Image
                      src={`/products/${product.id}.jpg`}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 150px, 190px"
                      className="object-cover object-center 
                         transition-transform duration-500 
                         group-hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="px-4 py-4 text-center">
                    <p className="text-white font-medium text-sm tracking-wide truncate">
                      {product.name}
                    </p>

                    <p className="text-[#BD955E] font-semibold text-lg tracking-wider mt-2">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CATEGORIES */}
      <AnimatedSection className="w-full border-b border-[#0e0e0e] p-10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[30pt] max-sm:text-[22pt] text-white font-bold">
            Refined By Category
          </h3>

          <p className="text-[#BD955E] mt-2">
            Find the perfect fragrance—designed for him, her, and every moment
            in between.
          </p>

          <AnimatedSection className="flex justify-center gap-8 mt-8 flex-wrap">
            {[
              { href: "/shop/men", img: "mencat.png", label: "Shop Men" },
              { href: "/shop/women", img: "womencat.png", label: "Shop Women" },
            ].map((cat) => (
              <AnimatedSection key={cat.href} className="cursor-pointer">
                <Link
                  href={cat.href}
                  className="group relative block border-2 border-[#BD955E] rounded-md overflow-hidden"
                >
                  <Image
                    src={`/category/${cat.img}`}
                    alt={cat.label}
                    width={160}
                    height={160}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold tracking-wide">
                      {cat.label}
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </div>
  );
}
