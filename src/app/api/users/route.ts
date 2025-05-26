import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils";
import { User } from "@/models";

export async function GET(request: NextRequest) {
	const user = await getCurrentUser(request);
	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	if (user.role !== "admin") {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const users = await User.find();
	return NextResponse.json({
		success: true,
		users,
	});
}

export async function PUT(request: NextRequest) {
	const user = await getCurrentUser(request);
	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = await request.json();
	const { name, email, password } = data;
	if (!name || !email || !password) {
		return NextResponse.json(
			{ message: "Name, email, and password are required" },
			{ status: 400 }
		);
	}
	user.name = name;
	user.email = email;
	user.password = password;
	await user.save();
	return NextResponse.json({ success: true, user });
}

export async function DELETE(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("id");
	const user = await getCurrentUser(request);
	if (!userId) {
		return NextResponse.json(
			{ message: "User ID is required" },
			{ status: 400 }
		);
	}
	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	if (user.role !== "admin") {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const userById = await User.findById(userId);
	if (!userById) {
		return NextResponse.json(
			{ message: "User not found" },
			{ status: 404 }
		);
	}
	await userById.remove();
	return NextResponse.json({ success: true, message: "User deleted" });
}
