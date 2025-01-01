"use client";

import { useState } from "react";

export default function TrustThankYouPage() {
  const [grantor, setGrantor] = useState("");
  const [trustees, setTrustees] = useState([""]);
  const [overseers, setOverseers] = useState([""]);
  const [beneficiaries, setBeneficiaries] = useState([""]);

  const handleSubmit = () => {
    // Validate all fields
    if (!grantor) {
      alert("Please fill out the Grantor/Settlor field.");
      return;
    }
    if (trustees.filter((t) => t !== "").length === 0) {
      alert("Please add at least one Trustee.");
      return;
    }
    if (overseers.filter((o) => o !== "").length === 0) {
      alert("Please add at least one Trust Overseer.");
      return;
    }
    if (beneficiaries.filter((b) => b !== "").length === 0) {
      alert("Please add at least one Beneficiary.");
      return;
    }

    // Prepare the collected data
    const data = {
      grantor,
      trustees: trustees.filter((t) => t !== ""),
      overseers: overseers.filter((o) => o !== ""),
      beneficiaries: beneficiaries.filter((b) => b !== ""),
    };

    console.log("Collected Data:", data);
    alert("Thank you! Your information has been submitted.");
  };

  const handleAddField = (setState, state) => {
    setState([...state, ""]);
  };

  const handleRemoveField = (setState, state, index) => {
    const updated = [...state];
    updated.splice(index, 1);
    setState(updated);
  };

  const handleInputChange = (setState, state, index, value) => {
    const updated = [...state];
    updated[index] = value;
    setState(updated);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please provide the following details to complete your Trust application.
        </p>

        {/* Grantor/Settlor */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Grantor/Settlor</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={grantor}
            onChange={(e) => setGrantor(e.target.value)}
            placeholder="Enter Grantor's Name"
          />
        </div>

        {/* Trustees */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Trustees</label>
          {trustees.map((trustee, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-grow p-2 border rounded"
                value={trustee}
                onChange={(e) => handleInputChange(setTrustees, trustees, index, e.target.value)}
                placeholder="Enter Trustee's Name"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveField(setTrustees, trustees, index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={() => handleAddField(setTrustees, trustees)}
          >
            Add Trustee
          </button>
        </div>

        {/* Trust Overseers */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Trust Overseers</label>
          {overseers.map((overseer, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-grow p-2 border rounded"
                value={overseer}
                onChange={(e) => handleInputChange(setOverseers, overseers, index, e.target.value)}
                placeholder="Enter Overseer's Name"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveField(setOverseers, overseers, index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={() => handleAddField(setOverseers, overseers)}
          >
            Add Overseer
          </button>
        </div>

        {/* Beneficiaries */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Beneficiaries</label>
          {beneficiaries.map((beneficiary, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-grow p-2 border rounded"
                value={beneficiary}
                onChange={(e) =>
                  handleInputChange(setBeneficiaries, beneficiaries, index, e.target.value)
                }
                placeholder="Enter Beneficiary's Name"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveField(setBeneficiaries, beneficiaries, index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={() => handleAddField(setBeneficiaries, beneficiaries)}
          >
            Add Beneficiary
          </button>
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
