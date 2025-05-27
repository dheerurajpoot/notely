import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils";
import { Product } from "@/models/product";
import { connectDb } from "@/lib/db";

// get all products
export async function GET(request: NextRequest) {
	try {
		await connectDb();

		const user = await getCurrentUser(request);
		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const query = user.role === "admin" ? {} : { sellerId: user._id };
		const products = await Product.find(query).lean().exec();

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
