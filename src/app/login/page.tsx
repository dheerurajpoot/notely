"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";

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
import { login, getCurrentUser } from "@/lib/auth";

export default function LoginPage() {
	// If user is already logged in, redirect to dashboard
	const user = getCurrentUser();
	if (user) {
		redirect("/dashboard");
	}

	return (
		<div className='container flex h-screen w-screen flex-col items-center justify-center'>
			<Link
				href='/'
				className='inline-flex items-center justify-center rounded-lg text-lg font-medium text-sky-600 mb-8'>
				<BookOpen className='h-6 w-6 mr-2' />
				<span className='font-semibold'>Notely</span>
			</Link>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold'>Log in</CardTitle>
					<CardDescription>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<form
					action={async (formData) => {
						const result = await login(formData);
						if (result.success) {
							redirect("/dashboard");
						}
					}}>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='m@example.com'
								required
							/>
						</div>
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label htmlFor='password'>Password</Label>
								<Link
									href='/forgot-password'
									className='text-sm text-sky-600 hover:underline'>
									Forgot password?
								</Link>
							</div>
							<Input
								id='password'
								name='password'
								type='password'
								required
							/>
						</div>
					</CardContent>
					<CardFooter className='flex flex-col'>
						<Button
							type='submit'
							className='w-full bg-sky-600 hover:bg-sky-700'>
							Log in
						</Button>
						<p className='mt-4 text-center text-sm text-muted-foreground'>
							Don&apos;t have an account?{" "}
							<Link
								href='/signup'
								className='text-sky-600 hover:underline'>
								Sign up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
