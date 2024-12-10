import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img 
          src="https://i.ibb.co/Mnp9Pfm/A55-ET5-Loge-Pastel.png"
          alt="A55ET5" 
          className="h-16 mx-auto mb-8 object-contain"
        />
        <h1 className="text-4xl font-bold mb-8">Welcome to A55ET5</h1>
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="block px-6 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
