import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		university: {
			type: String,
		},
		previewImage: {
			type: String,
		},
		fileUrl: {
			type: String,
		},
		sellerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		approved: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
		},
		reviewCount: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const Product =
	mongoose.models?.Product || mongoose.model("Product", ProductSchema);
