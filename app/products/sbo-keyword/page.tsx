"use client"; // Enable interactivity for the component

export default function SBOKeywordPage() {
  const checkoutUrl = "https://buy.stripe.com/8wM2bLeag17Gcj6dQW"; // Stripe Checkout Link for SBO Keyword

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        {/* Product Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">SBO Keyword</h1>
        <p className="text-lg text-gray-600 mb-6">
          A strategic keyword for dominating local search results. Enhance your business visibility with this exclusive offer.
        </p>

        {/* Product Details */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">Price: $750/month</p>
          <p className="text-sm text-gray-500 mt-2">Billing: Monthly subscription</p>
        </div>

        {/* Call to Action */}
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
          onClick={() => window.location.href = checkoutUrl}
        >
          Buy Now
        </button>
      </div>
    </main>
  );
}
