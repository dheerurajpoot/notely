"use client";
import Link from "next/link";
import { FileText, ShoppingCart, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/stats-card";
import { useAuth } from "@/context/auth-context";
// import axios from "axios";

export default function DashboardPage() {
	const { user } = useAuth();

	const purchases: any[] = [];
	const products: any[] = [];

	return (
		<div className='space-y-6'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Dashboard
					</h1>
					<p className='text-muted-foreground'>
						Welcome back, {user?.name}!
					</p>
				</div>
				<Button asChild className='bg-sky-600 hover:bg-sky-700'>
					<Link href='/dashboard/listings/new'>Add New Listing</Link>
				</Button>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<StatsCard
					title='Total Purchases'
					value={purchases.length}
					icon={
						<ShoppingCart className='h-4 w-4 text-muted-foreground' />
					}
				/>
				<>
					<StatsCard
						title='Active Listings'
						value={products.length}
						icon={
							<FileText className='h-4 w-4 text-muted-foreground' />
						}
					/>
					<StatsCard
						title='Total Sales'
						value='$128.50'
						icon={
							<TrendingUp className='h-4 w-4 text-muted-foreground' />
						}
						change={{ value: 12, positive: true }}
					/>
					<StatsCard
						title='Total Customers'
						value='24'
						icon={
							<Users className='h-4 w-4 text-muted-foreground' />
						}
					/>
				</>
			</div>

			<Tabs defaultValue='recent'>
				<TabsList>
					<TabsTrigger value='recent'>Recent Activity</TabsTrigger>
					<TabsTrigger value='analytics'>Analytics</TabsTrigger>
				</TabsList>
				<TabsContent value='recent' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Recent Purchases</CardTitle>
							<CardDescription>
								Your most recent purchases on Notely
							</CardDescription>
						</CardHeader>
						<CardContent>
							{purchases.length > 0 ? (
								<div className='space-y-4'>
									{purchases.map((order) => (
										<div
											key={order.id}
											className='flex items-center justify-between border-b pb-4'>
											<div>
												<p className='font-medium'>
													Product #{order.productId}
												</p>
												<p className='text-sm text-muted-foreground'>
													Purchased on{" "}
													{new Date(
														order.createdAt
													).toLocaleDateString()}
												</p>
											</div>
											<div className='text-right'>
												<p className='font-medium'>
													${order.amount.toFixed(2)}
												</p>
												<p className='text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 inline-block'>
													{order.status}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className='text-muted-foreground'>
									You haven&apos;t made any purchases yet.
								</p>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>
								Your most recent sales on Notely
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-muted-foreground'>
								No recent sales to display.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='analytics'>
					<Card>
						<CardHeader>
							<CardTitle>Sales Analytics</CardTitle>
							<CardDescription>
								Your sales performance over time
							</CardDescription>
						</CardHeader>
						<CardContent className='h-80'>
							<div className='h-full w-full flex items-center justify-center bg-muted/20 rounded-md'>
								<p className='text-muted-foreground'>
									Sales chart will appear here
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
