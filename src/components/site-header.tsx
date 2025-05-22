"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Menu, User, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";

export function SiteHeader() {
	const { user, signOut } = useAuth();
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between'>
				<div className='flex items-center gap-12'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='md:hidden'>
								<Menu className='h-5 w-5' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									href='/'
									className='flex items-center gap-2 text-lg font-semibold'>
									<BookOpen className='h-5 w-5 text-sky-600' />
									<span>Notely</span>
								</Link>
								<Link
									href='/browse'
									className='hover:text-sky-600 transition-colors'>
									Browse
								</Link>
								<Link
									href='/sell'
									className='hover:text-sky-600 transition-colors'>
									Sell
								</Link>
								<Link
									href='/how-it-works'
									className='hover:text-sky-600 transition-colors'>
									How It Works
								</Link>
								<Link
									href='/about'
									className='hover:text-sky-600 transition-colors'>
									About
								</Link>
								<Link
									href='/contact'
									className='hover:text-sky-600 transition-colors'>
									Contact
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Link
						href='/'
						className='flex items-center gap-2 text-lg font-semibold'>
						<BookOpen className='h-6 w-6 text-sky-600' />
						<span>Notely</span>
					</Link>
					<nav className='hidden md:flex items-center gap-6 text-sm'>
						<Link
							href='/browse'
							className='font-medium hover:text-sky-600 transition-colors'>
							Browse
						</Link>
						<Link
							href='/sell'
							className='font-medium hover:text-sky-600 transition-colors'>
							Sell
						</Link>
						<Link
							href='/how-it-works'
							className='font-medium hover:text-sky-600 transition-colors'>
							How It Works
						</Link>
						<Link
							href='/about'
							className='font-medium hover:text-sky-600 transition-colors'>
							About
						</Link>
						<Link
							href='/contact'
							className='font-medium hover:text-sky-600 transition-colors'>
							Contact
						</Link>
					</nav>
				</div>
				<div className='flex items-center gap-2'>
					{user ? (
						<>
							<Button
								variant='ghost'
								size='icon'
								className='relative'>
								<Bell className='h-5 w-5' />
								<span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-sky-600'></span>
								<span className='sr-only'>Notifications</span>
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										className='rounded-full'>
										<User className='h-5 w-5' />
										<span className='sr-only'>
											User menu
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href='/dashboard'>Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/dashboard/profile'>
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/dashboard/purchases'>
											My Purchases
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/dashboard/listings'>
											My Listings
										</Link>
									</DropdownMenuItem>
									{user.role === "admin" && (
										<DropdownMenuItem asChild>
											<Link href='/admin'>
												Admin Panel
											</Link>
										</DropdownMenuItem>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<form action={signOut}>
											<button className='w-full text-left flex items-center'>
												<LogOut className='mr-2 h-4 w-4' />
												Log out
											</button>
										</form>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<>
							<Button
								variant='ghost'
								asChild
								className='hidden md:inline-flex'>
								<Link href='/login'>Log in</Link>
							</Button>
							<Button
								asChild
								className='hidden md:inline-flex bg-sky-600 hover:bg-sky-700'>
								<Link href='/signup'>Sign up</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
