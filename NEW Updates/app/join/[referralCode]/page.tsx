// ... beginning of the file remains the same

return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Logos */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.ibb.co/Mnp9Pfm/A55-ET5-Loge-Pastel.png"
              alt="A55ET5" 
              className="h-16 object-contain"
            />
          </div>
          <img 
            src="https://i.ibb.co/CtDkWFF/A55-ET5-LOGO-Donkey.webp"
            alt="A55ET5 Mascot" 
            className="h-24 mx-auto object-contain"
          />
        </div>

        {/* Rest of the component remains the same */}
'zipCode'),
      referralCode: params.referralCode
    }

    try {
      const response = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        router.push('/join/success')
      }
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Logos */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/logo.png" 
              alt="A55ET5" 
              className="h-16"
            />
          </div>
          <img 
            src="/images/mascot.png" 
            alt="A55ET5 Mascot" 
            className="h-24 mx-auto"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#1E1E1E] mb-2">
            Join A55ET5
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Complete the form below to join our affiliate program
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC] 
                  transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
