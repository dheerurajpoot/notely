import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/lib/db";
import { User } from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({
			success: false,
			message: "No token found",
		});
	}

	const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
	const user = await User.findById(decoded.userId).select("-password");
	if (!user) {
		return NextResponse.json({
			success: false,
			message: "User not found",
		});
	}

	return user;
}

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
	try {
		await connectDb();
		const user = await getUserFromToken(request);

		return NextResponse.json({
			success: true,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				image: user.image,
				isBlocked: user.isBlocked,
				createdAt: user.createdAt,
				// Add any other fields you want to return
			},
		});
	} catch (error) {
		if (!(error instanceof Error)) {
			throw error;
		}
		console.error("Get profile error:", error);
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to get profile",
			},
			{
				status:
					error instanceof Error && error.message === "No token found"
						? 401
						: 500,
			}
		);
	}
}

// PUT /api/profile - Update user profile
export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const user = await getUserFromToken(request);
		const updates = await request.json();

		// Fields that are allowed to be updated
		const allowedUpdates = ["name", "image"];
		const updateData: Record<string, string> = {};

		// Only include allowed fields
		Object.keys(updates).forEach((key) => {
			if (allowedUpdates.includes(key)) {
				updateData[key] = updates[key];
			}
		});

		// Update user
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ $set: updateData },
			{ new: true }
		).select("-password");

		return NextResponse.json({
			success: true,
			message: "Profile updated successfully",
			user: {
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.role,
				image: updatedUser.image,
				isBlocked: updatedUser.isBlocked,
				createdAt: updatedUser.createdAt,
			},
		});
	} catch (error) {
		if (!(error instanceof Error)) {
			throw error;
		}
		console.error("Update profile error:", error);
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to update profile",
			},
			{
				status:
					error instanceof Error && error.message === "No token found"
						? 401
						: 500,
			}
		);
	}
}
