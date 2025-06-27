"use client";
import BackButton from "@/components/Backbutton";
/* eslint-disable */
import { useSendMail } from "@/services/chat/mutation";
import React, { useState } from "react";

export default function SimpleContactForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useSendMail();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (message.trim() === "") return;

    setIsSubmitting(true);
    mutate(
      {
        message: message,
      },
      {
        onSuccess: () => {
          // router.push("/dashboard/notice-agreement");
          window.location.reload();
        },
        onError: (error: any) => {
          setError(
            error.message || "An error occurred during notice creation."
          );
        },
      }
    );

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setMessage("");
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
        <div className="bg-white rounded-lg p-10 text-center shadow-lg max-w-sm w-full">
          <h2 className="text-green-600 mb-4 text-2xl font-semibold">
            Thank You!
          </h2>
          <p className="text-gray-600 m-0">
            Your message has been sent successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50  flex items-start justify-start p-10">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className=" ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-2 m-0 flex">
            <BackButton />
            <span>Contact Us</span>
          </h1>
          <p className="text-sm text-[#353535] m-0">
            Got a question, concern, or need help with something? We're here to
            assist you.
          </p>
        </div>

        {/* Message Field */}
        <div className="mb-5 bg-white rounded-lg p-10 shadow-lg max-w-2xl w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us how we can help..."
            className="w-full min-h-[120px] text-[#000] border border-x-transparent border-t-transparent border-b-[#8D8D8D] p-3 rounded resize-y text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-150"
            rows={5}
          />
          <button
            onClick={handleSubmit}
            disabled={message.trim() === "" || isSubmitting}
            className="bg-[#011C2A] flex justify-self-end  hover:bg-gray-700 disabled:bg-gray-500 text-white border-none rounded px-6 py-3 text-sm font-medium cursor-pointer disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* Submit Button */}
      </div>
    </div>
  );
}
