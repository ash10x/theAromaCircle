"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  const reduceMotion = useReducedMotion();

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
      <AnimatedSection className="p-10 border-b border-[#0e0e0e]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[30pt] max-sm:text-[22pt] text-white font-bold">
            Elite Signature Collections
          </h2>

          <p className="text-[#BD955E] mt-2">
            Discover timeless creations from the world’s most prestigious
            perfume brands.
          </p>

          <AnimatedSection className="flex flex-wrap justify-center gap-5 mt-8">
            {["christiandior", "coach", "polo", "versace", "gucci"].map(
              (brand) => (
                <AnimatedSection
                  key={brand}
                  className="w-30 h-30 border-2 border-[#BD955E] rounded-md flex items-center justify-center cursor-pointer"
                >
                  <Image
                    src={`/fragranceBrands/${brand}.png`}
                    alt={`${brand} fragrance brand logo`}
                    width={120}
                    height={120}
                  />
                </AnimatedSection>
              ),
            )}
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* BEST SELLERS */}
      <AnimatedSection className="p-10 border-b border-[#0e0e0e]">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[30pt] max-sm:text-[22pt] text-white font-bold">
            Luxury Best Sellers
          </h3>

          <p className="text-[#BD955E] mt-2">
            Best-selling scents that leave a lasting impression—every time.
          </p>

          {/* Stagger Container */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                variants={itemFade}
                whileHover={{ y: -6 }}
                className="cursor-pointer"
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="block w-45 border-2 h-70 border-[#BD955E] rounded-md overflow-hidden bg-black"
                >
                  {/* Fixed-size image container */}
                  <div className="relative w-full h-45">
                    <Image
                      src={`/products/${product.id}.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Price */}
                  <div className="p-3 text-center">
                    <p className="text-white font-bold text-md text-ellipsis overflow-hidden whitespace-nowrap">
                      {product.name}
                    </p>
                    <p className="text-[#BD955E] font-bold tracking-wide text-2xl mt-1">
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

      {/* COMMUNITY */}
      <AnimatedSection className="p-10 text-center">
        <h3 className="text-[25pt] max-sm:text-[16pt] text-white font-bold">
          Join The Aroma Circle Community
        </h3>

        <p className="text-[#BD955E] mt-2">
          Sign up for exclusive offers, new arrivals, and fragrance tips.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 h-12 bg-black border-2 border-[#BD955E] text-white rounded-md px-3 outline-none focus:border-white"
          />
          <button className="w-32 h-12 bg-[#692437] text-white rounded-md font-semibold transition-all hover:scale-105 hover:bg-[#BD955E]">
            Subscribe
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
}
