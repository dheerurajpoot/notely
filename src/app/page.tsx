import Link from "next/link";
import {
	ArrowRight,
	BookOpen,
	CheckCircle,
	FileText,
	GraduationCap,
	Search,
	Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";

export default function Home() {
	const featuredProducts: any[] = [];

	return (
		<main className='flex-1'>
			{/* Hero Section */}
			<section className='bg-gradient-to-b from-sky-50 to-white py-16 md:py-24'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
						<div className='space-y-4'>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter'>
								Buy and Sell Study Materials with{" "}
								<span className='text-sky-600'>Notely</span>
							</h1>
							<p className='text-lg text-muted-foreground md:text-xl max-w-[600px]'>
								A student marketplace for handwritten notes,
								solved assignments, previous year papers, and
								more. Learn better, earn better.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button
									size='lg'
									className='bg-sky-600 hover:bg-sky-700'
									asChild>
									<Link href='/browse'>
										Get Started
										<ArrowRight className='ml-2 h-4 w-4' />
									</Link>
								</Button>
								<Button size='lg' variant='outline' asChild>
									<Link href='/how-it-works'>Learn More</Link>
								</Button>
							</div>
						</div>
						<div className='relative'>
							<div className='absolute -top-8 -left-8 h-72 w-72 bg-sky-100 rounded-full blur-3xl opacity-70'></div>
							<div className='absolute -bottom-8 -right-8 h-72 w-72 bg-sky-200 rounded-full blur-3xl opacity-70'></div>
							<div className='relative bg-white rounded-xl shadow-lg overflow-hidden'>
								<img
									src='/placeholder.svg?height=400&width=600'
									alt='Students using Notely'
									className='w-full h-auto'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Search Section */}
			<section className='container mx-auto py-12 px-4 md:px-6'>
				<div className='flex flex-col items-center space-y-4'>
					<h2 className='text-3xl font-bold text-center'>
						Find the study materials you need
					</h2>
					<p className='text-muted-foreground text-center max-w-2xl'>
						Search through thousands of high-quality notes,
						assignments, papers and more
					</p>
					<div className='flex w-full max-w-lg space-x-2'>
						<Input
							placeholder='Search for notes, assignments, papers...'
							className='flex-1'
						/>
						<Button asChild>
							<Link href='/browse'>
								<Search className='h-4 w-4 mr-2' />
								Search
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='bg-white py-12 border-y'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
						<div className='space-y-2'>
							<div className='text-4xl font-bold text-sky-600'>
								5,800+
							</div>
							<p className='text-sm text-muted-foreground'>
								Study Materials
							</p>
						</div>
						<div className='space-y-2'>
							<div className='text-4xl font-bold text-sky-600'>
								12,000+
							</div>
							<p className='text-sm text-muted-foreground'>
								Happy Students
							</p>
						</div>
						<div className='space-y-2'>
							<div className='text-4xl font-bold text-sky-600'>
								250+
							</div>
							<p className='text-sm text-muted-foreground'>
								Universities
							</p>
						</div>
						<div className='space-y-2'>
							<div className='text-4xl font-bold text-sky-600'>
								4.8/5
							</div>
							<p className='text-sm text-muted-foreground'>
								Average Rating
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className='bg-sky-50 py-12'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Browse by Category
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						<Link
							href='/browse?category=notes'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>
								Handwritten Notes
							</h3>
							<p className='text-sm text-muted-foreground'>
								1240+ items
							</p>
						</Link>
						<Link
							href='/browse?category=assignments'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<BookOpen className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>
								Solved Assignments
							</h3>
							<p className='text-sm text-muted-foreground'>
								856+ items
							</p>
						</Link>
						<Link
							href='/browse?category=papers'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>
								Previous Year Papers
							</h3>
							<p className='text-sm text-muted-foreground'>
								1432+ items
							</p>
						</Link>
						<Link
							href='/browse?category=lab_files'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>Lab Files</h3>
							<p className='text-sm text-muted-foreground'>
								678+ items
							</p>
						</Link>
						<Link
							href='/browse?category=research'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<GraduationCap className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>
								Research Papers
							</h3>
							<p className='text-sm text-muted-foreground'>
								342+ items
							</p>
						</Link>
						<Link
							href='/browse?category=projects'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>Projects</h3>
							<p className='text-sm text-muted-foreground'>
								523+ items
							</p>
						</Link>
						<Link
							href='/browse?category=source_code'
							className='bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow'>
							<FileText className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>Source Code</h3>
							<p className='text-sm text-muted-foreground'>
								789+ items
							</p>
						</Link>
						<Link
							href='/browse'
							className='bg-sky-50 border-2 border-sky-600 rounded-lg p-6 text-center hover:bg-sky-100 transition-colors'>
							<Search className='h-8 w-8 text-sky-600 mx-auto mb-4' />
							<h3 className='font-semibold mb-1'>
								All Categories
							</h3>
							<p className='text-sm text-muted-foreground'>
								5860+ items
							</p>
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Listings */}
			<section className='container mx-auto py-12 px-4 md:px-6'>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-3xl font-bold'>Featured Materials</h2>
					<Button variant='outline' asChild>
						<Link href='/browse'>View All</Link>
					</Button>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{featuredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product as any}
						/>
					))}
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='bg-sky-50 py-16'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-3xl font-bold mb-12 text-center'>
						What Our Users Say
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Testimonial 1 */}
						<Card className='bg-white'>
							<CardContent className='pt-6'>
								<div className='flex items-center gap-2 mb-4'>
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className='h-4 w-4 text-yellow-400 fill-yellow-400'
										/>
									))}
								</div>
								<p className='text-muted-foreground mb-6'>
									&quot;Notely helped me ace my finals! The
									notes I purchased were comprehensive and
									well-organized. I&apos;ve also started
									selling my own materials and earning some
									extra cash.&quot;
								</p>
								<div className='flex items-center gap-3'>
									<Avatar>
										<AvatarFallback>JD</AvatarFallback>
										<AvatarImage src='/placeholder.svg?height=40&width=40' />
									</Avatar>
									<div>
										<p className='font-medium'>
											Jessica D.
										</p>
										<p className='text-sm text-muted-foreground'>
											Computer Science Student
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Testimonial 2 */}
						<Card className='bg-white'>
							<CardContent className='pt-6'>
								<div className='flex items-center gap-2 mb-4'>
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className='h-4 w-4 text-yellow-400 fill-yellow-400'
										/>
									))}
								</div>
								<p className='text-muted-foreground mb-6'>
									&quot;As a teaching assistant, I recommend
									Notely to my students. The quality of
									materials is consistently high, and it helps
									students get different perspectives on
									complex topics.&quot;
								</p>
								<div className='flex items-center gap-3'>
									<Avatar>
										<AvatarFallback>MR</AvatarFallback>
										<AvatarImage src='/placeholder.svg?height=40&width=40' />
									</Avatar>
									<div>
										<p className='font-medium'>
											Michael R.
										</p>
										<p className='text-sm text-muted-foreground'>
											Teaching Assistant
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Testimonial 3 */}
						<Card className='bg-white'>
							<CardContent className='pt-6'>
								<div className='flex items-center gap-2 mb-4'>
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className='h-4 w-4 text-yellow-400 fill-yellow-400'
										/>
									))}
								</div>
								<p className='text-muted-foreground mb-6'>
									&quot;I&apos;ve been selling my notes on
									Notely for a year now and have made over
									$2,000! It&apos;s rewarding to know my study
									materials are helping others while providing
									me with income.&quot;
								</p>
								<div className='flex items-center gap-3'>
									<Avatar>
										<AvatarFallback>AT</AvatarFallback>
										<AvatarImage src='/placeholder.svg?height=40&width=40' />
									</Avatar>
									<div>
										<p className='font-medium'>Aisha T.</p>
										<p className='text-sm text-muted-foreground'>
											Engineering Student
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className='bg-white py-16'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-3xl font-bold mb-12 text-center'>
						How Notely Works
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-white p-6 rounded-lg shadow-sm text-center relative'>
							<div className='absolute -top-4 -left-4 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold'>
								1
							</div>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Search className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Find Materials
							</h3>
							<p className='text-muted-foreground'>
								Search through our vast collection of
								high-quality study materials from top students.
							</p>
						</div>
						<div className='bg-white p-6 rounded-lg shadow-sm text-center relative'>
							<div className='absolute -top-4 -left-4 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold'>
								2
							</div>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<FileText className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Purchase Securely
							</h3>
							<p className='text-muted-foreground'>
								Buy the materials you need with our secure
								payment system and instant downloads.
							</p>
						</div>
						<div className='bg-white p-6 rounded-lg shadow-sm text-center relative'>
							<div className='absolute -top-4 -left-4 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold'>
								3
							</div>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<GraduationCap className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Ace Your Studies
							</h3>
							<p className='text-muted-foreground'>
								Use the materials to improve your understanding
								and excel in your courses.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='bg-gradient-to-b from-white to-sky-50 py-16'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl font-bold mb-6'>
								Why Choose Notely?
							</h2>
							<div className='space-y-4'>
								<div className='flex gap-3'>
									<CheckCircle className='h-6 w-6 text-sky-600 flex-shrink-0' />
									<div>
										<h3 className='font-semibold'>
											Quality Assured
										</h3>
										<p className='text-muted-foreground'>
											All materials are reviewed for
											quality before being listed
										</p>
									</div>
								</div>
								<div className='flex gap-3'>
									<CheckCircle className='h-6 w-6 text-sky-600 flex-shrink-0' />
									<div>
										<h3 className='font-semibold'>
											Earn While You Learn
										</h3>
										<p className='text-muted-foreground'>
											Turn your study materials into
											income by selling to other students
										</p>
									</div>
								</div>
								<div className='flex gap-3'>
									<CheckCircle className='h-6 w-6 text-sky-600 flex-shrink-0' />
									<div>
										<h3 className='font-semibold'>
											Secure Payments
										</h3>
										<p className='text-muted-foreground'>
											Safe and secure payment processing
											for all transactions
										</p>
									</div>
								</div>
								<div className='flex gap-3'>
									<CheckCircle className='h-6 w-6 text-sky-600 flex-shrink-0' />
									<div>
										<h3 className='font-semibold'>
											Instant Access
										</h3>
										<p className='text-muted-foreground'>
											Download materials immediately after
											purchase
										</p>
									</div>
								</div>
								<div className='flex gap-3'>
									<CheckCircle className='h-6 w-6 text-sky-600 flex-shrink-0' />
									<div>
										<h3 className='font-semibold'>
											Community Support
										</h3>
										<p className='text-muted-foreground'>
											Join a community of students helping
											each other succeed
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='relative'>
							<div className='absolute -top-8 -left-8 h-64 w-64 bg-sky-100 rounded-full blur-3xl opacity-70'></div>
							<img
								src='/placeholder.svg?height=400&width=500'
								alt='Students collaborating'
								className='relative rounded-lg shadow-lg'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white py-16'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Frequently Asked Questions
					</h2>
					<div className='max-w-3xl mx-auto'>
						<Accordion type='single' collapsible className='w-full'>
							<AccordionItem value='item-1'>
								<AccordionTrigger>
									How do I sell my notes on Notely?
								</AccordionTrigger>
								<AccordionContent>
									To sell your notes, create an account, go to
									your dashboard, and click on &quot;Create
									New Listing&quot;. Upload your materials,
									set a price, add a description, and submit
									for review. Once approved, your materials
									will be available for purchase.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-2'>
								<AccordionTrigger>
									How much can I earn by selling my notes?
								</AccordionTrigger>
								<AccordionContent>
									Earnings vary based on the quality, demand,
									and pricing of your materials. Top sellers
									on Notely earn hundreds of dollars per
									month. You set your own prices, and Notely
									takes a small platform fee from each sale.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-3'>
								<AccordionTrigger>
									Are the materials on Notely verified for
									quality?
								</AccordionTrigger>
								<AccordionContent>
									Yes, all materials undergo a review process
									before being listed. We check for clarity,
									completeness, and accuracy. Additionally,
									our rating system helps maintain quality as
									buyers can leave reviews.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-4'>
								<AccordionTrigger>
									How do I receive payment for my sales?
								</AccordionTrigger>
								<AccordionContent>
									Payments are processed through our secure
									wallet system. You can request a payout to
									your bank account once your balance reaches
									the minimum threshold. Payouts are typically
									processed within 3-5 business days.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-5'>
								<AccordionTrigger>
									What if I&apos;m not satisfied with my
									purchase?
								</AccordionTrigger>
								<AccordionContent>
									We offer a satisfaction guarantee. If the
									materials don&apos;t match the description
									or are of poor quality, you can request a
									refund within 7 days of purchase. Our
									support team will review your request and
									process eligible refunds promptly.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='container mx-auto py-16 px-4 md:px-6'>
				<div className='bg-sky-600 rounded-xl p-8 md:p-12 text-white text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Ready to start earning or learning?
					</h2>
					<p className='text-sky-100 max-w-2xl mx-auto mb-8'>
						Join thousands of students who are already buying and
						selling study materials on Notely.
					</p>
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Button size='lg' variant='secondary' asChild>
							<Link href='/sell'>Start Selling</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='bg-transparent text-white border-white hover:bg-sky-700'
							asChild>
							<Link href='/browse'>Browse Materials</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Universities Section */}
			<section className='bg-gray-50 py-12'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-xl font-medium text-center mb-8 text-muted-foreground'>
						Trusted by students from over 250 universities worldwide
					</h2>
					<div className='flex flex-wrap justify-center items-center gap-8 opacity-70'>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 1
						</div>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 2
						</div>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 3
						</div>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 4
						</div>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 5
						</div>
						<div className='w-24 h-12 bg-gray-200 rounded flex items-center justify-center'>
							Uni 6
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
