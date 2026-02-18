"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] py-52 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.35em] text-[#BD955E] text-xs">
            The Aroma Circle
          </p>

          <h1 className="text-[42pt] max-sm:text-[28pt] font-light text-white mt-4">
            Get In Touch
          </h1>

          <p className="text-neutral-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you’re seeking the perfect signature scent or need
            assistance with your order, our team is here to provide a refined
            experience.
          </p>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "contact@example.com",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+1 (555) 000-0000",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "123 Main St, City, State",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-[#BD955E]/20 
              rounded-2xl p-8 text-center 
              hover:border-[#BD955E] transition duration-300 shadow-lg"
            >
              <item.icon className="w-8 h-8 text-[#BD955E] mx-auto mb-4" />

              <h3 className="text-white uppercase tracking-widest text-sm mb-2">
                {item.title}
              </h3>

              <p className="text-neutral-400">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ================= FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-[#BD955E]/20 
          rounded-2xl p-10 md:p-14 shadow-2xl"
        >
          <form className="space-y-8">
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#0e0e0e] border border-[#222] 
                rounded-lg px-5 py-4 text-white 
                placeholder:text-neutral-500
                focus:outline-none focus:border-[#BD955E] 
                transition duration-300"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0e0e0e] border border-[#222] 
                rounded-lg px-5 py-4 text-white 
                placeholder:text-neutral-500
                focus:outline-none focus:border-[#BD955E] 
                transition duration-300"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-[#0e0e0e] border border-[#222] 
              rounded-lg px-5 py-4 text-white 
              placeholder:text-neutral-500
              focus:outline-none focus:border-[#BD955E] 
              transition duration-300"
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-[#0e0e0e] border border-[#222] 
              rounded-lg px-5 py-4 text-white 
              placeholder:text-neutral-500
              focus:outline-none focus:border-[#BD955E] 
              transition duration-300 resize-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg 
              bg-linear-to-r from-[#BD955E] to-[#e6c78b] 
              text-black font-semibold tracking-wider 
              flex items-center justify-center gap-3 
              shadow-lg hover:opacity-90 transition duration-300"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
