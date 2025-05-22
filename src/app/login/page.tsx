"use client";

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
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signIn, loading } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		const success = await signIn(email, password);
		if (success) {
			router.push("/dashboard");
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
					<CardTitle className='text-2xl font-bold'>Log in</CardTitle>
					<CardDescription>
						Enter your email and password to access your account
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
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
								required
							/>
						</div>
					</CardContent>
					<CardFooter className='mt-4 flex flex-col'>
						<Button
							type='submit'
							disabled={loading}
							className='w-full bg-sky-600 hover:bg-sky-700'>
							{loading ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : null}
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
