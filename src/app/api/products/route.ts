import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { Product } from "@/models/product";

const getCurrentUser = async (req: NextRequest) => {
	const token = req.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({
			success: false,
			message: "No token found",
		});
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
		userId: string;
	};
	const user = await User.findById(decoded.userId).select("-password");
	if (!user) {
		return NextResponse.json({
			success: false,
			message: "User not found",
		});
	}

	return user;
};

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	return NextResponse.json({ id });
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const { title, description, price, category, subject, university } = data;

	if (!title || !description || isNaN(price) || !category || !subject) {
		return NextResponse.json(
			{ error: "All required fields must be filled" },
			{ status: 400 }
		);
	}

	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const newProduct = {
		title,
		description,
		price: Number(price),
		category,
		subject,
		university,
		sellerId: user.id,
		featured: false,
		approved: false,
	};

	const product = await Product.create(newProduct);

	return NextResponse.json({ success: true, product });
}

export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}
