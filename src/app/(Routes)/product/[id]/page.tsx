"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/cartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  description: string;
}

const products: Product[] = [
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
    description:
      "A bold and captivating fragrance blending warm amber, dark woods, and subtle spice.",
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
    description:
      "Elegant floral composition balanced with fresh citrus and warm vanilla undertones.",
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "Coastal Vibes",
    price: 69.99,
    category: "Unisex",
    images: ["/products/burberryhero.jpg", "/products/coachdreams.jpg"],
    rating: 4.7,
    description:
      "Fresh aquatic scent delivering clarity, energy, and effortless sophistication.",
  },
];

export default function ProductPageElite() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, openCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(
      (p) => p.category === product.category && p.id !== product.id,
    );
  }, [product]);

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </div>
    );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    openCart?.(); // triggers drawer if implemented
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    router.push("/checkout?method=pickup");
  };

  return (
    <div className="bg-black text-white min-h-screen pt-50 pb-40">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 mb-10"
      >
        <button
          onClick={() => router.back()}
          className="text-[#BD955E] hover:underline"
        >
          ← Back to Shop
        </button>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div
            className="relative aspect-square bg-[#111] rounded-xl overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <motion.div
              animate={{ scale: isZoomed ? 1.25 : 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image
                src={product.images[imageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Wishlist */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute top-4 right-4 bg-black/60 p-3 rounded-full"
            >
              <Heart
                className={
                  wishlisted ? "text-red-500 fill-red-500" : "text-white"
                }
              />
            </motion.button>

            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImageIndex(
                      (prev) =>
                        (prev - 1 + product.images.length) %
                        product.images.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
                >
                  <ArrowLeft />
                </button>

                <button
                  onClick={() =>
                    setImageIndex((prev) => (prev + 1) % product.images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
                >
                  <ArrowRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images.map((img, i) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={i}
                onClick={() => setImageIndex(i)}
                className={`relative w-20 h-20 rounded-lg cursor-pointer overflow-hidden border ${
                  i === imageIndex ? "border-[#BD955E]" : "border-[#333]"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* INFO SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <p className="text-[#BD955E] uppercase tracking-widest">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-400">★ {product.rating} rating</p>

          <p className="text-3xl font-bold text-[#BD955E]">${product.price}</p>

          <p className="text-gray-400">{product.description}</p>

          {/* Quantity */}
          <div>
            <p className="text-sm mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                className="w-10 h-10 border border-[#333]"
              >
                −
              </button>

              <span className="text-xl">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 border border-[#333]"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-[#692437] py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="flex-1 bg-[#BD955E] text-black py-4 rounded-lg font-semibold"
            >
              Store Pickup
            </motion.button>
          </div>

          <div className="text-gray-500 text-sm">
            ✓ Store Pickup Available ✓ Authentic Guarantee ✓ Secure Checkout
          </div>
        </motion.div>
      </div>

      {/* RELATED */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-2xl font-bold mb-8 text-[#BD955E]">
          Related Products
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedProducts.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-[#111] border border-[#222] rounded-xl overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <p className="text-[#BD955E] text-sm">{item.brand}</p>

                  <p>{item.name}</p>

                  <p className="text-[#BD955E] font-bold">${item.price}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
