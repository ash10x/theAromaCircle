"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Midnight Elegance",
    brand: "Luxe Scents",
    price: 89.99,
    category: "Men",
    images: [
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
      "/products/burberryhero.jpg",
    ],
    rating: 4.8,
    quantity: 1,
  },
  {
    id: 2,
    name: "Floral Dreams",
    brand: "Pure Essence",
    price: 79.99,
    category: "Women",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 4.9,
    quantity: 1,
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "Coastal Vibes",
    price: 69.99,
    category: "Unisex",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 4.7,
    quantity: 1,
  },
  {
    id: 4,
    name: "Rose Garden",
    brand: "Nature's Touch",
    price: 84.99,
    category: "Women",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 4.6,
    quantity: 1,
  },
  {
    id: 5,
    name: "Spiced Leather",
    brand: "Bold Notes",
    price: 94.99,
    category: "Men",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 4.9,
    quantity: 1,
  },
  {
    id: 6,
    name: "Vanilla Silk",
    brand: "Soft Touch",
    price: 74.99,
    category: "Unisex",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 4.5,
    quantity: 1,
  },
  {
    id: 7,
    name: "Oud Mystique",
    brand: "Eastern Luxury",
    price: 129.99,
    category: "Men",
    images: [
      "/products/versaceeros.jpg",
      "/products/coachdreams.jpg",
      "/products/moschinotoy2bg.jpg",
    ],
    rating: 5.0,
    quantity: 1,
  },
  {
    id: 8,
    name: "Citrus Zest",
    brand: "Fresh Appeal",
    price: 64.99,
    category: "Unisex",
    images: [
      "/products/versaceeros.jpg",
      "/products/burberryhero.jpg",
      "/products/burberryhero.jpg",
    ],
    rating: 4.4,
    quantity: 1,
  },
];

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ["All", "Men", "Women", "Unisex"];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<number, number>
  >({});
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("search") || "";

  const [urlSearchQuery, setUrlSearchQuery] = useState(urlQuery);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(urlSearchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, urlSearchQuery, mockProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleNextImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40">
      {/* HEADER */}
      <section className="text-center px-6 py-10 mb-16">
        <h1 className="text-4xl font-bold text-[#BD955E] tracking-wide">
          Discover Your Signature Scent
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Curated collection of premium colognes and perfumes crafted to elevate
          your presence.
        </p>
      </section>

      {/* SEARCH + FILTER */}
      <section className="px-6 mb-14">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#111] border border-[#BD955E]/40 rounded-lg px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#BD955E]"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BD955E]"
              size={20}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#BD955E] text-black border-[#BD955E]"
                    : "border-[#BD955E]/40 hover:border-[#BD955E] text-[#BD955E]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-400">
            Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
            products
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No products found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#111] rounded-xl overflow-hidden border border-[#1a1a1a] hover:border-[#BD955E]/50 transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[currentImageIndex[product.id] || 0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage(product.id, product.images.length);
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <ArrowLeft size={18} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage(product.id, product.images.length);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <ArrowRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs tracking-widest text-[#BD955E] uppercase">
                      {product.brand}
                    </p>

                    <h3 className="text-xl font-semibold">{product.name}</h3>

                    <div className="flex items-center gap-2">
                      <span className="text-[#BD955E]">★</span>
                      <span className="text-sm text-gray-400">
                        {product.rating}
                      </span>
                    </div>

                    <p className="text-2xl font-bold text-[#BD955E]">
                      ${product.price.toFixed(2)}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#692437] text-white py-3 rounded-lg font-semibold transition hover:bg-[#692437]/80"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="pb-20">
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  currentPage === page
                    ? "bg-[#BD955E] text-black"
                    : "bg-[#111] border border-[#BD955E]/30 text-[#BD955E] hover:border-[#BD955E]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
