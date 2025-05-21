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
import { signup, getCurrentUser } from "@/lib/auth";

export default function SignupPage() {
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
					<CardTitle className='text-2xl font-bold'>
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<form
					action={async (formData) => {
						const result = await signup(formData);
						if (result.success) {
							redirect("/dashboard");
						}
					}}>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								name='name'
								placeholder='John Doe'
								required
							/>
						</div>
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
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								name='password'
								type='password'
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
								placeholder='e.g. MIT'
							/>
						</div>
					</CardContent>
					<CardFooter className='flex flex-col'>
						<Button
							type='submit'
							className='w-full bg-sky-600 hover:bg-sky-700'>
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
