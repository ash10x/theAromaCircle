"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: "fragrancesthearomacircle@gmail.com",
    href: "mailto:fragrancesthearomacircle@gmail.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+1 (876) 518-2868",
    href: "tel:+18765182868",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "14 Strand St · China Doll Plaza, Montego Bay, Jamaica",
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Submission failed.");

        setStatus("Thank you — your message has been received.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        console.error(error);
        setStatus("Sorry, we could not send your message right now. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#080808] pt-24 md:pt-39 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── PAGE HEADER ── */}
        <div className="text-center py-16 border-b border-white/4 mb-16">
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-[10px] text-[#BD955E] tracking-[0.45em] uppercase font-light mb-4"
          >
            The Aroma Circle
          </p>
          <h1
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            className="text-[42pt] max-sm:text-[28pt] font-light text-white"
          >
            Elite Client Concierge
          </h1>
          <p
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            className="text-white/30 mt-5 text-sm font-light leading-relaxed max-w-xl mx-auto tracking-wide"
          >
            Reach our fragrance specialists for bespoke recommendations, corporate gifting, or premium support.
          </p>
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACT_ITEMS.map(({ Icon, label, value, href }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="border border-white/6 bg-[#0D0D0D] p-8 text-center group hover:border-[#BD955E]/20 transition-colors duration-500"
            >
              <Icon
                className="w-5 h-5 text-[#BD955E]/50 mx-auto mb-5 group-hover:text-[#BD955E] transition-colors duration-300"
                strokeWidth={1.5}
              />
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-white/25 tracking-[0.4em] uppercase mb-3"
              >
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-white/50 text-sm font-light hover:text-[#BD955E] transition-colors duration-300 break-all"
                >
                  {value}
                </a>
              ) : (
                <p
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  className="text-white/50 text-sm font-light"
                >
                  {value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── CONTACT FORM ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="border border-white/6 bg-[#0D0D0D] p-10 md:p-14"
        >
          <div className="pb-8 border-b border-white/4 mb-8">
            <p
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="text-[10px] text-[#BD955E] tracking-[0.4em] uppercase font-light mb-2"
            >
              Send a Message
            </p>
            <h2
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              className="text-3xl font-light text-white"
            >
              How can we assist you?
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "name", placeholder: "Full Name", type: "text" },
                { name: "email", placeholder: "Email Address", type: "email" },
              ].map(({ name, placeholder, type }) => (
                <div key={name} className="space-y-1.5">
                  <label
                    htmlFor={name}
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="text-[10px] text-white/25 tracking-[0.35em] uppercase block"
                  >
                    {placeholder}
                  </label>
                  <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                    className="w-full bg-[#080808] border border-white/8 px-5 py-3.5 text-white text-sm placeholder-white/15 focus:border-[#BD955E]/40 focus:outline-none transition-colors duration-300 tracking-wide"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-white/25 tracking-[0.35em] uppercase block"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="w-full bg-[#080808] border border-white/8 px-5 py-3.5 text-white text-sm placeholder-white/15 focus:border-[#BD955E]/40 focus:outline-none transition-colors duration-300 tracking-wide"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-[10px] text-white/25 tracking-[0.35em] uppercase block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message…"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="w-full bg-[#080808] border border-white/8 px-5 py-3.5 text-white text-sm placeholder-white/15 focus:border-[#BD955E]/40 focus:outline-none transition-colors duration-300 resize-none tracking-wide"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              className="w-full bg-[#BD955E] px-6 py-4 text-black text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#cca96a] transition-colors duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending…" : "Send Message"}
            </button>

            {status && (
              <p
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                className="text-center text-sm text-[#BD955E]/60 font-light"
              >
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
