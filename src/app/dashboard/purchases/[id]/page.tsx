"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "@/components/receipt";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface Props {
	params: Promise<{ id: string }>;
}

export default function PurchaseReceiptPage({ params }: Props) {
	const { id: orderId } = React.use(params);
	const [order, setOrder] = useState<any>(null);

	const getOrderById = async (id: string) => {
		try {
			const response = await axios.get(`/api/orders?id=${id}`);
			return response.data.order;
		} catch (error) {
			console.error("Error fetching order:", error);
			return null;
		}
	};

	useEffect(() => {
		const fetchOrder = async () => {
			const orderData = await getOrderById(orderId);
			if (orderData) {
				setOrder(orderData);
			}
		};
		fetchOrder();
	}, [orderId]);

	if (!order) {
		return (
			<div className='max-w-4xl mx-auto py-12'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold'>Order Not Found</h1>
					<p className='mt-2 text-muted-foreground'>
						The order you&apos;re looking for doesn&apos;t exist or
						you don&apos;t have access to it.
					</p>
					<Button
						asChild
						className='mt-6 bg-sky-600 hover:bg-sky-700'>
						<Link href='/dashboard/purchases'>
							Back to Purchases
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	// // Check if the user is the buyer
	// if (order.buyerId !== user?._id) {
	// 	return (
	// 		<div className='max-w-4xl mx-auto py-12'>
	// 			<div className='text-center'>
	// 				<h1 className='text-3xl font-bold'>Access Denied</h1>
	// 				<p className='mt-2 text-muted-foreground'>
	// 					You don&apos;t have permission to view this receipt.
	// 				</p>
	// 				<Button
	// 					asChild
	// 					className='mt-6 bg-sky-600 hover:bg-sky-700'>
	// 					<Link href='/dashboard/purchases'>
	// 						Back to Purchases
	// 					</Link>
	// 				</Button>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className='max-w-4xl mx-auto py-6'>
			<div className='flex items-center justify-between mb-6'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Receipt
					</h1>
					<p className='text-muted-foreground'>
						#{order._id.slice(0, 8)}
					</p>
				</div>
				<div className='flex gap-2'>
					<Button variant='outline' asChild>
						<Link href='/dashboard/purchases'>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Back to Purchases
						</Link>
					</Button>
					{/* <Button variant='outline'>
						<Download className='h-4 w-4 mr-2' />
						Download PDF
					</Button> */}
					{order.isPhysical && (
						<Button variant='outline'>
							<FileText className='h-4 w-4 mr-2' />
							View Shipping Status
						</Button>
					)}
				</div>
			</div>

			<Card>
				<CardContent className='p-6'>
					<Receipt order={order} />
				</CardContent>
			</Card>
		</div>
	);
}
