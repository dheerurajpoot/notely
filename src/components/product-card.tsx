import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCard({ product }: any) {
	return (
		<Card className='overflow-hidden transition-all hover:shadow-md'>
			<div className='aspect-video relative overflow-hidden'>
				<img
					src={
						product.previewImage ||
						"/placeholder.svg?height=200&width=300"
					}
					alt={product.title}
					className='object-cover w-full h-full transition-transform hover:scale-105'
				/>
				<div className='absolute top-2 right-2 flex gap-2'>
					<div className='bg-sky-600 text-white px-2 py-1 rounded-md text-xs font-medium'>
						₹{product.price.toFixed(2)}
					</div>
					{product.featured && (
						<div className='bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium'>
							Featured
						</div>
					)}
				</div>
			</div>
			<CardContent className='p-4'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<Badge variant='outline' className='bg-sky-50'>
							{product.category}
						</Badge>
						<Badge variant='outline' className='bg-gray-50'>
							{product.subject}
						</Badge>
					</div>
					<h3 className='font-semibold text-lg line-clamp-2'>
						{product.title}
					</h3>
					<p className='text-sm text-muted-foreground line-clamp-2'>
						{product.description}
					</p>
					<div className='flex items-center text-sm text-muted-foreground'>
						<span>By {product.sellerName || "Unknown Seller"}</span>
						{product.university && (
							<>
								<span className='mx-2'>•</span>
								<span>{product.university}</span>
							</>
						)}
					</div>
				</div>
			</CardContent>
			<CardFooter className='p-4 pt-0 flex justify-between items-center'>
				{product.rating ? (
					<div className='flex items-center'>
						<div className='flex'>
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={`h-4 w-4 ${
										star <= Math.round(product?.rating || 0)
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300 fill-gray-300"
									}`}
								/>
							))}
						</div>
						<span className='font-medium ml-1'>
							{product.rating || 0}
						</span>
						<span className='text-muted-foreground text-sm ml-1'>
							({product.reviewCount || 0})
						</span>
					</div>
				) : (
					<div className='text-sm text-muted-foreground'>
						No ratings yet
					</div>
				)}
				<Button size='sm' asChild>
					<Link href={`/product/${product._id}`}>View Details</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
