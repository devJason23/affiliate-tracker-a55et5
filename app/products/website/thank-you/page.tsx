"use client";

import { useState } from "react";

export default function WebsiteThankYouPage() {
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // Validate inputs
    if (!niche || !location) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // Log or send the collected data to your backend
    const data = { niche, location };
    console.log("Collected Data:", data);
    alert("Thank you! Your information has been submitted.");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please provide the following details to complete your order.
        </p>

        {/* Website Niche Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Website Niche</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Divorce Lawyer"
          />
        </div>

        {/* Location Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Las Vegas"
          />
        </div>

        {/* Submit Button */}
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
          onClick={handleSubmit}
        >
          Submit Information
        </button>
      </div>
    </main>
  );
}
