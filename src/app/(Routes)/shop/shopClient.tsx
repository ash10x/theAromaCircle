"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ["All", "Men", "Women", "Unisex"] as const;

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
}

export default function ShopPage({ data }: { data: Product[] }) {
  const { addToCart, openCart } = useCart();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [urlSearchQuery, setUrlSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    setUrlSearchQuery(urlQuery);
    setCurrentPage(1);
  }, [urlQuery]);

  const filteredProducts = useMemo(() => {
    const activeQuery = (searchQuery || urlSearchQuery).trim().toLowerCase();
    return data.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      if (!activeQuery) return true;
      return (
        product.name.toLowerCase().includes(activeQuery) ||
        product.brand.toLowerCase().includes(activeQuery)
      );
    });
  }, [data, searchQuery, urlSearchQuery, selectedCategory]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [filteredProducts, currentPage]);

  const handleNextImage = useCallback((id: number, total: number) => {
    setCurrentImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  }, []);

  const handlePrevImage = useCallback((id: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total,
    }));
  }, []);

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (loadingId === product.id) return;
    setLoadingId(product.id);
    addToCart({ ...product, quantity: 1 });
    openCart();
    setTimeout(() => setLoadingId(null), 400);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 md:pt-[156px]">

      {/* ── PAGE HEADER ── */}
      <section className="text-center px-6 py-16 md:py-20 border-b border-white/[0.04]">
        <p
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
        >
          Our Collection
        </p>
        <h1
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          className="text-[40pt] max-sm:text-[28pt] font-light text-white"
        >
          Discover Your Signature Scent
        </h1>
        <p
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="mt-4 text-sm text-white/30 font-light tracking-wide max-w-md mx-auto"
        >
          Premium fragrances curated for those who command presence.
        </p>

        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {[
            "1–2 Day In-Store Collection",
            "Smell Before You Buy",
            "100% Authentic",
          ].map((note) => (
            <div key={note} className="flex items-center gap-2">
              <span className="w-3 h-px bg-[#BD955E]/40" />
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-white/25 tracking-[0.3em] uppercase font-light"
              >
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="px-6 py-10 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search fragrances…"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-transparent border border-white/8 px-5 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#BD955E]/40 transition-colors duration-300 tracking-wide"
            />
            <Search size={14} strokeWidth={1.5} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
          </div>

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className={`px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#BD955E] text-black"
                    : "border border-white/10 text-white/40 hover:border-[#BD955E]/30 hover:text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          {totalProducts > 0 && (
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-white/20 text-xs tracking-wider"
            >
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of {totalProducts} fragrances
            </p>
          )}
        </div>
      </section>

      {/* ── EMPTY STATE ── */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-28">
          <p
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-white/20 text-2xl font-light italic"
          >
            No fragrances found.
          </p>
        </div>
      )}

      {/* ── PRODUCT GRID ── */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => {
            const currentIndex = currentImageIndex[product.id] || 0;
            return (
              <div
                key={product.id}
                className="group overflow-hidden bg-[#0D0D0D] border border-white/6 hover:border-[#BD955E]/25 transition-all duration-500 hover:-translate-y-1"
              >
                <Link href={`/shop/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[currentIndex] + ".jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority={currentPage === 1}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Premium badge */}
                    <div className="absolute left-4 top-4">
                      <span
                        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                        className="text-[9px] tracking-[0.4em] uppercase text-[#BD955E] bg-black/60 px-3 py-1.5"
                      >
                        Premium
                      </span>
                    </div>

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); handlePrevImage(product.id, product.images.length); }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2.5 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowLeft size={16} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); handleNextImage(product.id, product.images.length); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2.5 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowRight size={16} strokeWidth={1.5} />
                        </button>
                      </>
                    )}
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

                  <div className="flex items-end justify-between mt-5">
                    <p
                      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                      className="text-[#BD955E] text-xl font-light"
                    >
                      ${product.price.toFixed(2)}
                      <span className="text-[10px] text-[#BD955E]/40 ml-1 tracking-wider">JMD</span>
                    </p>
                  </div>

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
            );
          })}
        </div>
      </section>

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <section className="pb-24 flex justify-center gap-2 flex-wrap px-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className={`w-10 h-10 text-xs tracking-wider transition-all duration-300 ${
                page === currentPage
                  ? "bg-[#BD955E] text-black"
                  : "border border-white/10 text-white/30 hover:border-[#BD955E]/30 hover:text-white/60"
              }`}
            >
              {page}
            </button>
          ))}
        </section>
      )}
    </div>
  );
}
