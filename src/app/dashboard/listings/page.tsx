"use client";
import Link from "next/link";
import { Edit, FileText, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

export default function ListingsPage() {
	const { user } = useAuth();

	const listings: any[] = [];

	return (
		<div className='space-y-6'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						My Listings
					</h1>
					<p className='text-muted-foreground'>
						Manage your study material listings
					</p>
				</div>
				<Button asChild className='bg-sky-600 hover:bg-sky-700'>
					<Link href='/dashboard/listings/new'>
						<Plus className='h-4 w-4 mr-2' />
						Add New Listing
					</Link>
				</Button>
			</div>

			{listings.length > 0 ? (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{listings.map((product) => (
						<Card key={product.id}>
							<div className='aspect-video relative overflow-hidden'>
								<img
									src={
										product.previewImage ||
										"/placeholder.svg?height=200&width=300"
									}
									alt={product.title}
									className='object-cover w-full h-full'
								/>
								<div className='absolute top-2 right-2 flex gap-2'>
									<div className='bg-sky-600 text-white px-2 py-1 rounded-md text-xs font-medium'>
										${product.price.toFixed(2)}
									</div>
									{!product.approved && (
										<div className='bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium'>
											Pending
										</div>
									)}
								</div>
							</div>
							<CardContent className='p-4'>
								<div className='space-y-2'>
									<div className='flex items-center gap-2'>
										<div className='bg-sky-50 text-sky-700 px-2 py-1 rounded text-xs font-medium'>
											{product.category}
										</div>
										<div className='bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium'>
											{product.subject}
										</div>
									</div>
									<h3 className='font-semibold text-lg line-clamp-1'>
										{product.title}
									</h3>
									<p className='text-sm text-muted-foreground line-clamp-2'>
										{product.description}
									</p>

									<div className='flex items-center justify-between pt-2'>
										<div className='flex items-center gap-2'>
											<Button
												size='sm'
												variant='outline'
												asChild>
												<Link
													href={`/dashboard/listings/${product.id}/edit`}>
													<Edit className='h-3 w-3 mr-1' />
													Edit
												</Link>
											</Button>
											<Button
												size='sm'
												variant='destructive'>
												<Trash className='h-3 w-3 mr-1' />
												Delete
											</Button>
										</div>
										<div>
											{product.rating && (
												<div className='flex items-center text-sm'>
													<div className='flex'>
														{[1, 2, 3, 4, 5].map(
															(star) => (
																<svg
																	key={star}
																	className={`h-3 w-3 ${
																		star <=
																		Math.round(
																			product.rating ||
																				0
																		)
																			? "text-yellow-400 fill-yellow-400"
																			: "text-gray-300 fill-gray-300"
																	}`}
																	xmlns='http://www.w3.org/2000/svg'
																	viewBox='0 0 24 24'>
																	<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
																</svg>
															)
														)}
													</div>
													<span className='text-xs ml-1'>
														{product.rating}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardHeader>
						<CardTitle>No Listings Yet</CardTitle>
						<CardDescription>
							You haven&apos;t created any listings yet
						</CardDescription>
					</CardHeader>
					<CardContent className='flex flex-col items-center justify-center py-6'>
						<FileText className='h-16 w-16 text-muted-foreground mb-4' />
						<p className='text-center text-muted-foreground mb-4'>
							Start selling your study materials to help other
							students
						</p>
						<Button asChild className='bg-sky-600 hover:bg-sky-700'>
							<Link href='/dashboard/listings/new'>
								<Plus className='h-4 w-4 mr-2' />
								Create Your First Listing
							</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
