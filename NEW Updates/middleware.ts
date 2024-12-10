import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle referral links (/ref/[affiliateId])
  if (pathname.startsWith('/ref/')) {
    const affiliateId = pathname.split('/')[2]
    const response = NextResponse.redirect(new URL('/', request.url))
    
    // Set referral cookie (24 hour expiry)
    response.cookies.set('referralId', affiliateId, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/ref/:path*'
}
