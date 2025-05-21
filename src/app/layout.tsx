import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notely - Student Marketplace for Study Materials",
	description:
		"Buy and sell high-quality study materials including notes, assignments, papers, and more.",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = getCurrentUser();

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<div className='flex min-h-screen flex-col'>
					<SiteHeader user={user} />
					<div className='flex-1'>{children}</div>
					<SiteFooter />
				</div>
			</body>
		</html>
	);
}
