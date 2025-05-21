import Link from "next/link";
import {
	ArrowRight,
	BookOpen,
	DollarSign,
	FileText,
	Shield,
	Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SellPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold mb-4'>
						Start Selling Your Study Materials
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Turn your notes, assignments, and study materials into
						income while helping other students succeed.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 mb-16'>
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold'>
							Why Sell on Notely?
						</h2>
						<p className='text-muted-foreground'>
							Notely provides a secure platform for students to
							monetize their academic work and help peers succeed.
						</p>

						<ul className='space-y-4 mt-6'>
							<li className='flex items-start'>
								<div className='bg-sky-100 p-2 rounded-full mr-3'>
									<DollarSign className='h-5 w-5 text-sky-600' />
								</div>
								<div>
									<h3 className='font-semibold'>
										Earn Money
									</h3>
									<p className='text-sm text-muted-foreground'>
										Get paid for the hard work you&apos;ve
										already done. Set your own prices and
										earn up to 85% on each sale.
									</p>
								</div>
							</li>

							<li className='flex items-start'>
								<div className='bg-sky-100 p-2 rounded-full mr-3'>
									<Shield className='h-5 w-5 text-sky-600' />
								</div>
								<div>
									<h3 className='font-semibold'>
										Secure Platform
									</h3>
									<p className='text-sm text-muted-foreground'>
										Our platform protects your intellectual
										property and handles secure payments
										through Razorpay.
									</p>
								</div>
							</li>

							<li className='flex items-start'>
								<div className='bg-sky-100 p-2 rounded-full mr-3'>
									<BookOpen className='h-5 w-5 text-sky-600' />
								</div>
								<div>
									<h3 className='font-semibold'>
										Help Other Students
									</h3>
									<p className='text-sm text-muted-foreground'>
										Share your knowledge and help fellow
										students excel in their studies.
									</p>
								</div>
							</li>
						</ul>

						<div className='mt-8'>
							<Button
								asChild
								size='lg'
								className='bg-sky-600 hover:bg-sky-700'>
								<Link href='/dashboard/listings/new'>
									Start Selling Now
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>
					</div>

					<div className='relative'>
						<div className='absolute -top-8 -left-8 h-64 w-64 bg-sky-100 rounded-full blur-3xl opacity-70'></div>
						<div className='relative bg-white rounded-xl shadow-lg overflow-hidden'>
							<img
								src='/placeholder.svg?height=400&width=600'
								alt='Student selling notes'
								className='w-full h-auto'
							/>
						</div>
					</div>
				</div>

				<div className='mb-16'>
					<h2 className='text-2xl font-bold text-center mb-8'>
						How It Works
					</h2>

					<div className='grid md:grid-cols-3 gap-8'>
						<Card>
							<CardContent className='p-6 text-center'>
								<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Upload className='h-8 w-8 text-sky-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									1. Upload Your Materials
								</h3>
								<p className='text-muted-foreground'>
									Create a listing with your study materials,
									set a price, and add details about your
									content.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 text-center'>
								<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Shield className='h-8 w-8 text-sky-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									2. Get Approved
								</h3>
								<p className='text-muted-foreground'>
									Our team reviews your materials to ensure
									quality and compliance with our guidelines.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 text-center'>
								<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
									<DollarSign className='h-8 w-8 text-sky-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									3. Earn Money
								</h3>
								<p className='text-muted-foreground'>
									Get paid when students purchase your
									materials. Receive payouts through Razorpay.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className='bg-sky-50 rounded-xl p-8 mb-16'>
					<h2 className='text-2xl font-bold mb-6'>
						What Can You Sell?
					</h2>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Notes</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Assignments</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Past Papers</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Study Guides</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Lab Reports</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Research Papers</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Presentations</h3>
						</div>

						<div className='bg-white p-4 rounded-lg text-center'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-2' />
							<h3 className='font-semibold'>Flashcards</h3>
						</div>
					</div>
				</div>

				<div className='text-center'>
					<h2 className='text-2xl font-bold mb-4'>
						Ready to Start Earning?
					</h2>
					<p className='text-muted-foreground mb-6'>
						Join thousands of students who are already selling their
						study materials on Notely.
					</p>
					<Button
						asChild
						size='lg'
						className='bg-sky-600 hover:bg-sky-700'>
						<Link href='/dashboard/listings/new'>
							Create Your First Listing
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
