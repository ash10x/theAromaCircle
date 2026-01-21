"use client";
import { useState, useMemo, use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
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

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
    <div className="min-h-screen bg-black pt-50">
      {/* Header */}
      <section className="p-5 text-center">
        <h1 className="text-[28pt] font-bold text-[#BD955E] mb-4 tracking-wide">
          Discover Your Signature Scent
        </h1>
        <p className="text-[12.5pt] text-[#692437] font-semibold max-w-2xl mx-auto tracking-wide">
          Curated collection of premium colognes and perfumes for every mood and
          occasion
        </p>
      </section>

      {/* Search & Filter */}
      <section className="px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
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
              className="w-full px-6 py-3 rounded-lg border-2 border-[#BD955E] focus:border-slate-900 focus:outline-none transition-colors text-slate-900 placeholder-slate-500"
            />
            <span className="absolute right-4 top-3.5 text-slate-400">
              <Search size={20} color="white" />
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#BD955E] text-white shadow-lg"
                    : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-600">
            Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
            products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 md:px-8 pb-12 flex flex-col gap-8 items-center">
        <div className="max-w-6xl mx-auto">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-slate-600">
                No products found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer transition-all duration-300 w-75 h-max hover:shadow-xl rounded-xl overflow-hidden"
                >
                  {/* Image Slider */}
                  <div className="relative w-full h-90 bg-linear-to-br from-slate-100 to-slate-50 aspect-square overflow-hidden rounded-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.images[currentImageIndex[product.id] || 0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-90"
                      />
                    </div>

                    {/* Navigation Buttons */}
                    {product.images.length > 1 && (
                      <>
                        <ArrowLeft
                          size={35}
                          color="#692437"
                          onClick={() =>
                            handlePrevImage(product.id, product.images.length)
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2  hover:scale-110 p-2 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 cursor-pointer group-hover:opacity-100"
                        />
                        <ArrowRight
                          size={35}
                          color="#692437"
                          onClick={() =>
                            handleNextImage(product.id, product.images.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2  p-2 rounded-full transition-all duration-300 opacity-0 hover:scale-110 hover:opacity-100 cursor-pointer group-hover:opacity-100"
                        />

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                          {product.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                idx === (currentImageIndex[product.id] || 0)
                                  ? "bg-[#692437] w-6"
                                  : "bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {product.brand}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#B] transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-sm text-white font-medium">
                        {product.rating}
                      </span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-[#692437] text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-[#692437]/80 hover:shadow-lg active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-6xl mx-auto flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-300 font-medium transition-all duration-300 hover:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-slate-200 text-slate-900"
                        : "bg-slate-900 text-slate-200 hover:bg-slate-300"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-300 font-medium transition-all duration-300 hover:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
