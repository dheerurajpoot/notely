import Link from "next/link";
import { ArrowRight, Download, Search, Shield, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold mb-4'>
						How Notely Works
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Notely connects students who need study materials with
						those who create them. Learn how our platform works for
						both buyers and sellers.
					</p>
				</div>

				<div className='mb-16'>
					<h2 className='text-2xl font-bold mb-8'>
						For Students Looking to Buy
					</h2>

					<div className='grid md:grid-cols-3 gap-8'>
						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Search className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								1. Find Materials
							</h3>
							<p className='text-muted-foreground'>
								Browse our marketplace by subject, category, or
								university to find the study materials you need.
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Shield className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								2. Purchase Securely
							</h3>
							<p className='text-muted-foreground'>
								Buy materials with our secure Razorpay payment
								system. All transactions are protected.
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Download className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								3. Download Instantly
							</h3>
							<p className='text-muted-foreground'>
								Access your purchased materials immediately.
								Download and start studying right away.
							</p>
						</div>
					</div>

					<div className='mt-8 text-center'>
						<Button asChild className='bg-sky-600 hover:bg-sky-700'>
							<Link href='/browse'>
								Browse Materials
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>
				</div>

				<div className='mb-16'>
					<h2 className='text-2xl font-bold mb-8'>
						For Students Looking to Sell
					</h2>

					<div className='grid md:grid-cols-4 gap-6'>
						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='font-bold text-sky-600'>
									1
								</span>
							</div>
							<h3 className='font-semibold mb-2'>
								Create an Account
							</h3>
							<p className='text-sm text-muted-foreground'>
								Sign up and complete your profile with your
								university and academic details.
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='font-bold text-sky-600'>
									2
								</span>
							</div>
							<h3 className='font-semibold mb-2'>
								Upload Materials
							</h3>
							<p className='text-sm text-muted-foreground'>
								Create listings for your study materials with
								detailed descriptions and set your prices.
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='font-bold text-sky-600'>
									3
								</span>
							</div>
							<h3 className='font-semibold mb-2'>Get Approved</h3>
							<p className='text-sm text-muted-foreground'>
								Our team reviews your materials to ensure
								quality and compliance with our guidelines.
							</p>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm text-center'>
							<div className='bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='font-bold text-sky-600'>
									4
								</span>
							</div>
							<h3 className='font-semibold mb-2'>Earn Money</h3>
							<p className='text-sm text-muted-foreground'>
								Receive payments when students purchase your
								materials. Get paid via Razorpay.
							</p>
						</div>
					</div>

					<div className='mt-8 text-center'>
						<Button asChild className='bg-sky-600 hover:bg-sky-700'>
							<Link href='/sell'>
								Start Selling
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>
				</div>

				<div className='bg-sky-50 rounded-xl p-8 mb-16'>
					<h2 className='text-2xl font-bold mb-6 text-center'>
						Our Quality Assurance
					</h2>

					<div className='grid md:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-xl font-semibold mb-4'>
								For Buyers
							</h3>
							<ul className='space-y-4'>
								<li className='flex items-start'>
									<Star className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Verified Sellers
										</p>
										<p className='text-sm text-muted-foreground'>
											All sellers are verified students or
											academics with proven credentials.
										</p>
									</div>
								</li>

								<li className='flex items-start'>
									<Star className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Quality Reviews
										</p>
										<p className='text-sm text-muted-foreground'>
											Read reviews from other students who
											have purchased the materials.
										</p>
									</div>
								</li>

								<li className='flex items-start'>
									<Star className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Money-Back Guarantee
										</p>
										<p className='text-sm text-muted-foreground'>
											If the materials don&apos;t meet
											your expectations, we offer a 7-day
											money-back guarantee.
										</p>
									</div>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold mb-4'>
								For Sellers
							</h3>
							<ul className='space-y-4'>
								<li className='flex items-start'>
									<Shield className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Intellectual Property Protection
										</p>
										<p className='text-sm text-muted-foreground'>
											We protect your intellectual
											property and prevent unauthorized
											sharing.
										</p>
									</div>
								</li>

								<li className='flex items-start'>
									<Shield className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Secure Payments
										</p>
										<p className='text-sm text-muted-foreground'>
											Receive payments securely through
											our Razorpay integration.
										</p>
									</div>
								</li>

								<li className='flex items-start'>
									<Shield className='h-5 w-5 text-sky-600 mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>
											Seller Support
										</p>
										<p className='text-sm text-muted-foreground'>
											Get help with creating listings,
											pricing, and optimizing your
											materials.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='mb-16'>
					<h2 className='text-2xl font-bold mb-8 text-center'>
						Frequently Asked Questions
					</h2>

					<div className='grid md:grid-cols-2 gap-x-12 gap-y-8'>
						<div>
							<h3 className='font-semibold mb-2'>
								How do I know the materials are good quality?
							</h3>
							<p className='text-muted-foreground'>
								All materials are reviewed by our team before
								being listed. You can also check ratings and
								reviews from other students.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>
								How much can I earn as a seller?
							</h3>
							<p className='text-muted-foreground'>
								Sellers keep 85% of the sale price. You set your
								own prices based on the value of your materials.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>
								What file formats are supported?
							</h3>
							<p className='text-muted-foreground'>
								We support PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX,
								and ZIP files. All files are scanned for
								viruses.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>
								How long does the review process take?
							</h3>
							<p className='text-muted-foreground'>
								Most materials are reviewed within 24-48 hours.
								You&apos;ll receive an email when your listing
								is approved.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>
								Can I request specific materials?
							</h3>
							<p className='text-muted-foreground'>
								Yes! You can post requests for specific
								materials in our &quot;Requests&quot; section.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>
								How do refunds work?
							</h3>
							<p className='text-muted-foreground'>
								If you&apos;re not satisfied with your purchase,
								you can request a refund within 7 days. Each
								case is reviewed individually.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-sky-600 rounded-xl p-8 text-white text-center'>
					<h2 className='text-3xl font-bold mb-4'>
						Ready to Get Started?
					</h2>
					<p className='text-sky-100 max-w-2xl mx-auto mb-8'>
						Join thousands of students who are already buying and
						selling study materials on Notely.
					</p>
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Button size='lg' variant='secondary' asChild>
							<Link href='/browse'>Browse Materials</Link>
						</Button>
						<Button size='lg' variant='secondary' asChild>
							<Link href='/sell'>Start Selling</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
