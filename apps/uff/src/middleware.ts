import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/signin', '/signup', '/'];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const nextUrl = req.nextUrl.pathname;

  if (PUBLIC_ROUTES.includes(nextUrl) && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (!PUBLIC_ROUTES.includes(nextUrl) && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
