"use client";

import Link from "next/link";
import {
	User,
	LogOut,
	ShoppingCart,
	Home,
	FileText,
	BarChart,
	HelpCircle,
	MessageSquare,
	Settings,
	Wallet,
	Package,
	Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { UserRole } from "@/lib/models";

export function DashboardSidebar({ user }: { user: any }) {
	if (!user) {
		return null; // Don't render if user is not available
	}

	return (
		<div className='hidden md:flex flex-col w-64 border-r h-[calc(100vh-4rem)] sticky top-16'>
			<div className='p-4 border-b'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600'>
						{user?.name?.charAt(0).toUpperCase()}
					</div>
					<div>
						<p className='font-medium'>{user.name}</p>
						<p className='text-xs text-muted-foreground'>
							{user.role}
						</p>
					</div>
				</div>
			</div>
			<nav className='flex-1 p-4 space-y-2'>
				<Link
					href='/dashboard'
					className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
					<Home className='h-4 w-4 text-sky-600' />
					Dashboard
				</Link>
				<Link
					href='/dashboard/profile'
					className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
					<User className='h-4 w-4 text-sky-600' />
					Profile
				</Link>
				<Link
					href='/dashboard/purchases'
					className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
					<ShoppingCart className='h-4 w-4 text-sky-600' />
					My Purchases
				</Link>
				{(user.role === UserRole.SELLER ||
					user.role === UserRole.ADMIN) && (
					<>
						<div className='pt-2 pb-1'>
							<p className='px-3 text-xs font-medium text-muted-foreground'>
								SELLER
							</p>
						</div>
						<Link
							href='/dashboard/wallet'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<Wallet className='h-4 w-4 text-sky-600' />
							Wallet
						</Link>
						<Link
							href='/dashboard/listings'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<FileText className='h-4 w-4 text-sky-600' />
							My Listings
						</Link>
						<Link
							href='/dashboard/sales'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<BarChart className='h-4 w-4 text-sky-600' />
							Sales
						</Link>
						<Link
							href='/dashboard/orders'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<Package className='h-4 w-4 text-sky-600' />
							Orders to Fulfill
						</Link>
						<Link
							href='/dashboard/shipments'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<Truck className='h-4 w-4 text-sky-600' />
							Shipments
						</Link>
					</>
				)}
				{user.role === UserRole.ADMIN && (
					<>
						<div className='pt-2 pb-1'>
							<p className='px-3 text-xs font-medium text-muted-foreground'>
								ADMIN
							</p>
						</div>
						<Link
							href='/admin'
							className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
							<Settings className='h-4 w-4 text-sky-600' />
							Admin Panel
						</Link>
					</>
				)}
				<div className='pt-2 pb-1'>
					<p className='px-3 text-xs font-medium text-muted-foreground'>
						SUPPORT
					</p>
				</div>
				<Link
					href='/help'
					className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
					<HelpCircle className='h-4 w-4 text-sky-600' />
					Help Center
				</Link>
				<Link
					href='/contact'
					className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-50 text-sm font-medium'>
					<MessageSquare className='h-4 w-4 text-sky-600' />
					Contact Us
				</Link>
			</nav>
			<div className='p-4 border-t'>
				<form action={logout}>
					<Button variant='outline' className='w-full' size='sm'>
						<LogOut className='mr-2 h-4 w-4' />
						Log out
					</Button>
				</form>
			</div>
		</div>
	);
}
