"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
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
  const { addToCart } = useCart();
  const [toast, setToast] = useState<{ message: string; id: number } | null>(
    null,
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images,
      brand: product.brand,
    });

    const toastId = Date.now();
    setToast({ message: `${product.name} added to cart!`, id: toastId });

    setTimeout(() => {
      setToast((prev) => (prev?.id === toastId ? null : prev));
    }, 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#BD955E] mb-4">
              Exclusive luxury collection
            </p>
            <h1 className="text-[44px] font-semibold leading-tight text-white max-sm:text-[32px]">
              {title}
            </h1>
            <p className="mt-6 text-neutral-300 text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>

      <AnimatedSection className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="text-center mb-12">
          <p className="text-[#BD955E] uppercase tracking-[0.35em] text-sm mb-3">
            Handpicked for you
          </p>
          <h2 className="text-[32px] font-semibold">Signature pieces</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product) => (
            <AnimatedSection key={product.id}>
              <div className="group relative overflow-hidden rounded-[32px] border border-[#434343] bg-[#121212] shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#BD955E]/50">
                <Link href={`/shop/product/${product.id}`}>
                  <div className="relative h-[320px] overflow-hidden">
                    <Image
                      src={
                        product.images?.[0]
                          ? `${product.images[0]}.jpg`
                          : "/placeholder.png"
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#BD955E]">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-semibold leading-tight text-white mb-3 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[#BD955E] text-lg font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mt-1">
                        Premium quality
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      className="rounded-full bg-[#BD955E] px-5 py-3 text-black text-sm font-semibold transition hover:bg-[#d1b273]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl bg-[#BD955E] px-6 py-4 text-black shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">{toast.message}</span>
            <button
              type="button"
              aria-label="Close toast"
              onClick={() => setToast(null)}
              className="opacity-80 hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
