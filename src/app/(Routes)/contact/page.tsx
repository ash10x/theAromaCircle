"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
    <div className="min-h-screen w-full bg-linear-to-br bg-black py-12 px-4 sm:px-6 lg:px-8 max-sm:py-6">
      <div className="pt-40 w-[50%] h-max mx-auto max-sm:w-full max-sm:pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[28pt] font-bold text-[#BD955E] mb-4 max-sm:text-[22pt]">
            Get In Touch
          </h1>
          <p className="text-[18pt] font-semibold text-[#692437] max-sm:text-[14pt]">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-[#070707] rounded-lg shadow-md p-6 text-center max-sm:w-[90%] mx-auto">
            <Mail className="w-10 h-10 text-[#BD955E] mx-auto mb-4" />
            <h3 className="font-semibold text-[#BD955E] text-[13pt] mb-2">
              Email
            </h3>
            <p className="text-white text-[12pt]">contact@example.com</p>
          </div>
          <div className="bg-[#070707] rounded-lg shadow-md p-6 text-center max-sm:w-[90%] mx-auto">
            <Phone className="w-10 h-10 text-[#BD955E] mx-auto mb-4" />
            <h3 className="font-semibold text-[#BD955E] text-[13pt] mb-2">
              Phone
            </h3>
            <p className="text-white text-[12pt]">+1 (555) 000-0000</p>
          </div>
          <div className="bg-[#070707] rounded-lg shadow-md p-6 text-center max-sm:w-[90%] mx-auto">
            <MapPin className="w-10 h-10 text-[#BD955E] mx-auto mb-4" />
            <h3 className="font-semibold text-[#BD955E] text-[13pt] mb-2">
              Address
            </h3>
            <p className="text-white text-[12pt]">123 Main St, City, State</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#070707]  rounded-lg shadow-lg p-8 md:p-12 max-sm:w-[90%] mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#BD955E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white placeholder:text-gray-400 text-[12pt]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#BD955E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white placeholder:text-gray-400 text-[12pt]"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#BD955E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BD955E] text-white placeholder:text-gray-400 text-[12pt]"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-[#BD955E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BD955E] resize-none text-white placeholder:text-gray-400 text-[12pt]"
            />
            <button
              type="submit"
              className="w-full bg-[#692437] hover:bg-[#BD955E] text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-[13pt]"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
