"use client";

import { useState, useEffect } from "react";
import { Edit, Search, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function AdminUsersPage() {
	const [allUsers, setAllUsers] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [loading, setLoading] = useState(true);

	// fetch users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("/api/users");
				setAllUsers(response.data.users);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching users:", error);
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const filteredUsers = allUsers.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesRole = roleFilter === "all" || user.role === roleFilter;

		return matchesSearch && matchesRole;
	});

	// handle delete user
	const handleDelete = async (userId: string) => {
		try {
			await axios.delete(`/api/users?id=${userId}`);
			setAllUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== userId)
			);
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					User Management
				</h1>
				<p className='text-muted-foreground'>
					Manage users and their roles
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Users</CardTitle>
					<CardDescription>
						View and manage all users on the platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col md:flex-row gap-4 mb-6'>
						<div className='relative flex-1'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								placeholder='Search users...'
								className='pl-8'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<select
							className='border rounded-md px-3 py-2'
							value={roleFilter}
							onChange={(e) => setRoleFilter(e.target.value)}>
							<option value='all'>All Roles</option>
							<option value='user'>User</option>
							<option value='seller'>Seller</option>
							<option value='admin'>Admin</option>
						</select>
					</div>

					<div className='rounded-md border'>
						<div className='grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50'>
							<div className='col-span-1'>#</div>
							<div className='col-span-3'>Name</div>
							<div className='col-span-3'>Email</div>
							<div className='col-span-2'>Role</div>
							<div className='col-span-2'>Joined</div>
							<div className='col-span-1'>Actions</div>
						</div>
						{filteredUsers.map((user, index) => (
							<div
								key={index}
								className='grid grid-cols-12 gap-4 p-4 border-b items-center'>
								<div className='col-span-1 text-muted-foreground'>
									{index + 1}
								</div>
								<div className='col-span-3 font-medium'>
									{user.name}
								</div>
								<div className='col-span-3 text-muted-foreground'>
									{user.email}
								</div>
								<div className='col-span-2'>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											user.role === "admin"
												? "bg-purple-100 text-purple-700"
												: user.role === "seller"
												? "bg-blue-100 text-blue-700"
												: "bg-gray-100 text-gray-700"
										}`}>
										{user.role}
									</span>
								</div>
								<div className='col-span-2 text-sm text-muted-foreground'>
									{new Date(
										user.createdAt
									).toLocaleDateString()}
								</div>
								<div className='col-span-1 flex items-center gap-2'>
									<Button variant='ghost' size='icon'>
										<Edit className='h-4 w-4' />
										<span className='sr-only'>Edit</span>
									</Button>
									<Button
										onClick={() => handleDelete(user._id)}
										variant='ghost'
										size='icon'>
										<Trash className='h-4 w-4' />
										<span className='sr-only'>Delete</span>
									</Button>
								</div>
							</div>
						))}

						{filteredUsers.length === 0 && (
							<div className='p-4 text-center text-muted-foreground'>
								No users found matching your criteria
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
