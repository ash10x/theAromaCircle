"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ["All", "Men", "Women", "Unisex"];

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
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<number, number>
  >({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  /* Sync URL search */
  useEffect(() => {
    setUrlSearchQuery(urlQuery);
    setCurrentPage(1);
  }, [urlQuery]);

  /* Filter products */
  const filteredProducts = useMemo(() => {
    const activeQuery = searchQuery || urlSearchQuery;
    const normalizedQuery = activeQuery.trim().toLowerCase();

    return data.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      if (!normalizedQuery) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);

      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, urlSearchQuery, selectedCategory]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  /* Prevent empty pagination edge case */
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  /* Memoized pagination */
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [filteredProducts, currentPage]);

  /* Image navigation */
  const handleNextImage = (id: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (id: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32">
      {/* Header */}
      <section className="text-center px-4 md:px-6 py-8 md:py-10 mb-12 md:mb-16">
        <h1 className="text-2xl md:text-4xl mt-5 font-bold text-[#BD955E]">
          Discover Your Signature Scent
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-400 max-w-md mx-auto">
          Premium fragrances designed to elevate your presence.
        </p>
      </section>

      {/* Search + Filters */}
      <section className="px-4 md:px-6 mb-10 md:mb-14">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search fragrances..."
              className="w-full bg-[#111] border border-[#BD955E]/30 px-5 py-4 rounded-xl focus:outline-none focus:border-[#BD955E] text-sm md:text-base"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BD955E]" />
          </div>

          {/* Categories - Horizontal Scroll on Mobile */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-full whitespace-nowrap text-sm md:text-base transition min-h-[44px] ${
                  selectedCategory === cat
                    ? "bg-[#BD955E] text-black"
                    : "border border-[#BD955E]/40 text-[#BD955E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          {totalProducts > 0 && (
            <p className="text-gray-400 text-xs md:text-sm">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of{" "}
              {totalProducts} products
            </p>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {paginatedProducts.map((product) => {
            const currentIndex = currentImageIndex[product.id] || 0;

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group bg-[#111] border border-[#1a1a1a] hover:border-[#BD955E]/50 rounded-2xl overflow-hidden transition">
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[currentIndex] + ".jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevImage(product.id, product.images.length);
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full"
                        >
                          <ArrowLeft size={20} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNextImage(product.id, product.images.length);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-xs text-[#BD955E] uppercase tracking-wider">
                      {product.brand}
                    </p>

                    <h3 className="text-base md:text-lg font-semibold mt-1 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-[#BD955E] text-lg md:text-xl font-bold mt-2">
                      ${product.price.toFixed(2)}
                    </p>

                    <button
                      disabled={loadingId === product.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setLoadingId(product.id);
                        addToCart({ ...product, quantity: 1 });
                        openCart();
                        setLoadingId(null);
                      }}
                      className="mt-4 w-full bg-[#692437] hover:bg-[#692437]/80 py-3 rounded-xl text-sm font-medium transition disabled:opacity-50 min-h-[44px]"
                    >
                      {loadingId === product.id ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-20 flex justify-center gap-3 flex-wrap px-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`w-11 h-11 rounded-xl text-sm ${
                page === currentPage
                  ? "bg-[#BD955E] text-black"
                  : "bg-[#111] border border-[#BD955E]/30 text-[#BD955E]"
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
