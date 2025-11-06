import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const token = request.cookies.get('token')?.value;
	const isProtectedRoute = pathname.startsWith('/app');
	const isValidToken = await decrypt(token);

	if (!isValidToken) {
		if (isProtectedRoute) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	} else {
		if (!isProtectedRoute) {
			return NextResponse.redirect(
				new URL('/app/dashboard', request.url)
			);
		}
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
