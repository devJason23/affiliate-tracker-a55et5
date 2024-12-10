import { useState, useEffect } from 'react'

// This is a mock implementation. Replace with actual Auth0 integration later.
interface User {
  sub: string
  referralCode: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock authentication
    setTimeout(() => {
      setUser({
        sub: 'mock-user-id',
        referralCode: 'MOCK123'
      })
      setLoading(false)
    }, 1000)
  }, [])

  return { user, loading }
}
