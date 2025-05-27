import { NextResponse } from "next/server";
import { Order } from "@/models/order";
import { connectDb } from "@/lib/db";

export async function GET() {
	await connectDb();
	try {
		const orders = await Order.find();
		return NextResponse.json({ success: true, orders });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}
