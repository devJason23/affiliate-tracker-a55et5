import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-lg py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <img 
            src="https://i.ibb.co/Mnp9Pfm/A55-ET5-Loge-Pastel.png"
            alt="A55ET5 Logo"
            className="h-12 object-contain"
          />
          <nav className="space-x-6">
            <Link href="/features" className="text-white hover:underline">Features</Link>
            <Link href="/pricing" className="text-white hover:underline">Pricing</Link>
            <Link href="/contact" className="text-white hover:underline">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          <img 
            src="https://i.ibb.co/Mnp9Pfm/A55-ET5-Loge-Pastel.png"
            alt="A55ET5 Logo"
            className="h-16 mx-auto mb-6 object-contain"
          />
          <h1 className="text-5xl font-bold mb-4">Welcome to A55ET5</h1>
          <p className="text-lg mb-8">
            Your ultimate solution for affiliate tracking and management. Simplify your workflow and take control of your affiliate campaigns today.
          </p>
          <div className="space-x-4">
            <Link 
              href="/dashboard" 
              className="inline-block px-6 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC] shadow-md"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/learn-more" 
              className="inline-block px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[#00A3FF] shadow-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p>Monitor your affiliates and campaigns in real-time for optimal performance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Payouts</h3>
              <p>Streamline your payment process with customizable payout options.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p>Gain insights into your campaigns with detailed analytics and reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 A55ET5. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
