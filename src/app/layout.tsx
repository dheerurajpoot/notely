import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notely - Student Marketplace for Study Materials",
	description:
		"Buy and sell high-quality study materials including notes, assignments, papers, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<div className='flex min-h-screen flex-col'>
					<AuthProvider>
						<SiteHeader />
						<div className='flex-1'>{children}</div>
						<SiteFooter />
					</AuthProvider>
					<Toaster position='bottom-right' />
				</div>
			</body>
		</html>
	);
}
