import { getCurrentUser } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Order } from "@/models/order";

export async function GET(request: NextRequest) {
	await connectDb();
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized" },
			{ status: 401 }
		);
	}

	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (id) {
		const order = await Order.findById(id)
			.populate("buyerId")
			.populate("sellerId")
			.populate("productId");

		if (!order) {
			return NextResponse.json(
				{ success: false, message: "Order not found" },
				{ status: 404 }
			);
		}

		// Check if user is authorized to view this order
		if (order.buyerId !== user._id && order.sellerId !== user._id) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 403 }
			);
		}

		return NextResponse.json({ success: true, order });
	}
	// Default to showing both buying and selling orders
	const buyingOrders = await Order.find({ buyerId: user._id });
	const sellingOrders = await Order.find({ sellerId: user._id });
	return NextResponse.json({
		success: true,
		orders: [...buyingOrders, ...sellingOrders],
	});
}

export async function POST(request: NextRequest) {
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized" },
			{ status: 401 }
		);
	}

	const data = await request.json();
	const { productId, sellerId, amount, paymentId } = data;

	if (!productId || !sellerId || !amount) {
		return NextResponse.json(
			{ success: false, message: "All required fields must be filled" },
			{ status: 400 }
		);
	}

	const newOrder = new Order({
		productId,
		buyerId: user._id,
		sellerId,
		amount: Number(amount),
		status: "pending",
		paymentId,
	});

	return NextResponse.json({ success: true, order: newOrder });
}

export async function PUT(request: NextRequest) {
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized" },
			{ status: 401 }
		);
	}

	const data = await request.json();
	const { id, status } = data;

	if (!id || !status) {
		return NextResponse.json(
			{ success: false, message: "Order ID and status are required" },
			{ status: 400 }
		);
	}

	const order = await Order.findById(id);

	if (!order) {
		return NextResponse.json(
			{ success: false, message: "Order not found" },
			{ status: 404 }
		);
	}

	// Only admin or seller can update order status
	if (order.sellerId !== user._id && user.role !== "admin") {
		return NextResponse.json(
			{ success: false, message: "Unauthorized" },
			{ status: 403 }
		);
	}

	const updatedOrder = await Order.findByIdAndUpdate(id, {
		status,
		updatedAt: new Date(),
	});

	return NextResponse.json({ success: true, order: updatedOrder });
}
