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
		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_KEY_SECRET,
		});

		const order = await razorpay.orders.create({
			amount: amount * 100,
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
			notes: {
				productId,
				buyerId: user._id,
			},
		});

		return NextResponse.json({ success: true, order });
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		return NextResponse.json(
			{ error: "Failed to create payment order" },
			{ status: 500 }
		);
	}
}
