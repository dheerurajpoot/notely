"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductCategory } from "@/lib/models";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";
import axios from "axios";

export default function BrowsePage() {
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get(
		"category"
	) as ProductCategory | null;

	const [products, setProducts] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] =
		useState<ProductCategory | null>(initialCategory);

	const getProducts = async () => {
		const response = await axios.get("/api/products/browse");
		const data = await response.data.products;
		return data;
	};

	const getProductsByCategory = async (category: ProductCategory) => {
		const response = await axios.get(
			`/api/products/browse?category=${category}`
		);
		const data = await response.data.products;
		console.log(data);
		return data;
	};

	useEffect(() => {
		if (selectedCategory) {
			getProductsByCategory(selectedCategory).then((data) => {
				setProducts(data);
			});
		} else {
			getProducts().then((data) => {
				setProducts(data);
			});
		}
	}, [selectedCategory]);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!searchQuery.trim()) {
			if (selectedCategory) {
				getProductsByCategory(selectedCategory).then((data) => {
					setProducts(data);
				});
			} else {
				getProducts().then((data) => {
					setProducts(data);
				});
			}
			return;
		}

		const query = searchQuery.toLowerCase();
		getProducts().then((data) => {
			const filtered = data.filter(
				(product: any) =>
					product.title.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query) ||
					product.subject.toLowerCase().includes(query)
			);
			setProducts(filtered);
		});
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Browse Study Materials</h1>

			<div className='flex flex-col md:flex-row gap-8'>
				{/* Sidebar */}
				<div className='w-full md:w-64 space-y-6'>
					<div className='space-y-4'>
						<form onSubmit={handleSearch}>
							<div className='relative'>
								<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
								<Input
									type='search'
									placeholder='Search materials...'
									className='pl-8'
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
								/>
							</div>
							<Button type='submit' className='w-full mt-2'>
								Search
							</Button>
						</form>
					</div>

					<CategoryFilter onSelect={setSelectedCategory} />

					<div className='space-y-4'>
						<h3 className='font-semibold'>Price Range</h3>
						<div className='grid grid-cols-2 gap-2'>
							<Input placeholder='Min' type='number' min='0' />
							<Input placeholder='Max' type='number' min='0' />
						</div>
						<Button variant='outline' className='w-full'>
							Apply Filter
						</Button>
					</div>
				</div>

				{/* Main Content */}
				<div className='flex-1'>
					<div className='flex justify-between items-center mb-6'>
						<p className='text-muted-foreground'>
							Showing{" "}
							<span className='font-medium text-foreground'>
								{products.length}
							</span>{" "}
							results
						</p>
						<select className='border rounded-md px-3 py-1.5 text-sm'>
							<option value='newest'>Newest First</option>
							<option value='oldest'>Oldest First</option>
							<option value='price-low'>
								Price: Low to High
							</option>
							<option value='price-high'>
								Price: High to Low
							</option>
							<option value='rating'>Highest Rated</option>
						</select>
					</div>

					{products.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{products.map((product) => (
								<ProductCard
									key={product._id}
									product={product as any}
								/>
							))}
						</div>
					) : (
						<div className='text-center py-12'>
							<h3 className='text-lg font-medium'>
								No products found
							</h3>
							<p className='text-muted-foreground mt-2'>
								Try adjusting your search or filter criteria
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
