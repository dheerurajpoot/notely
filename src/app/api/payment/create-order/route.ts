import { getCurrentUser } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product";
import Razorpay from "razorpay";
import { connectDb } from "@/lib/db";

export async function POST(request: NextRequest) {
	await connectDb();
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const data = await request.json();
	const { amount, productId } = data;

	if (!amount || !productId) {
		return NextResponse.json(
			{ error: "Amount and product ID are required" },
			{ status: 400 }
		);
	}

	const product = await Product.findById(productId);

	if (!product) {
		return NextResponse.json(
			{ error: "Product not found" },
			{ status: 404 }
		);
	}

	try {
		// Validate Razorpay credentials
		if (
			!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
			!process.env.RAZORPAY_KEY_SECRET
		) {
			return NextResponse.json(
				{ error: "Payment service configuration error" },
				{ status: 500 }
			);
		}

		const razorpay = new Razorpay({
			key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_KEY_SECRET,
		});

		// Ensure amount is a valid number
		const amountInPaise = Math.round(amount * 100);
		if (isNaN(amountInPaise) || amountInPaise <= 0) {
			return NextResponse.json(
				{ error: "Invalid amount" },
				{ status: 400 }
			);
		}

		const orderData = {
			amount: amountInPaise,
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
			notes: {
				productId,
				buyerId: user._id,
			},
		};

		const order = await razorpay.orders.create(orderData);
		return NextResponse.json({ success: true, order });
	} catch (error: any) {
		console.error("Error creating Razorpay order:", {
			error: error,
			message: error.message,
			stack: error.stack,
		});
		return NextResponse.json(
			{
				error: "Failed to create payment order",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
