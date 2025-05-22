"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface ApiResponse {
	message: string;
	success: boolean;
}

export default function ResetPasswordPage() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const tokenParam = searchParams.get("token");
		if (!tokenParam) {
			setError("Invalid or missing reset token");
			router.push("/forgot-password");
		} else {
			setToken(tokenParam);
		}
	}, [searchParams, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		if (password.trim() !== confirmPassword.trim()) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post("/api/auth/reset-password", {
				headers: {
					"Content-Type": "application/json",
				},
				data: { token, password: password.trim() },
			});

			const data: ApiResponse = await response.data;

			if (response.data.success) {
				toast.success(data.message || "Password reset successfully");
				router.push("/login");
			}
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
				<form onSubmit={handleSubmit}>
					<CardContent className='space-y-4'>
						{error && (
							<Alert variant='destructive'>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='Enter your password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>
								Confirm Password
							</Label>
							<Input
								id='confirmPassword'
								type='password'
								placeholder='Confirm your password'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
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
								"Reset Password"
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
			</Card>
		</div>
	);
}
