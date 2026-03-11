"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "../../../components/AnimatedSection";
import { useCart } from "@/app/context/cartContext";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    slug: "versaceeros",
    name: "Versace Eros Eau de Toilette",
    price: 145,
  },
  {
    id: 2,
    slug: "burberrymrburberry",
    name: "Mr. Burberry Indigo Eau de Toilette",
    price: 130,
  },
  {
    id: 3,
    slug: "versacelhomme",
    name: "Versace Pour Homme",
    price: 120,
  },
];

export default function MenCategoryPage() {
  const { addToCart } = useCart();

  const [toast, setToast] = useState<{
    message: string;
    id: number;
  } | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: [product.slug],
    });

    const toastId = Date.now();

    setToast({
      message: `${product.name} added to cart!`,
      id: toastId,
    });

    setTimeout(() => {
      setToast((prev) => (prev?.id === toastId ? null : prev));
    }, 3000);
  };

  return (
    <div className="bg-black min-h-screen relative">
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
      <AnimatedSection className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <p className="text-[#BD955E] text-center mb-12">
          Bold, refined, and unforgettable fragrances crafted for him.
        </p>

        <AnimatedSection
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerChildren
        >
          {products.map((product) => (
            <AnimatedSection key={product.id}>
              <div className="group relative block w-full mx-auto">
                <div className="relative bg-[#0b0b0b] border border-[#BD955E]/40 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-[#BD955E] group-hover:-translate-y-1">
                  {/* Product Link */}
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative h-[280px] w-full bg-black">
                      <Image
                        src={`/products/${product.slug}.jpg`}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => handleAddToCart(product)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition bg-black/80 border border-[#BD955E] text-[#BD955E] p-2 rounded-full hover:bg-[#BD955E] hover:text-black"
                  >
                    <ShoppingBag size={18} />
                  </button>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-white font-medium text-sm truncate">
                      {product.name}
                    </p>

                    <p className="text-[#BD955E] font-semibold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </AnimatedSection>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#BD955E] text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-fadeInOut z-50">
          <span>{toast.message}</span>

          <button
            aria-label="Close notification"
            onClick={() => setToast(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Toast Animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </div>
  );
}
