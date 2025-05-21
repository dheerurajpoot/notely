import type React from "react";
import { requireAuth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = requireAuth();

	return (
		<div className='flex'>
			<DashboardSidebar user={user} />
			<div className='flex-1 p-6'>{children}</div>
		</div>
	);
}
