export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <img 
          src="https://i.ibb.co/CtDkWFF/A55-ET5-LOGO-Donkey.webp"
          alt="A55ET5 Mascot" 
          className="h-32 mx-auto mb-6 object-contain"
        />
        
        <h1 className="text-3xl font-bold text-[#1E1E1E] mb-4">
          Application Submitted!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for applying to join A55ET5. We'll review your application and get back to you shortly.
        </p>
        
        <img 
          src="https://i.ibb.co/Mnp9Pfm/A55-ET5-Loge-Pastel.png"
          alt="A55ET5" 
          className="h-12 mx-auto object-contain"
        />
      </div>
    </div>
  )
}
