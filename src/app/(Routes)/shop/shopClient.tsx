"use client";

import { useState, useMemo, useEffect, Key } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ["All", "Men", "Women", "Unisex"];

export default function ShopPage({ data }: { data: any[] }) {
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

  /* Sync URL search */
  useEffect(() => {
    setUrlSearchQuery(urlQuery);
    setCurrentPage(1);
  }, [urlQuery]);

  /* Filter products */
  const filteredProducts = useMemo(() => {
    return data.filter((product) => {
      const query = (searchQuery || urlSearchQuery).toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, urlSearchQuery, selectedCategory]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
    <div className="min-h-screen bg-black text-white pt-40">
      {/* Header */}
      <section className="text-center px-6 py-10 mb-16">
        <h1 className="text-4xl font-bold text-[#BD955E]">
          Discover Your Signature Scent
        </h1>
        <p className="mt-4 text-gray-400">
          Premium fragrances designed to elevate your presence.
        </p>
      </section>

      {/* Search + Filters */}
      <section className="px-6 mb-14">
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
              className="w-full bg-[#111] border border-[#BD955E]/30 px-6 py-3 rounded-lg focus:outline-none focus:border-[#BD955E]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BD955E]" />
          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-full border transition ${
                  selectedCategory === cat
                    ? "bg-[#BD955E] text-black"
                    : "border-[#BD955E]/40 text-[#BD955E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          {totalProducts > 0 && (
            <p className="text-gray-400 text-sm">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of{" "}
              {totalProducts} products
            </p>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedProducts.map((product) => {
            const currentIndex = currentImageIndex[product.id] || 0;

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group bg-[#111] border border-[#1a1a1a] hover:border-[#BD955E]/50 rounded-xl overflow-hidden cursor-pointer transition">
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[currentIndex] + ".jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    {/* Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevImage(product.id, product.images.length);
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <ArrowLeft size={18} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNextImage(product.id, product.images.length);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <ArrowRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Indicators */}
                  <div className="flex justify-center gap-1 mt-2">
                    {product.images.map((_: any, i: Key | null | undefined) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === currentIndex ? "bg-[#BD955E]" : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <p className="text-xs text-[#BD955E] uppercase">
                      {product.brand}
                    </p>

                    <h3 className="text-lg font-semibold mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
                      {product.name}
                    </h3>

                    <p className="text-[#BD955E] text-xl font-bold mt-2">
                      ${product.price.toFixed(2)}
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({ ...product, quantity: 1 });
                        openCart();
                      }}
                      className="mt-4 w-full bg-[#692437] hover:bg-[#692437]/80 py-2 rounded-lg cursor-pointer text-sm font-medium transition hover:scale-105"
                    >
                      Add to Cart
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
        <section className="pb-20 flex justify-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg ${
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
