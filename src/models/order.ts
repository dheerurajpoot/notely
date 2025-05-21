export interface Order {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  amount: number
  status: "pending" | "completed" | "refunded"
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}
