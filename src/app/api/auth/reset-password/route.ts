import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import { connectDb } from "@/lib/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface JwtError extends Error {
	name: string;
}

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { data } = await request.json();

		if (!data.token || !data.password) {
			return NextResponse.json(
				{ message: "Token and password are required" },
				{ status: 400 }
			);
		}

		// First verify the JWT token
		let decoded;
		try {
			decoded = jwt.verify(data.token, process.env.JWT_SECRET!) as {
				userId: string;
			};
		} catch (error: unknown) {
			const jwtError = error as JwtError;
			if (jwtError.name === "TokenExpiredError") {
				return NextResponse.json(
					{ message: "Reset token has expired" },
					{ status: 400 }
				);
			}
			return NextResponse.json(
				{ message: "Invalid reset token" },
				{ status: 400 }
			);
		}

		// Find user with valid reset token
		const user = await User.findOne({
			_id: decoded.userId,
			forgotPasswordToken: data.token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			// Let's check if the user exists at all
			const userExists = await User.findById(decoded.userId);

			if (
				userExists.forgotPasswordToken &&
				userExists.forgotPasswordToken !== data.token
			) {
				return NextResponse.json(
					{
						message:
							"This password reset link has expired. Please request a new one.",
					},
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ message: "Invalid or expired reset token" },
				{ status: 400 }
			);
		}

		// Hash new password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(data.password, salt);

		// Update user's password and clear reset token
		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;
		await user.save();

		return NextResponse.json({
			message: "Password reset successfully",
			success: true,
		});
	} catch (error: unknown) {
		console.error("Reset password error:", error);
		return NextResponse.json(
			{ message: "An error occurred while resetting your password" },
			{ status: 500 }
		);
	}
}
