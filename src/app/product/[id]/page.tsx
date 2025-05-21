"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowLeft,
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Download,
	FileText,
	Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewForm } from "@/components/review-form";
import { PaymentButton } from "@/components/payment-button";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default function ProductPage({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<any>(null);
	const [reviews, setReviews] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const user = getCurrentUser();

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				// Fetch product details
				const productResponse = await fetch(
					`/api/products?id=${params.id}`
				);

				if (!productResponse.ok) {
					throw new Error("Product not found");
				}

				const productData = await productResponse.json();

				// If product has no images array, create one with the preview image
				if (
					!productData.images ||
					!Array.isArray(productData.images) ||
					productData.images.length === 0
				) {
					productData.images = [
						productData.previewImage ||
							"/placeholder.svg?height=400&width=800",
					];
				}

				setProduct(productData);

				// Fetch reviews
				const reviewsResponse = await fetch(
					`/api/reviews?productId=${params.id}`
				);

				if (reviewsResponse.ok) {
					const reviewsData = await reviewsResponse.json();
					setReviews(reviewsData);
				}
			} catch (err: any) {
				setError(err.message || "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProductData();
	}, [params.id]);

	const handleReviewSubmitted = async () => {
		// Refresh reviews
		const reviewsResponse = await fetch(
			`/api/reviews?productId=${params.id}`
		);

		if (reviewsResponse.ok) {
			const reviewsData = await reviewsResponse.json();
			setReviews(reviewsData);
		}

		// Refresh product to get updated rating
		const productResponse = await fetch(`/api/products?id=${params.id}`);

		if (productResponse.ok) {
			const productData = await productResponse.json();
			setProduct(productData);
		}
	};

	const nextImage = () => {
		if (product && product.images) {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
			);
		}
	};

	const prevImage = () => {
		if (product && product.images) {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
			);
		}
	};

	const selectImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	if (isLoading) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center items-center h-64'>
					<p>Loading product details...</p>
				</div>
			</div>
		);
	}

	if (error || !product) {
		return notFound();
	}

	// Check if user has already reviewed this product
	const hasReviewed =
		user && reviews.some((review) => review.userId === user.id);

	// Check if user has purchased this product
	const hasPurchased = user && true; // In a real app, check if user has purchased the product

	return (
		<div className='container mx-auto px-4 py-8'>
			<Link
				href='/browse'
				className='inline-flex items-center text-sky-600 hover:text-sky-700 mb-6'>
				<ArrowLeft className='h-4 w-4 mr-2' />
				Back to Browse
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Product Image Gallery and Details */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='bg-white rounded-lg overflow-hidden shadow-sm'>
						{/* Main Image with Navigation */}
						<div className='relative'>
							<img
								src={
									product.images[currentImageIndex] ||
									"/placeholder.svg"
								}
								alt={`${product.title} - Image ${
									currentImageIndex + 1
								}`}
								className='w-full h-auto object-cover aspect-video'
							/>

							{product.images.length > 1 && (
								<>
									<Button
										variant='ghost'
										size='icon'
										className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full'
										onClick={prevImage}>
										<ChevronLeft className='h-5 w-5' />
										<span className='sr-only'>
											Previous image
										</span>
									</Button>
									<Button
										variant='ghost'
										size='icon'
										className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full'
										onClick={nextImage}>
										<ChevronRight className='h-5 w-5' />
										<span className='sr-only'>
											Next image
										</span>
									</Button>
								</>
							)}
						</div>

						{/* Thumbnails */}
						{product.images.length > 1 && (
							<div className='flex overflow-x-auto gap-2 p-2 bg-gray-50'>
								{product.images.map(
									(image: string, index: number) => (
										<button
											key={index}
											onClick={() => selectImage(index)}
											className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
												currentImageIndex === index
													? "border-sky-600"
													: "border-transparent hover:border-gray-300"
											}`}>
											<img
												src={
													image || "/placeholder.svg"
												}
												alt={`Thumbnail ${index + 1}`}
												className='w-full h-full object-cover'
											/>
										</button>
									)
								)}
							</div>
						)}
					</div>

					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<div className='flex items-center gap-2 mb-4'>
							<div className='bg-sky-50 text-sky-700 px-2 py-1 rounded text-xs font-medium'>
								{product.category}
							</div>
							<div className='bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium'>
								{product.subject}
							</div>
							{product.featured && (
								<div className='bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-medium'>
									Featured
								</div>
							)}
						</div>

						<h1 className='text-2xl font-bold mb-2'>
							{product.title}
						</h1>

						<div className='flex items-center gap-2 mb-4'>
							{product.rating && (
								<div className='flex items-center'>
									<div className='flex'>
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className={`h-4 w-4 ${
													star <=
													Math.round(product.rating)
														? "text-yellow-400 fill-yellow-400"
														: "text-gray-300 fill-gray-300"
												}`}
											/>
										))}
									</div>
									<span className='text-sm ml-1'>
										{product.rating} (
										{product.reviewCount || 0} reviews)
									</span>
								</div>
							)}

							<span className='text-sm text-muted-foreground'>
								{product.university &&
									`From ${product.university}`}
							</span>
						</div>

						<Tabs defaultValue='description'>
							<TabsList>
								<TabsTrigger value='description'>
									Description
								</TabsTrigger>
								<TabsTrigger value='reviews'>
									Reviews ({reviews.length})
								</TabsTrigger>
								<TabsTrigger value='seller'>
									Seller Info
								</TabsTrigger>
							</TabsList>
							<TabsContent value='description' className='pt-4'>
								<p className='text-muted-foreground'>
									{product.description}
								</p>

								<div className='mt-6 space-y-4'>
									<h3 className='font-semibold'>
										What&apos;s Included:
									</h3>
									<ul className='space-y-2'>
										<li className='flex items-start'>
											<FileText className='h-5 w-5 text-sky-600 mr-2 mt-0.5' />
											<span>
												Comprehensive study material in
												PDF format
											</span>
										</li>
										<li className='flex items-start'>
											<BookOpen className='h-5 w-5 text-sky-600 mr-2 mt-0.5' />
											<span>
												Practice questions and solutions
											</span>
										</li>
										<li className='flex items-start'>
											<Download className='h-5 w-5 text-sky-600 mr-2 mt-0.5' />
											<span>
												Instant download after purchase
											</span>
										</li>
									</ul>
								</div>
							</TabsContent>
							<TabsContent value='reviews' className='pt-4'>
								{reviews.length > 0 ? (
									<div className='space-y-4 mb-8'>
										{reviews.map((review) => (
											<div
												key={review.id}
												className='border-b pb-4'>
												<div className='flex items-center gap-2 mb-2'>
													<div className='flex'>
														{[1, 2, 3, 4, 5].map(
															(star) => (
																<Star
																	key={star}
																	className={`h-4 w-4 ${
																		star <=
																		review.rating
																			? "text-yellow-400 fill-yellow-400"
																			: "text-gray-300 fill-gray-300"
																	}`}
																/>
															)
														)}
													</div>
													<span className='text-sm font-medium'>
														User #
														{review.userId.slice(
															-4
														)}
													</span>
													<span className='text-xs text-muted-foreground'>
														{formatDate(
															review.createdAt
														)}
													</span>
												</div>
												{review.comment && (
													<p className='text-sm'>
														{review.comment}
													</p>
												)}
											</div>
										))}
									</div>
								) : (
									<p className='text-muted-foreground mb-8'>
										No reviews yet.
									</p>
								)}

								{user ? (
									hasPurchased && !hasReviewed ? (
										<div className='bg-gray-50 p-4 rounded-lg'>
											<h3 className='font-semibold mb-4'>
												Write a Review
											</h3>
											<ReviewForm
												productId={product.id}
												user={user}
												onReviewSubmitted={
													handleReviewSubmitted
												}
											/>
										</div>
									) : hasReviewed ? (
										<p className='text-sm text-muted-foreground'>
											You have already reviewed this
											product.
										</p>
									) : (
										<p className='text-sm text-muted-foreground'>
											Purchase this product to leave a
											review.
										</p>
									)
								) : (
									<p className='text-sm text-muted-foreground'>
										<Link
											href='/login'
											className='text-sky-600 hover:underline'>
											Log in
										</Link>{" "}
										to leave a review.
									</p>
								)}
							</TabsContent>
							<TabsContent value='seller' className='pt-4'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold'>
										{product.sellerId
											.charAt(0)
											.toUpperCase()}
									</div>
									<div>
										<p className='font-medium'>
											Seller #{product.sellerId}
										</p>
										<p className='text-sm text-muted-foreground'>
											{product.university ||
												"University not specified"}
										</p>
									</div>
								</div>
								<p className='text-sm text-muted-foreground'>
									This seller has been a member since{" "}
									{new Date().getFullYear() - 1} and has sold
									multiple study materials on Notely.
								</p>
							</TabsContent>
						</Tabs>
					</div>
				</div>

				{/* Purchase Card */}
				<div>
					<Card className='sticky top-20'>
						<CardContent className='p-6'>
							<div className='text-3xl font-bold mb-4'>
								${product.price.toFixed(2)}
							</div>

							{user ? (
								<PaymentButton product={product} user={user} />
							) : (
								<Button
									asChild
									className='w-full mb-4 bg-sky-600 hover:bg-sky-700'>
									<Link
										href={`/login?redirect=/product/${product.id}`}>
										Log in to Purchase
									</Link>
								</Button>
							)}

							<div className='text-sm text-muted-foreground space-y-4'>
								<div className='flex items-start'>
									<Download className='h-4 w-4 mr-2 mt-0.5' />
									<span>Instant digital download</span>
								</div>
								<div className='flex items-start'>
									<FileText className='h-4 w-4 mr-2 mt-0.5' />
									<span>
										PDF format (compatible with all devices)
									</span>
								</div>
								<div className='flex items-start'>
									<Star className='h-4 w-4 mr-2 mt-0.5' />
									<span>
										Satisfaction guaranteed or your money
										back
									</span>
								</div>
							</div>

							<div className='mt-6 pt-6 border-t'>
								<h3 className='font-semibold mb-2'>
									Have a question?
								</h3>
								<Button variant='outline' className='w-full'>
									Contact Seller
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
