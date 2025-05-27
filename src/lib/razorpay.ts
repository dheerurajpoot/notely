"use client";

import axios from "axios";
import { loadScript } from "./utils";

interface RazorpayOptions {
	key: string;
	amount: number;
	currency: string;
	name: string;
	description: string;
	image?: string;
	orderId: string;
	prefill?: {
		name?: string;
		email?: string;
		contact?: string;
	};
	notes?: Record<string, string>;
	theme?: {
		color?: string;
	};
	handler: (response: any) => void;
}

export const initializeRazorpay = async () => {
	return new Promise((resolve) => {
		loadScript("https://checkout.razorpay.com/v1/checkout.js", () => {
			resolve(true);
		});
	});
};

export const makePayment = async (options: RazorpayOptions) => {
	const res = await initializeRazorpay();

	if (!res) {
		alert("Razorpay SDK failed to load. Are you online?");
		return;
	}

	const paymentObject = new (window as any).Razorpay(options);
	paymentObject.open();
};

export const createRazorpayOrder = async (
	amount: number,
	productId: string
) => {
	try {
		const response = await axios.post("/api/payment/create-order", {
			amount,
			productId,
		});

		const data = await response.data;

		if (!data.success) {
			throw new Error(data.error || "Failed to create order");
		}

		return data.order;
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		throw error;
	}
};
