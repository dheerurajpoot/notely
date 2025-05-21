"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<{
		success?: boolean;
		message?: string;
	} | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitResult(null);

		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setSubmitResult({
				success: true,
				message:
					"Thank you for your message! We'll get back to you soon.",
			});

			// Reset form
			setFormState({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			setSubmitResult({
				success: false,
				message: "An error occurred. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-5xl mx-auto'>
				<h1 className='text-4xl font-bold mb-6'>Contact Us</h1>
				<p className='text-lg text-muted-foreground mb-12'>
					Have questions or feedback? We&apos;d love to hear from you.
					Fill out the form below or reach out to us directly.
				</p>

				<div className='grid md:grid-cols-3 gap-8'>
					<div className='md:col-span-1 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Get in Touch</CardTitle>
								<CardDescription>
									Our team is here to help
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-start'>
									<Mail className='h-5 w-5 text-sky-600 mt-0.5 mr-3' />
									<div>
										<h3 className='font-medium'>Email</h3>
										<p className='text-sm text-muted-foreground'>
											support@notely.com
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<Phone className='h-5 w-5 text-sky-600 mt-0.5 mr-3' />
									<div>
										<h3 className='font-medium'>Phone</h3>
										<p className='text-sm text-muted-foreground'>
											+1 (555) 123-4567
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<MapPin className='h-5 w-5 text-sky-600 mt-0.5 mr-3' />
									<div>
										<h3 className='font-medium'>Address</h3>
										<p className='text-sm text-muted-foreground'>
											123 Education Street
											<br />
											San Francisco, CA 94103
											<br />
											United States
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Office Hours</CardTitle>
								<CardDescription>
									When you can reach us
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<div className='flex justify-between'>
										<span>Monday - Friday</span>
										<span>9:00 AM - 6:00 PM</span>
									</div>
									<div className='flex justify-between'>
										<span>Saturday</span>
										<span>10:00 AM - 4:00 PM</span>
									</div>
									<div className='flex justify-between'>
										<span>Sunday</span>
										<span>Closed</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='md:col-span-2'>
						<Card>
							<CardHeader>
								<CardTitle>Send Us a Message</CardTitle>
								<CardDescription>
									We&apos;ll get back to you as soon as
									possible
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={handleSubmit}
									className='space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label htmlFor='name'>
												Your Name
											</Label>
											<Input
												id='name'
												name='name'
												value={formState.name}
												onChange={handleChange}
												required
											/>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='email'>
												Email Address
											</Label>
											<Input
												id='email'
												name='email'
												type='email'
												value={formState.email}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='subject'>Subject</Label>
										<Input
											id='subject'
											name='subject'
											value={formState.subject}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='message'>Message</Label>
										<Textarea
											id='message'
											name='message'
											value={formState.message}
											onChange={handleChange}
											rows={6}
											required
										/>
									</div>

									{submitResult && (
										<div
											className={`p-3 rounded-md ${
												submitResult.success
													? "bg-green-50 text-green-700"
													: "bg-red-50 text-red-700"
											}`}>
											{submitResult.message}
										</div>
									)}

									<Button
										type='submit'
										className='bg-sky-600 hover:bg-sky-700'
										disabled={isSubmitting}>
										{isSubmitting ? (
											"Sending..."
										) : (
											<>
												<Send className='h-4 w-4 mr-2' />
												Send Message
											</>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className='mt-12'>
					<h2 className='text-2xl font-bold mb-6'>
						Frequently Asked Questions
					</h2>

					<div className='grid md:grid-cols-2 gap-6'>
						<div className='space-y-2'>
							<h3 className='font-semibold'>
								How do I sell my study materials?
							</h3>
							<p className='text-muted-foreground'>
								Sign up for an account, navigate to your
								dashboard, and click on &quot;Add New
								Listing&quot; to upload and sell your study
								materials.
							</p>
						</div>

						<div className='space-y-2'>
							<h3 className='font-semibold'>
								How do payments work?
							</h3>
							<p className='text-muted-foreground'>
								We use Razorpay for secure payments. Sellers
								receive payouts bi-weekly after a successful
								transaction.
							</p>
						</div>

						<div className='space-y-2'>
							<h3 className='font-semibold'>
								What types of materials can I sell?
							</h3>
							<p className='text-muted-foreground'>
								You can sell notes, assignments, previous year
								papers, lab files, research papers, and more.
							</p>
						</div>

						<div className='space-y-2'>
							<h3 className='font-semibold'>
								How do I report inappropriate content?
							</h3>
							<p className='text-muted-foreground'>
								Use the &quot;Report&quot; button on any product
								page or contact our support team directly.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
