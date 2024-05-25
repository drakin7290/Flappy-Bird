import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
// This function can be marked `async` if using `await` inside

interface SessionDataIF {
  token?: string;
}

export async function middleware(request: any) {
  const session: JWT = await getToken({ req: request, secret: process.env.SECRET });
  const sessionData: SessionDataIF = session?.data;
  if (sessionData && !sessionData?.token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/groups', '/groups/:path*'],
};
