"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface Product {
  id: number;
  name: string;
  images: string[];
}

/* ================= BRANDS ================= */

const brands = ["coach", "christiandior", "gucci", "polo", "versace"];

export default function HomePage({ data }: { data: Product[] }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Newsletter Signup:", formValues);

    setFormValues({
      name: "",
      email: "",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO ================= */}

      <section className="relative py-52 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[36pt] max-sm:text-[26pt] text-[#BD955E] font-semibold tracking-tight"
        >
          Luxury Cologne & Perfume
        </motion.h1>

        <p className="text-lg text-neutral-300 mt-6 max-w-2xl mx-auto">
          Discover timeless fragrances crafted by the world’s most prestigious
          perfume houses.
        </p>

        <Link
          href="/shop"
          className="inline-block mt-10 bg-[#BD955E] text-black px-8 py-3 rounded-full font-medium hover:bg-[#BD955E]/80 transition-all"
        >
          Explore Collection
        </Link>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-[28pt] font-semibold mb-14 text-center">
          Featured Fragrances
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {data.map((product) => {
            const imageSrc =
              product.images?.length > 0
                ? `${product.images[0]}.jpg`
                : "/placeholder.jpg";

            return (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="block"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white border border-neutral-800 rounded-2xl overflow-hidden text-center p-4 hover:border-[#BD955E]/40 transition"
                >
                  <div className="relative w-full h-56 mb-6">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width:780px) 100vw, 33vw"
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-lg text-black font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                    {product.name}
                  </h3>

                  <p className="text-[#BD955E] text-sm mt-3">View Product</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= BRAND LOGOS ================= */}

      <section className="py-24 px-6 border-t border-neutral-900 border-b">
        <h2 className="text-2xl text-[#BD955E] font-semibold mb-12 text-center uppercase tracking-widest">
          Our Brands
        </h2>

        <div className="flex flex-wrap justify-center gap-12">
          {brands.map((brand) => (
            <motion.div
              key={brand}
              whileHover={{ scale: 1.1 }}
              className="w-24 h-24 flex items-center justify-center opacity-70 hover:opacity-100 transition"
            >
              <Image
                src={`/fragranceBrands/${brand}.png`}
                alt={brand}
                width={90}
                height={90}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}

      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl text-[#BD955E] font-semibold mb-6 uppercase tracking-widest">
          Stay Updated
        </h2>

        <p className="text-neutral-400 mb-10">
          Get exclusive access to new arrivals, limited editions, and private
          offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formValues.name}
            onChange={handleChange}
            required
            className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-6 py-3 focus:outline-none focus:border-[#BD955E] transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formValues.email}
            onChange={handleChange}
            required
            className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-6 py-3 focus:outline-none focus:border-[#BD955E] transition"
          />

          <button
            type="submit"
            className="bg-[#BD955E] text-black px-8 py-3 rounded-full hover:bg-[#BD955E]/80 transition-all"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
