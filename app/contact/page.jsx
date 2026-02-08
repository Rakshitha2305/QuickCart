'use client';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/contact", formData);

      if (data.success) {
        toast.success("Message sent successfully");
        setFormData({ fullname: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="text-lg font-medium mt-6 mb-4 text-center">
            Contact Us
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow space-y-4"
          >
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
