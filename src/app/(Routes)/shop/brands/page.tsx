// app/page.tsx (Next.js 13+ App Router)
// If using Pages Router, place in pages/index.tsx

"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [formValues, setFormValues] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Form submitted: ${JSON.stringify(formValues)}`);
    console.log("Form Values:", formValues);
  };

  return (
    <main className="min-h-screen bg-black text-gray-900 pt-40">
      {/* Hero Section */}
      <section className="text-center py-16 bg-black text-white">
        <h1 className="text-[28pt] text-[#BD955E] font-bold mb-4">
          Luxury Cologne & Perfume
        </h1>
        <p className="text-[14pt] text-[#E5E5E5] max-w-2xl mx-auto">
          Discover timeless fragrances from world-renowned brands.
        </p>
      </section>

      {/* Section 1: Featured Products */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-[25pt] font-semibold mb-6 text-white">
          Featured Fragrances
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Burberry - Hero",
            "Burberry - Mr.Burberry",
            "Hugo Boss - The Scent Elixir",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] rounded-lg shadow hover:shadow-xl transition-shadow p-6 flex flex-col items-center"
            >
              <img
                src={`/images/${item}.png`}
                alt={item}
                className="w-45 h-45 object-cover mb-4 rounded"
              />
              <h3 className="text-xl text-white font-medium mb-2">{item}</h3>
              <Link href={"/shop"}>
                <button className="mt-auto bg-[#692437] text-white px-4 py-2 rounded hover:bg-[#692437]/70 hover:scale-105 transition-all cursor-pointer">
                  Shop Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Brand Logos */}
      <section className="py-16 px-6 bg-black">
        <h2 className="text-3xl text-[#BD955E] font-semibold mb-6 text-center">
          Our Brands
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["coach", "christiandior", "gucci", "polo", "versace"].map(
            (brand) => (
              <div
                key={brand}
                className="w-25 h-25 flex items-center justify-center bg-black rounded shadow hover:scale-105 transition-transform"
              >
                <img
                  src={"/fragrancebrands/" + brand + ".png"}
                  alt={brand}
                  className="h-25 object-contain"
                />
              </div>
            ),
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl text-[#BD955E] font-semibold mb-6">
          Stay Updated
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full border-2 border-[#BD955E] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BD955E]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full border-2 border-[#BD955E] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BD955E]"
            required
          />
          <button
            type="submit"
            className="bg-[#692437] text-white px-6 py-2 rounded hover:bg-[#692437]/70 hover:scale-105 transition-all cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
