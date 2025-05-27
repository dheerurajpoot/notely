import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils";
import { Product } from "@/models/product";
import crypto from "crypto";
import { Order } from "@/models/order";
import { connectDb } from "@/lib/db";

export async function POST(request: NextRequest) {
	await connectDb();
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const data = await request.json();
	const {
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature,
		productId,
	} = data;

	if (
		!razorpay_order_id ||
		!razorpay_payment_id ||
		!razorpay_signature ||
		!productId
	) {
		return NextResponse.json(
			{ error: "All fields are required" },
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
		// In a real app, you would verify the payment signature
		const generated_signature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
			.update(razorpay_order_id + "|" + razorpay_payment_id)
			.digest("hex");

		if (generated_signature !== razorpay_signature) {
			return NextResponse.json(
				{ error: "Invalid payment signature" },
				{ status: 400 }
			);
		}

		// Calculate platform fee (10%)
		const amount = product.price;
		const platformFee = amount * 0.1;
		const sellerEarnings = amount - platformFee;

		// Create order in database
		const newOrder = {
			productId,
			buyerId: user.id,
			sellerId: product.sellerId,
			amount,
			platformFee,
			sellerEarnings,
			status: "pending",
			paymentId: razorpay_payment_id,
		};
		const order = await Order.create(newOrder);

		return NextResponse.json({ success: true, order });
	} catch (error) {
		console.error("Error verifying payment:", error);
		return NextResponse.json(
			{ error: "Failed to verify payment" },
			{ status: 500 }
		);
	}
}
