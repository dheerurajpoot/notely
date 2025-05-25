"use server";

import { cookies } from "next/headers";
import { type User, UserRole } from "./models";

export async function getCurrentUser(): Promise<User | null> {
	const userId = (await cookies()).get("userId")?.value;

	if (!userId) {
		return null;
	}

	const user = await getUserById(userId);
	return user || null;
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
