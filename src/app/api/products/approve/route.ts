import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product";

export async function PUT(request: NextRequest) {
	const productId = request.nextUrl.searchParams.get("productId");
	if (!productId) {
		return NextResponse.json(
			{ message: "Product ID is required" },
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
	product.approved = true;
	await product.save();
	return NextResponse.json({ success: true, product });
}
