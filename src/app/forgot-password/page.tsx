"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Loader2 } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ApiResponse {
	message: string;
	success: boolean;
}

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data: ApiResponse = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Something went wrong");
			}

			setIsSubmitted(true);
			setEmail("");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unexpected error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container mx-auto flex h-screen w-screen flex-col items-center justify-center'>
			<Link
				href='/'
				className='inline-flex items-center justify-center rounded-lg text-lg font-medium text-sky-600 mb-8'>
				<BookOpen className='h-6 w-6 mr-2' />
				<span className='font-semibold'>Notely</span>
			</Link>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold'>
						Reset password
					</CardTitle>
					<CardDescription>
						Enter your email address and we&apos;ll send you a link
						to reset your password
					</CardDescription>
				</CardHeader>
				{isSubmitted ? (
					<CardContent className='space-y-4'>
						<Alert className='bg-green-50 text-green-800 border-green-200'>
							<AlertDescription>
								If an account exists with the email{" "}
								<strong>{email}</strong>, you will receive a
								password reset link shortly.
							</AlertDescription>
						</Alert>
						<div className='text-center'>
							<Link
								href='/login'
								className='text-sky-600 hover:underline'>
								Return to login
							</Link>
						</div>
					</CardContent>
				) : (
					<form onSubmit={handleSubmit}>
						<CardContent className='space-y-4'>
							{error && (
								<Alert variant='destructive'>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</CardContent>
						<CardFooter className='mt-4 flex flex-col'>
							<Button
								type='submit'
								className='w-full bg-sky-600 hover:bg-sky-700'
								disabled={isLoading}>
								{isLoading ? (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								) : (
									"Send reset link"
								)}
							</Button>
							<p className='mt-4 text-center text-sm text-muted-foreground'>
								Remember your password?{" "}
								<Link
									href='/login'
									className='text-sky-600 hover:underline'>
									Log in
								</Link>
							</p>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
}
