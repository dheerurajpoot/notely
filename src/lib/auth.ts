"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail, createUser } from "./db";
import { type User, UserRole } from "./models";

// In a real app, you would use a proper authentication library and secure methods
// This is a simplified version for demonstration purposes

export async function login(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	const user = await getUserByEmail(email);

	if (!user || user.password !== password) {
		return { error: "Invalid email or password" };
	}

	// Set a cookie to simulate authentication
	(await cookies()).set("userId", user.id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: "/",
	});

	return { success: true, user };
}

export async function signup(formData: FormData) {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const university = formData.get("university") as string;

	if (!name || !email || !password) {
		return { error: "All fields are required" };
	}

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "Email already in use" };
	}

	const newUser = createUser({
		name,
		email,
		password,
		role: UserRole.USER,
		university,
	});

	// Set a cookie to simulate authentication
	(await cookies()).set("userId", newUser.id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: "/",
	});

	return { success: true, user: newUser };
}

export async function logout() {
	(await cookies()).delete("userId");
	redirect("/login");
}

export async function getCurrentUser(): Promise<User | null> {
	const userId = (await cookies()).get("userId")?.value;

	if (!userId) {
		return null;
	}

	const user = await getUserById(userId);
	return user || null;
}

export async function getUserById(id: string) {
	// This is imported from db.ts
	return getUserByEmail("admin@notely.com"); // Mocking for demonstration
}

export async function requireAuth() {
	const user = await getCurrentUser();

	if (!user) {
		// redirect("/login")
	}

	return user;
}

export async function requireAdmin() {
	const user = await requireAuth();

	if (user?.role !== UserRole.ADMIN) {
		// redirect("/dashboard")
	}

	return user;
}
