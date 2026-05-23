"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Brands", href: "/shop/brands" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const COLLECTIONS = [
  { label: "Men's Fragrances", href: "/shop/men" },
  { label: "Women's Fragrances", href: "/shop/women" },
  { label: "Unisex Collection", href: "/shop/unisex" },
  { label: "Best Sellers", href: "/shop" },
];

export default function FooterDesktop() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsPending(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Subscriber", email }),
      });

      if (!response.ok) throw new Error("Subscription failed.");

      setStatus("You have been added to our private list.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("Unable to subscribe right now. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-[#050505] border-t border-white/5"
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 pt-16 pb-14 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand column */}
        <div className="md:col-span-1 flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="The Aroma Circle" width={38} height={38} className="opacity-70 group-hover:opacity-90 transition" />
            <span
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-white/70 text-lg tracking-widest font-light"
            >
              The Aroma Circle
            </span>
          </Link>

          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/25 text-xs leading-relaxed font-light tracking-wide max-w-50"
          >
            Curating luxury scents that leave lasting impressions.
          </p>

          <div className="flex gap-4 mt-1">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/20 hover:text-[#BD955E] transition-colors duration-300"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h4
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-1"
          >
            Navigate
          </h4>
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-white/40 text-sm font-light hover:text-[#BD955E] transition-colors duration-300 w-fit"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Collections */}
        <div className="flex flex-col gap-4">
          <h4
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-1"
          >
            Collections
          </h4>
          {COLLECTIONS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-white/40 text-sm font-light hover:text-[#BD955E] transition-colors duration-300 w-fit"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-1"
          >
            Private List
          </h4>

          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/25 text-xs font-light leading-relaxed"
          >
            Exclusive drops, early access, and fragrance notes for members only.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-transparent border border-white/10 text-white text-xs px-4 py-3 placeholder-white/20 focus:border-[#BD955E]/40 focus:outline-none transition-colors duration-300"
            />
            <button
              type="submit"
              disabled={isPending}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full border border-[#BD955E]/40 text-[#BD955E] text-[11px] tracking-[0.3em] uppercase py-3 hover:bg-[#BD955E] hover:text-black transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Joining…" : "Join the List"}
            </button>
          </form>

          {status && (
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[#BD955E]/60 text-xs font-light"
            >
              {status}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/4 py-5 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3">
        <p
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          className="text-white/15 text-[10px] tracking-[0.3em] uppercase"
        >
          © {new Date().getFullYear()} The Aroma Circle. All rights reserved.
        </p>
        <p
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          className="text-white/10 text-sm italic tracking-wide"
        >
          Where Scents Become Signatures
        </p>
      </div>
    </motion.footer>
  );
}
