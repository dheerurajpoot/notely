"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

enum ProductCategory {
	NOTES = "notes",
	ASSIGNMENTS = "assignments",
	PAPERS = "papers",
	LAB_FILES = "lab_files",
	RESEARCH = "research",
	PROJECTS = "projects",
	SOURCE_CODE = "source_code",
	BOOKS = "books",
	OTHER = "other",
}

export default function NewListingPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const formData = new FormData(e.currentTarget);
			const result = await axios.post("/api/products/product", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (result.data.success) {
				toast.success(
					result.data.message || "Listing created successfully"
				);
				router.push("/dashboard/listings");
				return;
			}

			toast.error(result.data.error || "Failed to create listing");
		} catch (error: any) {
			console.error("Error creating listing:", error);
			toast.error(
				error.response?.data?.error ||
					"An error occurred while creating the listing"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-2'>
				<Button variant='ghost' size='sm' onClick={() => router.back()}>
					<ArrowLeft className='h-4 w-4 mr-1' />
					Back
				</Button>
				<h1 className='text-3xl font-bold tracking-tight'>
					Create New Listing
				</h1>
			</div>

			<Card>
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle>Listing Details</CardTitle>
						<CardDescription>
							Provide information about your study material
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								name='title'
								placeholder='e.g. Complete Calculus II Notes'
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								name='description'
								placeholder='Describe your study material in detail...'
								rows={5}
								required
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='category'>Category</Label>
								<Select name='category' required>
									<SelectTrigger id='category'>
										<SelectValue placeholder='Select a category' />
									</SelectTrigger>
									<SelectContent>
										{Object.values(ProductCategory).map(
											(category) => (
												<SelectItem
													key={category}
													value={category}>
													{category.replace("_", " ")}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='subject'>Subject</Label>
								<Input
									id='subject'
									name='subject'
									placeholder='e.g. Mathematics, Computer Science'
									required
								/>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='price'>Price ($)</Label>
								<Input
									id='price'
									name='price'
									type='number'
									min='0.99'
									step='0.01'
									placeholder='9.99'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='university'>
									University (Optional)
								</Label>
								<Input
									id='university'
									name='university'
									placeholder='e.g. MIT, Stanford'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='file'>Upload File</Label>
							<Input
								id='file'
								name='file'
								type='file'
								accept='.pdf,.doc,.docx,.ppt,.pptx,.zip'
							/>
							<p className='text-xs text-muted-foreground'>
								Accepted formats: PDF, DOC, DOCX, PPT, PPTX, ZIP
								(Max 50MB)
							</p>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='preview'>
								Preview Image (Optional)
							</Label>
							<Input
								id='preview'
								name='preview'
								type='file'
								accept='image/*'
							/>
							<p className='text-xs text-muted-foreground'>
								This image will be displayed as the preview for
								your listing (Max 5MB)
							</p>
						</div>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button
							variant='outline'
							type='button'
							onClick={() => router.back()}>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-sky-600 hover:bg-sky-700'
							disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Listing"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
