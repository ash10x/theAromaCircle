"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function NavDesktop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        height: isScrolled ? 100 : 175,
        backgroundColor: isScrolled ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.7)",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        ease: "easeOut",
      }}
      className="fixed top-0 z-50 w-full flex flex-col items-center pb-5 border-b border-[#0e0e0e] max-sm:hidden"
    >
      {/* Promo Bar */}
      <div className="p-2.5 w-full bg-[#692437] flex justify-center items-center">
        <p className="text-white text-[9.8pt] font-semibold tracking-wide">
          Free Shipping on Orders Over $75 | 100% Authentic Fragrances
        </p>
      </div>

      {/* Logo */}
      <motion.div
        initial={false}
        animate={{ opacity: isScrolled ? 0 : 1, height: isScrolled ? 0 : 80 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
        className="overflow-hidden mt-1.5"
      >
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </Link>
      </motion.div>

      {/* Nav Links */}
      <div className="flex gap-10 mt-4 font-semibold tracking-wider text-white">
        {[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: "Brands", href: "/shop/brands" },
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="transition duration-200 hover:scale-110 hover:text-[#BD955E]"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Icons */}
      <div className="absolute bottom-2.5 right-8 flex gap-5">
        {/* Search */}
        <div className="relative">
          <i
            className="material-symbols-outlined text-[14px] text-white cursor-pointer transition duration-200 hover:scale-110 hover:text-[#BD955E]"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            search
          </i>

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={isSearchOpen ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-8"
          >
            {isSearchOpen && (
              <input
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
                placeholder="Search products..."
                className="w-48 px-4 py-2 bg-black text-white placeholder-gray-400 border border-[#BD955E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BD955E]"
              />
            )}
          </motion.div>
        </div>

        {/* Cart */}
        <i className="material-symbols-outlined text-[14px] text-white cursor-pointer transition duration-200 hover:scale-110 hover:text-[#BD955E]">
          shopping_cart
        </i>
      </div>
    </motion.nav>
  );
}
