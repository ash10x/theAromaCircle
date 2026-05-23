"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
}

const BRAND_LIST = [
  { slug: "christiandior", label: "Christian Dior" },
  { slug: "coach", label: "Coach" },
  { slug: "gucci", label: "Gucci" },
  { slug: "polo", label: "Polo Ralph Lauren" },
  { slug: "versace", label: "Versace" },
];

export default function BrandsPage({ data }: { data: Product[] }) {
  const { addToCart, openCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (loadingId === product.id) return;
    setLoadingId(product.id);
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, images: product.images, brand: product.brand });
    openCart();
    setTimeout(() => setLoadingId(null), 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsPending(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) throw new Error("Subscription failed.");
      setStatus("You're on the list. Exclusive drops coming your way.");
      setFormValues({ name: "", email: "" });
    } catch {
      setStatus("Unable to subscribe right now. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* ── PAGE HEADER ── */}
      <section className="text-center px-6 py-16 md:py-20 pt-32 md:pt-44 border-b border-white/4">
        <p
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
        >
          Signature Houses
        </p>
        <h1
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          className="text-[40pt] max-sm:text-[28pt] font-light text-white"
        >
          The World's Finest Perfume Brands
        </h1>
        <p
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="mt-4 text-sm text-white/30 font-light tracking-wide max-w-md mx-auto"
        >
          Timeless fragrances from the world's most prestigious perfume houses, curated for those who command presence.
        </p>
      </section>

      {/* ── BRAND SHOWCASE ── */}
      <section className="px-6 py-20 border-b border-white/4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-3"
            >
              Our Partners
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-[30pt] max-sm:text-[22pt] font-light text-white"
            >
              Houses We Carry
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BRAND_LIST.map((brand) => (
              <div
                key={brand.slug}
                className="group flex flex-col items-center gap-4 border border-white/6 hover:border-[#BD955E]/40 bg-[#0D0D0D] p-8 transition-all duration-500"
              >
                <Image
                  src={`/fragranceBrands/${brand.slug}.png`}
                  alt={brand.label}
                  width={80}
                  height={80}
                  className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-500"
                />
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-[9px] tracking-[0.3em] uppercase text-white/20 group-hover:text-[#BD955E]/60 transition-colors duration-500 text-center"
                >
                  {brand.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FRAGRANCES ── */}
      <section className="px-6 py-20 border-b border-white/4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-3"
            >
              Timeless Icons of Modern Elegance
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-[30pt] max-sm:text-[22pt] font-light text-white"
            >
              Featured Fragrances
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden bg-[#0D0D0D] border border-white/6 hover:border-[#BD955E]/25 transition-all duration-500 hover:-translate-y-1"
              >
                <Link href={`/shop/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images?.[0] ? `${product.images[0]}.jpg` : "/placeholder.png"}
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
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/shop"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="inline-flex items-center gap-3 text-[11px] text-white/40 tracking-[0.35em] uppercase hover:text-[#BD955E] transition-colors duration-300"
            >
              View All Fragrances
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 py-20">
        <div className="max-w-lg mx-auto text-center">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
          >
            Private List
          </p>
          <h2
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[28pt] max-sm:text-[20pt] font-light text-white mb-4"
          >
            First Access. Always.
          </h2>
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/30 text-sm font-light tracking-wide mb-10 leading-relaxed"
          >
            Join our private list for early access to new arrivals, limited editions, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formValues.name}
              onChange={handleChange}
              required
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-transparent border border-white/8 px-5 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#BD955E]/40 transition-colors duration-300 tracking-wide"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formValues.email}
              onChange={handleChange}
              required
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-transparent border border-white/8 px-5 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#BD955E]/40 transition-colors duration-300 tracking-wide"
            />
            <button
              type="submit"
              disabled={isPending}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-[#BD955E] py-4 text-black text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Subscribing…" : "Join the List"}
            </button>
          </form>

          {status && (
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="mt-5 text-sm text-[#BD955E]/60 font-light"
            >
              {status}
            </p>
          )}
        </div>
      </section>

    </main>
  );
}
