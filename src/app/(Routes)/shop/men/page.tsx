"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../../../components/AnimatedSection";

const products = ["versaceeros", "burberrymrburberry", "versacelhomme"];

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
      <AnimatedSection className="max-w-7xl mx-auto p-10">
        <p className="text-[#BD955E] text-center mb-10">
          Bold, refined, and unforgettable fragrances crafted for him.
        </p>

        <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product}
              href={`/shop/${product}`}
              className="group border-2 border-[#BD955E] rounded-md overflow-hidden transition-transform hover:scale-105"
            >
              <Image
                src={`/products/${product}.jpg`}
                alt={product}
                width={300}
                height={300}
              />
              <div className="bg-black p-3 text-center">
                <p className="text-white font-semibold capitalize">
                  {product.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
