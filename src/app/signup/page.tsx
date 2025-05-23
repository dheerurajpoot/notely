"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const { signUp, loading } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!name || !email || !password || !confirmPassword) {
			setError("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const success = await signUp(name, email, password);
		if (success) {
			setTimeout(() => {
				router.push("/login");
			}, 3000);
		} else {
			setError("Failed to create account");
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
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your information to create an account
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
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								name='name'
								placeholder='John Doe'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								name='password'
								type='password'
								placeholder='Password'
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
								name='confirmPassword'
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								required
							/>
						</div>
					</CardContent>
					<CardFooter className='mt-5 flex flex-col'>
						<Button
							disabled={loading}
							type='submit'
							className='w-full bg-sky-600 hover:bg-sky-700'>
							{loading ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : null}
							Sign up
						</Button>
						<p className='mt-4 text-center text-sm text-muted-foreground'>
							Already have an account?{" "}
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
