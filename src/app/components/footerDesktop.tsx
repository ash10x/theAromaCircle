"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function FooterDesktop() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-black border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-neutral-400">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl tracking-widest uppercase font-semibold">
            The Aroma Circle
          </h2>
          <p className="text-sm leading-relaxed text-neutral-500">
            Curating luxury scents that leave lasting impressions. Elevate your
            presence with every note.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm tracking-widest uppercase">
            Stay Connected
          </h3>
          <p className="text-sm text-neutral-500">
            Subscribe for exclusive drops & fragrance updates.
          </p>

          <div className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-neutral-900 text-white text-sm px-4 py-3 outline-none border border-neutral-800 focus:border-neutral-600 transition-all"
            />
            <button className="bg-white text-black text-sm px-5 py-3 hover:bg-neutral-200 transition-all">
              Join
            </button>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex flex-col gap-4 md:items-end">
          <h3 className="text-white text-sm tracking-widest uppercase">
            Follow Us
          </h3>
          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 py-6 text-center text-neutral-600 text-xs tracking-wide">
        © {new Date().getFullYear()} The Aroma Circle. All rights reserved.
      </div>
    </motion.footer>
  );
}
