// User roles
export enum UserRole {
  USER = "user",
  SELLER = "seller",
  ADMIN = "admin",
}

// User model
export interface User {
  id: string
  name: string
  email: string
  password: string // This would be hashed in a real application
  role: UserRole
  university?: string
  bio?: string
  avatar?: string
  walletBalance: number // Added wallet balance
  pendingBalance: number // Balance pending platform release
  createdAt: Date
  updatedAt: Date
}

// Product categories
export enum ProductCategory {
  NOTES = "notes",
  ASSIGNMENTS = "assignments",
  PAPERS = "papers",
  LAB_FILES = "lab_files",
  RESEARCH = "research",
  PROJECTS = "projects",
  SOURCE_CODE = "source_code",
  BOOKS = "books", // Added books category for physical products
  OTHER = "other",
}

// Product delivery types
export enum DeliveryType {
  DIGITAL = "digital",
  PHYSICAL = "physical",
  BOTH = "both",
}

// Product model
export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: ProductCategory
  subject: string
  university?: string
  previewImage?: string
  fileUrl?: string
  sellerId: string
  featured: boolean
  approved: boolean
  rating?: number
  reviewCount?: number
  deliveryType: DeliveryType // Added delivery type
  physicalPrice?: number // Additional cost for physical copy
  weight?: number // Weight in grams for shipping calculation
  stock?: number // Available physical copies
  createdAt: Date
  updatedAt: Date
}

// Order model
export interface Order {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  amount: number
  platformFee: number // Platform fee amount
  sellerEarnings: number // Amount credited to seller
  status: "pending" | "completed" | "refunded" | "processing" | "shipped" | "delivered"
  paymentId?: string
  isPhysical: boolean // Whether this is a physical delivery
  deliveryAddress?: Address // Delivery address for physical products
  trackingNumber?: string // Tracking number for physical delivery
  deliveryFee?: number // Fee for physical delivery
  createdAt: Date
  updatedAt: Date
}

// Address model for physical delivery
export interface Address {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
}

// Review model
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

// Transaction model for wallet
export interface Transaction {
  id: string
  userId: string
  amount: number
  type: "credit" | "debit" | "payout" | "refund"
  status: "pending" | "completed" | "failed"
  orderId?: string
  description: string
  reference?: string
  createdAt: Date
}

// Payout request model
export interface PayoutRequest {
  id: string
  userId: string
  amount: number
  status: "pending" | "processing" | "completed" | "rejected"
  paymentMethod: "bank_transfer" | "paypal" | "other"
  paymentDetails: any
  processedAt?: Date
  createdAt: Date
}
