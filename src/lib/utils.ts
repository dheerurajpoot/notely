import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

export function formatDateTime(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	}).format(new Date(date));
}

export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + "...";
}

export function calculatePlatformFee(amount: number): number {
	// 10% platform fee
	return amount * 0.1;
}

export function calculateSellerEarnings(amount: number): number {
	// 90% to seller
	return amount * 0.9;
}

export const loadScript = (src: string, callback: () => void) => {
	const script = document.createElement("script");
	script.src = src;
	script.onload = () => {
		callback();
	};
	document.body.appendChild(script);
};
