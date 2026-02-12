"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[36pt] max-sm:text-[26pt] text-[#BD955E] font-semibold text-center tracking-tight"
        >
          More Than Fragrance. It’s Identity.
        </motion.h1>

        <p className="mt-8 text-neutral-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          At The Aroma Circle, scent is a statement. It’s how you enter a room.
          It’s how you’re remembered. We curate premium fragrances for
          individuals who understand that style doesn’t stop at what you wear —
          it’s what you leave behind.
        </p>

        {/* Divider */}
        <div className="border-t border-neutral-900 my-20" />

        {/* Content Sections */}
        <div className="space-y-20 text-neutral-300 leading-relaxed">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl font-semibold text-[#BD955E] mb-3">
              Our Story
            </h2>
            <p className="text-[#a6854e] font-medium mb-6 uppercase tracking-widest text-sm">
              Where It Began
            </p>
            <p>
              The Aroma Circle was born from a simple truth: fragrance is
              personal, powerful, and deeply emotional. A single scent can
              unlock memories, spark confidence, and define moments.
            </p>
            <p className="mt-4">
              What started as a passion for exceptional aromas became a mission:
              to make authentic, high-quality fragrances accessible to those who
              move with intention and style.
            </p>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-3xl font-semibold text-[#BD955E] mb-3">
              Our Philosophy
            </h2>
            <p className="text-[#a6854e] font-medium mb-6 uppercase tracking-widest text-sm">
              Scent Is Power
            </p>
            <p>
              We believe every person carries a unique energy. Fragrance is how
              you amplify it.
            </p>
            <p className="mt-4">
              Each bottle we offer is chosen with precision — whether bold and
              magnetic, soft and intimate, or clean and timeless.
            </p>

            <ul className="mt-6 space-y-3 text-neutral-400">
              <li>• This isn’t about trends.</li>
              <li>• It’s about presence.</li>
              <li>• It’s about confidence.</li>
              <li>• It’s about becoming unforgettable.</li>
            </ul>
          </section>

          {/* What We Offer */}
          <section>
            <h2 className="text-3xl font-semibold text-[#BD955E] mb-3">
              What We Offer
            </h2>
            <p className="text-[#a6854e] font-medium mb-6 uppercase tracking-widest text-sm">
              Curated. Authentic. Elevated.
            </p>

            <ul className="space-y-3 list-disc list-inside text-neutral-400">
              <li>Premium designer fragrances</li>
              <li>Hard-to-find and hidden-gem scents</li>
              <li>100% authentic products</li>
              <li>A refined, modern shopping experience</li>
            </ul>

            <p className="mt-6">
              Every fragrance in our circle earns its place. No clutter. No
              guesswork. Just scents that make an impact.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-3xl font-semibold text-[#BD955E] mb-3">
              The Experience
            </h2>
            <p className="text-[#a6854e] font-medium mb-6 uppercase tracking-widest text-sm">
              More Than Shopping
            </p>
            <p>
              We’re not just selling cologne and perfume — we’re creating a
              journey.
            </p>
            <p className="mt-4">
              From the moment you browse to the instant your fragrance arrives,
              every detail is crafted to feel intentional, smooth, and elevated.
              You’re not just choosing a scent — you’re discovering a new
              version of yourself.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center pt-10">
            <h2 className="text-3xl font-semibold text-[#BD955E] mb-6">
              Enter The Circle
            </h2>

            <Link href="/shop">
              <button className="bg-[#BD955E] text-black font-medium px-8 py-3 rounded-full hover:bg-[#BD955E]/80 transition-all">
                Shop Now
              </button>
            </Link>

            <p className="mt-8 text-neutral-400">
              Your scent is your signature. <br />
              Your presence is your brand.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
