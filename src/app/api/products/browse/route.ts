import { NextResponse } from "next/server";
import { Product } from "@/models/product";
import { connectDb } from "@/lib/db";

export async function GET() {
	try {
		await connectDb();

		const products = await Product.find({ approved: true }).lean().exec();

		return NextResponse.json({
			success: true,
			products,
		});
	} catch (error) {
		console.error("Error fetching products:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 }
		);
	}
}
