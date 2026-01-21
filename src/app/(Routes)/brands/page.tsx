// app/page.tsx (Next.js 13+ App Router)
// If using Pages Router, place in pages/index.tsx

"use client";
import { useState } from "react";

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
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 bg-linear-to-r from-pink-100 via-white to-blue-100">
        <h1 className="text-5xl font-bold mb-4">Luxury Cologne & Perfume</h1>
        <p className="text-lg text-gray-600">
          Discover timeless fragrances from world-renowned brands.
        </p>
      </section>

      {/* Section 1: Featured Products */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Featured Fragrances</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Eau de Parfum", "Cologne", "Limited Edition"].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6 flex flex-col items-center"
            >
              <img
                src={`/images/product${i + 1}.jpg`}
                alt={item}
                className="w-40 h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-medium mb-2">{item}</h3>
              <button className="mt-auto bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Brand Logos */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Brands</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["chanel", "dior", "gucci", "armani", "ysl"].map((brand) => (
            <div
              key={brand}
              className="w-32 h-16 flex items-center justify-center bg-white rounded shadow hover:scale-105 transition-transform"
            >
              <img
                src={`/logos/${brand}.png`}
                alt={brand}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Stay Updated</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
