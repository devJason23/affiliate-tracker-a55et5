"use client"; // Enable interactivity for the component

export default function WebsitePage() {
  const checkoutUrl = "https://buy.stripe.com/3cs2bL5DK4jS4QE28d"; // Stripe Checkout Link for the Website product

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        {/* Product Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Website for Sale</h1>
        <p className="text-lg text-gray-600 mb-6">
          A professionally built website tailored to your business needs. Boost your online presence and stand out in the digital marketplace.
        </p>

        {/* Product Details */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">Price: $2,500</p>
          <p className="text-sm text-gray-500 mt-2">Billing: One-time payment</p>
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
