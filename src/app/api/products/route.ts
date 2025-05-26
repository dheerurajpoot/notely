import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils";
import { Product } from "@/models/product";

// get all products
export async function GET(request: NextRequest) {
	try {
		const user = await getCurrentUser(request);
		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}
		if (user.role === "admin") {
			const products = await Product.find();
			return NextResponse.json({
				success: true,
				products,
			});
		}
		const products = await Product.find({ sellerId: user._id });
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

// add a new product
export async function POST(request: NextRequest) {
	try {
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

export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}
