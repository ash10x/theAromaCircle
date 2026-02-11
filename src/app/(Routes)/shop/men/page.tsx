"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import AnimatedSection from "../../../components/AnimatedSection";

const products = [
  {
    slug: "versaceeros",
    title: "Versace Eros Eau de Toilette",
    price: 145,
  },
  {
    slug: "burberrymrburberry",
    title: "Mr. Burberry Indigo Eau de Toilette",
    price: 130,
  },
  {
    slug: "versacelhomme",
    title: "Versace Pour Homme",
    price: 120,
  },
];

export default function MenCategoryPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* HERO */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/category/mencat.png"
          alt="Men's fragrances"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center">
          <h1 className="text-white text-[42pt] max-sm:text-[26pt] font-bold">
            Men’s Fragrances
          </h1>
        </div>
      </div>

      {/* GRID */}
      <AnimatedSection className="max-w-7xl mx-auto px-10 py-16">
        <p className="text-[#BD955E] text-center mb-12">
          Bold, refined, and unforgettable fragrances crafted for him.
        </p>

        {/* 👉 Stagger container should live HERE */}
        <div className="grid grid-cols-3 gap-10 max-sm:grid-cols-2">
          {products.map((product) => (
            <AnimatedSection key={product.slug}>
              <Link
                href={`/shop/${product.slug}`}
                className="group relative block w-[280px] max-sm:w-full mx-auto"
              >
                {/* Card */}
                <div className="relative bg-[#0b0b0b] border border-[#BD955E]/40 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-[#BD955E] group-hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-[280px] w-full bg-black">
                    <Image
                      src={`/products/${product.slug}.jpg`}
                      alt={product.title}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Add to cart */}
                  <button
                    aria-label="Add to cart"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition bg-black/80 border border-[#BD955E] text-[#BD955E] p-2 rounded-full hover:bg-[#BD955E] hover:text-black"
                  >
                    <ShoppingBag size={18} />
                  </button>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-white font-medium text-sm truncate">
                      {product.title}
                    </p>

                    {/* Fixed price position */}
                    <p className="text-[#BD955E] font-semibold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
