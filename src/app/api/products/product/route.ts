import { type NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product";
import { getCurrentUser } from "@/lib/utils";
import { connectDb } from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const formData = await request.formData();
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const price = formData.get("price") as string;
		const category = formData.get("category") as string;
		const subject = formData.get("subject") as string;
		const university = formData.get("university") as string;
		const file = formData.get("file") as File;
		const preview = formData.get("preview") as File;

		if (!title || !description || !price || !category || !subject) {
			return NextResponse.json(
				{ error: "All required fields must be filled" },
				{ status: 400 }
			);
		}

		const user = await getCurrentUser(request);

		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// TODO: Upload files to storage service and get URLs
		// For now, we'll just store the file names
		const fileUrl = file ? file.name : null;
		const previewImage = preview ? preview.name : null;

		const newProduct = {
			title,
			description,
			price: Number(price),
			category,
			subject,
			university,
			sellerId: user._id,
			fileUrl,
			previewImage,
		};

		const product = await Product.create(newProduct);

		return NextResponse.json({
			success: true,
			product,
			message: "Product created successfully",
		});
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ error: "Failed to create product" },
			{ status: 500 }
		);
	}
}

// update a product
export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const formData = await request.formData();
		const productId = formData.get("productId") as string;
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const price = formData.get("price") as string;
		const category = formData.get("category") as string;
		const subject = formData.get("subject") as string;
		const university = formData.get("university") as string;
		const file = formData.get("file") as File;
		const preview = formData.get("preview") as File;

		if (
			!productId ||
			!title ||
			!description ||
			!price ||
			!category ||
			!subject
		) {
			return NextResponse.json(
				{ error: "All required fields must be filled" },
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

		product.title = title;
		product.description = description;
		product.price = Number(price);
		product.category = category;
		product.subject = subject;
		product.university = university;
		product.fileUrl = file ? file.name : null;
		product.previewImage = preview ? preview.name : null;

		await product.save();

		return NextResponse.json({
			success: true,
			product,
			message: "Product updated successfully",
		});
	} catch (error) {
		console.error("Error updating product:", error);
		return NextResponse.json(
			{ error: "Failed to update product" },
			{ status: 500 }
		);
	}
}

// delete a product
export async function DELETE(request: NextRequest) {
	try {
		await connectDb();
		const productId = request.nextUrl.searchParams.get("productId");

		if (!productId) {
			return NextResponse.json(
				{ error: "Product ID is required" },
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

		await product.remove();

		return NextResponse.json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting product:", error);
		return NextResponse.json(
			{ error: "Failed to delete product" },
			{ status: 500 }
		);
	}
}

// get a product
export async function GET(request: NextRequest) {
	try {
		await connectDb();
		const productId = request.nextUrl.searchParams.get("id");

		if (!productId) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 }
			);
		}

		const product = await Product.findById(productId).populate("sellerId");

		if (!product) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			product,
		});
	} catch (error) {
		console.error("Error fetching product:", error);
		return NextResponse.json(
			{ error: "Failed to fetch product" },
			{ status: 500 }
		);
	}
}
