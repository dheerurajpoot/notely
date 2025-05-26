import type React from "react";
import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// This will redirect if not an admin
	requireAdmin();

	return (
		<div className='flex'>
			<AdminSidebar />
			<div className='flex-1 p-6'>{children}</div>
		</div>
	);
}
