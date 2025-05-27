"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { makePayment, createRazorpayOrder } from "@/lib/razorpay";

interface PaymentButtonProps {
	product: any;
	user: any;
}

export function PaymentButton({ product, user }: PaymentButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handlePayment = async () => {
		try {
			setIsLoading(true);

			// Create Razorpay order
			const order = await createRazorpayOrder(product.price, product.id);

			// Configure Razorpay options
			const options = {
				key:
					process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
					"rzp_test_YourTestKeyId",
				amount: order.amount,
				currency: order.currency,
				name: "Notely",
				description: `Payment for ${product.title}`,
				image: "/logo.png",
				orderId: order.id,
				prefill: {
					name: user.name,
					email: user.email,
					contact: "",
				},
				notes: {
					productId: product.id,
				},
				theme: {
					color: "#0284c7",
				},
				handler: async (response: any) => {
					try {
						// Verify payment with backend
						const verifyResponse = await fetch(
							"/api/payment/verify",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									razorpay_order_id:
										response.razorpay_order_id,
									razorpay_payment_id:
										response.razorpay_payment_id,
									razorpay_signature:
										response.razorpay_signature,
									productId: product.id,
								}),
							}
						);

						const data = await verifyResponse.json();

						if (data.success) {
							// Redirect to success page
							router.push(
								`/dashboard/purchases?success=true&orderId=${data.order.id}`
							);
						} else {
							alert(
								"Payment verification failed. Please try again."
							);
						}
					} catch (error) {
						console.error("Error verifying payment:", error);
						alert(
							"An error occurred while verifying your payment. Please contact support."
						);
					}
				},
			};

			// Open Razorpay payment form
			await makePayment(options);
		} catch (error) {
			console.error("Payment error:", error);
			alert(
				"An error occurred while processing your payment. Please try again."
			);
		} finally {
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
