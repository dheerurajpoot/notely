import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes patterns
const authRoutes = ["/login", "/signup", "/forgot-password"];
const dashboardRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Get the authentication token from the cookies
	const authToken = request.cookies.get("token")?.value;
	const userRole = request.cookies.get("user_role")?.value;

	// Check if the user is authenticated
	const isAuthenticated = !!authToken;

	// Redirect authenticated users away from auth pages
	if (
		isAuthenticated &&
		authRoutes.some((route) => pathname.startsWith(route))
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Redirect unauthenticated users to login
	if (
		!isAuthenticated &&
		dashboardRoutes.some((route) => pathname.startsWith(route))
	) {
		return NextResponse.redirect(
			new URL(
				"/login?redirect=" + encodeURIComponent(pathname),
				request.url
			)
		);
	}

	// Protect admin routes
	if (adminRoutes.some((route) => pathname.startsWith(route))) {
		if (!isAuthenticated) {
			return NextResponse.redirect(
				new URL(
					"/login?redirect=" + encodeURIComponent(pathname),
					request.url
				)
			);
		}

		// Check if user has admin role
		if (userRole !== "ADMIN") {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	// Add security headers to all responses
	const response = NextResponse.next();

	// Security headers
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=()"
	);

	// Content Security Policy
	response.headers.set(
		"Content-Security-Policy",
		"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.razorpay.com;"
	);

	return response;
}

// Configure the middleware to run on specific paths
export const config = {
	matcher: [
		// Apply to all routes except static files, api routes, and _next
		"/((?!_next/static|_next/image|favicon.ico|api/|images/).*)",
	],
};
