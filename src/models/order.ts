import mongoose from "mongoose";
import { Product } from "./product";
import { User } from "./user";

const orderSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		buyerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		sellerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "refunded"],
			default: "pending",
		},
		paymentId: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Order =
	mongoose.models?.Order || mongoose.model("Order", orderSchema);
