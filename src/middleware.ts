import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Assumindo que sua função decrypt valida a assinatura E a expiração
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const token = request.cookies.get('token')?.value;

	const isProtectedRoute = pathname.startsWith('/app');
	let isValidToken = false;

	if (token) {
		const decryptedPayload = await decrypt(token);
		isValidToken = !!decryptedPayload;
	}

	if (!isValidToken) {
		if (isProtectedRoute) {
			const response = NextResponse.redirect(new URL('/', request.url));

			return response;
		}

		return NextResponse.next();
	}

	if (isValidToken) {
		if (!isProtectedRoute) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		return NextResponse.next();
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
