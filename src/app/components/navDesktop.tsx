"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/cartContext";
import MiniCart from "./miniCart";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Brands", href: "/shop/brands" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function NavDesktop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const reduceMotion = useReducedMotion();

  const { cart, isCartOpen, openCart, closeCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop?search=${encodeURIComponent(searchText)}`);
    setIsSearchOpen(false);
    setSearchText("");
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        height: isScrolled ? 68 : 156,
        backgroundColor: isScrolled ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.60)",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-0 z-50 w-full flex flex-col items-center border-b border-white/[0.06] max-sm:hidden backdrop-blur-md"
    >
      {/* Promo bar — collapses on scroll */}
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : "auto",
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        className="overflow-hidden w-full"
      >
        <div className="w-full bg-[#0A0A0A] border-b border-white/[0.04] flex justify-center items-center px-6 py-2">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/40 text-[10px] font-light tracking-[0.4em] uppercase"
          >
            1–2 Day In-Store Collection&nbsp;&nbsp;·&nbsp;&nbsp;Smell Before You Buy&nbsp;&nbsp;·&nbsp;&nbsp;100% Authentic Fragrances
          </p>
        </div>
      </motion.div>

      {/* Logo row — collapses on scroll */}
      <motion.div
        initial={false}
        animate={{ height: isScrolled ? 0 : 80, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        className="overflow-hidden flex items-center justify-center"
      >
        <Link href="/" className="flex items-center gap-3 mt-1">
          <Image
            src="/logo.png"
            alt="The Aroma Circle"
            width={55}
            height={55}
            className="opacity-90"
          />
        </Link>
      </motion.div>

      {/* Main nav row */}
      <div className="flex items-center justify-between w-full max-w-7xl px-10 h-[68px]">
        {/* Condensed logo — visible only when scrolled */}
        <motion.div
          initial={false}
          animate={{ opacity: isScrolled ? 1 : 0, width: isScrolled ? 44 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="overflow-hidden flex items-center shrink-0"
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="The Aroma Circle"
              width={28}
              height={28}
              className="opacity-85"
            />
          </Link>
        </motion.div>

        {/* Nav links */}
        <div
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="flex gap-10 text-[11px] font-light tracking-[0.25em] uppercase text-white/60 mx-auto"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group pb-0.5 transition-colors duration-300 ${
                  isActive ? "text-[#BD955E]" : "hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-px left-0 h-px bg-[#BD955E] transition-all duration-500 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Icon cluster */}
        <div className="flex gap-6 items-center">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="text-white/40 hover:text-[#BD955E] transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={15} strokeWidth={1.5} />
            </button>

            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-9"
              >
                <form onSubmit={handleSearch}>
                  <input
                    autoFocus
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search fragrances…"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                    className="w-56 px-4 py-2.5 bg-[#0D0D0D] text-white text-[12px] tracking-wide placeholder-white/20 border border-white/10 focus:border-[#BD955E]/40 focus:outline-none transition"
                  />
                </form>
              </motion.div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button
              onClick={() => {
                isCartOpen ? closeCart() : openCart();
                setIsSearchOpen(false);
              }}
              className="text-white/40 hover:text-[#BD955E] transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-[#BD955E] text-black rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
            <MiniCart isOpen={isCartOpen} onClose={closeCart} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
