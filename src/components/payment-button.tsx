"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createRazorpayOrder } from "@/lib/razorpay";
import axios from "axios";

interface PaymentButtonProps {
	product: {
		_id: string;
		price: number;
		title: string;
	};
	user: {
		name: string;
		email: string;
	};
}

declare global {
	interface Window {
		Razorpay: any;
	}
}

export function PaymentButton({ product, user }: PaymentButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const handlePayment = async () => {
		try {
			setIsLoading(true);

			const order = await createRazorpayOrder(product.price, product._id);
			if (!order || !order.id) {
				throw new Error("Invalid order response from server");
			}

			if (!window.Razorpay) {
				throw new Error("Razorpay SDK not loaded");
			}

			const handleRazorpayResponse = async (response: any) => {
				if (
					!response.razorpay_payment_id ||
					!response.razorpay_order_id ||
					!response.razorpay_signature
				) {
					alert("Payment failed: Missing required parameters");
					setIsLoading(false);
					return;
				}

				try {
					const verifyResponse = await axios.post(
						"/api/payment/verify",
						{
							razorpay_order_id: response.razorpay_order_id,
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_signature: response.razorpay_signature,
							productId: product._id,
						}
					);

					const { data } = verifyResponse;

					if (data.success) {
						router.push(
							`/dashboard/purchases?success=true&orderId=${data.order._id}`
						);
					} else {
						alert("Payment verification failed. Please try again.");
					}
				} catch (error: any) {
					console.error("Error verifying payment:", error);
					alert(
						"An error occurred while verifying your payment. Please contact support."
					);
				} finally {
					setIsLoading(false);
				}
			};

			const rzp = new window.Razorpay({
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
				amount: order.amount,
				currency: order.currency,
				name: "Notely",
				description: `Payment for ${product.title}`,
				image: "/logo.png",
				order_id: order.id,
				prefill: {
					name: user.name,
					email: user.email,
					contact: "",
				},
				notes: {
					productId: product._id,
				},
				theme: {
					color: "#0284c7",
				},
				handler: handleRazorpayResponse,
			});

			rzp.open();
		} catch (error: any) {
			console.error("Payment error:", {
				error,
			});
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={handlePayment}
			disabled={isLoading}
			className='w-full mb-4 bg-sky-600 hover:bg-sky-700'>
			{isLoading ? "Processing..." : "Buy Now"}
		</Button>
	);
}
