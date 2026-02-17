"use client";

import { createContext, useContext, useState } from "react";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  images: string[];
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const toggleWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) return prev.filter((item) => item.id !== product.id);

      return [...prev, product];
    });
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext)!;
