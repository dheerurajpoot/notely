"use client";

import { useState } from "react";
import { User } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { updateProfileAction, becomeSeller } from "@/lib/actions";
import { UserRole } from "@/lib/models";

export default function ProfilePage({ user }: { user: any }) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and profile information
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
						<CardDescription>
							Update your personal information and how others see
							you on the platform
						</CardDescription>
					</CardHeader>
					<form action={updateProfileAction}>
						<CardContent className='space-y-4'>
							<div className='flex items-center gap-4'>
								<div className='w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl font-semibold'>
									{user?.name?.charAt(0).toUpperCase()}
								</div>
								<div>
									<Button
										variant='outline'
										size='sm'
										type='button'
										disabled={true}>
										Change Avatar
									</Button>
									<p className='text-xs text-muted-foreground mt-1'>
										JPG, GIF or PNG. 1MB max.
									</p>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='name'>Full Name</Label>
								<Input
									id='name'
									name='name'
									defaultValue={user?.name}
									disabled={!isEditing}
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									defaultValue={user?.email}
									disabled={true}
								/>
								<p className='text-xs text-muted-foreground'>
									Your email cannot be changed
								</p>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='university'>University</Label>
								<Input
									id='university'
									name='university'
									defaultValue={user?.university || ""}
									disabled={!isEditing}
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='bio'>Bio</Label>
								<Textarea
									id='bio'
									name='bio'
									defaultValue={user?.bio || ""}
									disabled={!isEditing}
									rows={4}
								/>
							</div>
						</CardContent>
						<CardFooter className='flex justify-between'>
							{isEditing ? (
								<>
									<Button
										variant='outline'
										type='button'
										onClick={() => setIsEditing(false)}>
										Cancel
									</Button>
									<Button
										type='submit'
										className='bg-sky-600 hover:bg-sky-700'>
										Save Changes
									</Button>
								</>
							) : (
								<Button
									type='button'
									onClick={() => setIsEditing(true)}>
									Edit Profile
								</Button>
							)}
						</CardFooter>
					</form>
				</Card>

				<div className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle>Account Status</CardTitle>
							<CardDescription>
								Your current account status and role
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<User className='h-5 w-5 text-sky-600' />
									<span className='font-medium'>
										Account Type
									</span>
								</div>
								<div>
									<span className='px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium'>
										{user?.role}
									</span>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<User className='h-5 w-5 text-sky-600' />
									<span className='font-medium'>
										Member Since
									</span>
								</div>
								<div>
									<span className='text-sm'>
										{new Date(
											user?.createdAt
										).toLocaleDateString()}
									</span>
								</div>
							</div>
						</CardContent>
						{user?.role === UserRole.USER && (
							<CardFooter>
								<form action={becomeSeller} className='w-full'>
									<Button type='submit' className='w-full'>
										Become a Seller
									</Button>
								</form>
							</CardFooter>
						)}
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								Change your password to keep your account secure
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='current-password'>
									Current Password
								</Label>
								<Input id='current-password' type='password' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='new-password'>
									New Password
								</Label>
								<Input id='new-password' type='password' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='confirm-password'>
									Confirm New Password
								</Label>
								<Input id='confirm-password' type='password' />
							</div>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Update Password</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
