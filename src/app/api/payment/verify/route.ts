import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils";
import { Product } from "@/models/product";
import crypto from "crypto";
import { Order } from "@/models/order";
import { connectDb } from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const user = await getCurrentUser(request);

		if (!user) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const data = await request.json();

		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			productId,
		} = data;

		if (!razorpay_order_id) {
			return NextResponse.json(
				{ message: "razorpay_order_id is required" },
				{ status: 400 }
			);
		}

		if (!razorpay_payment_id) {
			return NextResponse.json(
				{ message: "razorpay_payment_id is required" },
				{ status: 400 }
			);
		}

		if (!razorpay_signature) {
			return NextResponse.json(
				{ message: "razorpay_signature is required" },
				{ status: 400 }
			);
		}

		if (!productId) {
			return NextResponse.json(
				{ message: "productId is required" },
				{ status: 400 }
			);
		}

		const product = await Product.findById(productId);

		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Verify payment signature
		const text = razorpay_order_id + "|" + razorpay_payment_id;
		const generated_signature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
			.update(text)
			.digest("hex");

		if (generated_signature !== razorpay_signature) {
			return NextResponse.json(
				{ message: "Invalid payment signature" },
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
			buyerId: user._id, // Fixed: using _id instead of id
			sellerId: product.sellerId,
			amount,
			platformFee,
			sellerEarnings,
			status: "pending",
			paymentId: razorpay_payment_id,
			orderId: razorpay_order_id,
		};

		const order = await Order.create(newOrder);

		return NextResponse.json({ success: true, order });
	} catch (error: any) {
		// Catch any errors in the main try block
		console.error("Unexpected error in payment verification:", {
			error,
		});
		return NextResponse.json(
			{
				message: "An unexpected error occurred",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
