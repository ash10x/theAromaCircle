"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function NavMobile() {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    if (cartOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchText)}`);
      setSearchText("");
      setSearchOpen(false);
      setNavOpen(false);
    }
  };

  return (
    <div className={navOpen ? "overflow-hidden" : "overflow-auto"}>
      {/* Top nav bar */}
      <div
        className={
          !navOpen
            ? "fixed top-0 right-0 flex flex-row items-center gap-2.5 justify-end p-5 h-max w-full bg-black z-50 md:hidden"
            : "hidden"
        }
      >
        <Link href="/">
          <Image
            className="absolute left-2.5 top-4.5 w-40 h-auto cursor-pointer md:hidden"
            src={"/logomobile.svg"}
            height={160}
            width={160}
            alt="logo"
          />
        </Link>

        {/* Search icon */}
        <Image
          className="w-6 h-auto cursor-pointer md:hidden"
          src={"/icons/search.svg"}
          height={25}
          width={25}
          alt="search"
          onClick={() => setSearchOpen((prev) => !prev)}
        />

        {/* Cart icon */}
        <div className="relative">
          <Image
            className="w-6 h-auto cursor-pointer md:hidden"
            src={"/icons/cart.svg"}
            height={25}
            width={25}
            alt="cart"
            onClick={() => setCartOpen(true)}
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#BD955E] text-black rounded-full px-1 text-xs font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>

        {/* Menu icon */}
        <Image
          className="w-6 h-auto cursor-pointer md:hidden"
          src={"/icons/menu.svg"}
          height={25}
          width={25}
          alt="menu"
          onClick={() => setNavOpen(true)}
        />
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-[#111] z-50 px-5 overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="flex w-full gap-2">
              <input
                type="text"
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-3 rounded-lg bg-black text-white border border-[#BD955E] focus:outline-none focus:ring-2 focus:ring-[#BD955E]"
              />
              <button
                type="submit"
                className="bg-[#BD955E] text-black px-4 py-3 rounded-lg font-semibold"
              >
                Go
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav overlay */}
      <div
        className={
          navOpen
            ? "fixed top-0 right-0 flex flex-col items-center justify-center h-screen w-full bg-black z-40 overflow-hidden transition-all duration-300 md:hidden"
            : "fixed top-0 right-0 flex flex-col items-center justify-center h-0 w-full bg-black z-40 overflow-hidden transition-all duration-300 md:hidden"
        }
      >
        {/* Close button */}
        <Image
          className="absolute top-0 mt-6 right-3 w-[34px] h-auto cursor-pointer"
          src={"/icons/arrowup.svg"}
          height={34}
          width={34}
          alt="close"
          onClick={() => setNavOpen(false)}
        />

        <Link href="/">
          <Image
            className="w-auto h-auto mt-5 mb-10"
            src={"/logowhite.png"}
            height={60}
            width={60}
            alt="logo"
            onClick={() => setNavOpen(false)}
          />
        </Link>

        <div className="flex flex-col items-center gap-10 text-white font-semibold mb-20">
          {["Home", "Shop", "Brands", "About", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="cursor-pointer hover:scale-110 hover:text-[#BD955E] transition duration-200"
              onClick={() => setNavOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* MiniCart component */}
      {/* You can reuse the previous MiniCart code here */}
    </div>
  );
}
