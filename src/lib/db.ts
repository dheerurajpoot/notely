import {
  type User,
  type Product,
  type Order,
  type Review,
  type Transaction,
  type PayoutRequest,
  UserRole,
  ProductCategory,
  DeliveryType,
} from "./models"
import { v4 as uuidv4 } from "uuid"

// Mock database
let users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@notely.com",
    password: "admin123", // In a real app, this would be hashed
    role: UserRole.ADMIN,
    walletBalance: 0,
    pendingBalance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: UserRole.SELLER,
    university: "MIT",
    bio: "Computer Science student passionate about teaching and sharing knowledge.",
    walletBalance: 250.75,
    pendingBalance: 125.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: UserRole.USER,
    university: "Stanford",
    walletBalance: 0,
    pendingBalance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

let products: Product[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms Notes",
    description:
      "Comprehensive notes covering all major data structures and algorithms with examples and explanations.",
    price: 12.99,
    category: ProductCategory.NOTES,
    subject: "Computer Science",
    university: "MIT",
    previewImage: "/placeholder.svg?height=200&width=300",
    sellerId: "2",
    featured: true,
    approved: true,
    rating: 4.8,
    reviewCount: 124,
    deliveryType: DeliveryType.BOTH,
    physicalPrice: 5.99,
    weight: 250,
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Organic Chemistry Lab Manual",
    description: "Complete lab manual with procedures, observations, and analysis for organic chemistry experiments.",
    price: 9.99,
    category: ProductCategory.LAB_FILES,
    subject: "Chemistry",
    university: "Stanford",
    previewImage: "/placeholder.svg?height=200&width=300",
    sellerId: "2",
    featured: true,
    approved: true,
    rating: 4.6,
    reviewCount: 87,
    deliveryType: DeliveryType.DIGITAL,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Calculus II Complete Notes",
    description: "Detailed notes covering all topics in Calculus II including integrals, series, and applications.",
    price: 14.99,
    category: ProductCategory.NOTES,
    subject: "Mathematics",
    university: "Harvard",
    previewImage: "/placeholder.svg?height=200&width=300",
    sellerId: "2",
    featured: true,
    approved: true,
    rating: 4.9,
    reviewCount: 156,
    deliveryType: DeliveryType.BOTH,
    physicalPrice: 7.99,
    weight: 300,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Introduction to Physics Textbook",
    description:
      "Comprehensive textbook covering mechanics, thermodynamics, and electromagnetism with practice problems.",
    price: 24.99,
    category: ProductCategory.BOOKS,
    subject: "Physics",
    university: "MIT",
    previewImage: "/placeholder.svg?height=200&width=300",
    sellerId: "2",
    featured: false,
    approved: true,
    rating: 4.7,
    reviewCount: 42,
    deliveryType: DeliveryType.PHYSICAL,
    weight: 1200,
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const orders: Order[] = [
  {
    id: "1",
    productId: "1",
    buyerId: "3",
    sellerId: "2",
    amount: 12.99,
    platformFee: 1.3, // 10% of amount
    sellerEarnings: 11.69, // 90% of amount
    status: "completed",
    isPhysical: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    productId: "4",
    buyerId: "3",
    sellerId: "2",
    amount: 24.99,
    platformFee: 2.5, // 10% of amount
    sellerEarnings: 22.49, // 90% of amount
    status: "shipped",
    isPhysical: true,
    deliveryFee: 5.99,
    deliveryAddress: {
      fullName: "Jane Smith",
      addressLine1: "123 Campus Drive",
      city: "Stanford",
      state: "CA",
      postalCode: "94305",
      country: "USA",
      phoneNumber: "555-123-4567",
    },
    trackingNumber: "SHIP123456789",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
]

const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "3",
    rating: 5,
    comment: "Excellent notes, very helpful for my exam preparation!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Transactions for wallet
const transactions: Transaction[] = [
  {
    id: "1",
    userId: "2",
    amount: 11.69,
    type: "credit",
    status: "completed",
    orderId: "1",
    description: "Earnings from order #1",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
  },
  {
    id: "2",
    userId: "2",
    amount: 22.49,
    type: "credit",
    status: "pending",
    orderId: "2",
    description: "Pending earnings from order #2",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "3",
    userId: "2",
    amount: 150.0,
    type: "payout",
    status: "completed",
    description: "Weekly payout",
    reference: "PAY123456",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  },
]

// Payout requests
const payoutRequests: PayoutRequest[] = [
  {
    id: "1",
    userId: "2",
    amount: 100.0,
    status: "pending",
    paymentMethod: "bank_transfer",
    paymentDetails: {
      bankName: "Bank of America",
      accountNumber: "XXXX1234",
      routingNumber: "XXXX5678",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
]

// User operations
export const getUsers = () => users
export const getUserById = (id: string) => users.find((user) => user.id === id)
export const getUserByEmail = (email: string) => users.find((user) => user.email === email)
export const createUser = (user: Omit<User, "id" | "createdAt" | "updatedAt" | "walletBalance" | "pendingBalance">) => {
  const newUser: User = {
    ...user,
    id: uuidv4(),
    walletBalance: 0,
    pendingBalance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  users.push(newUser)
  return newUser
}
export const updateUser = (id: string, data: Partial<User>) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...data, updatedAt: new Date() }
    return users[index]
  }
  return null
}
export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    const deletedUser = users[index]
    users = users.filter((user) => user.id !== id)
    return deletedUser
  }
  return null
}

// Product operations
export const getProducts = () => products
export const getProductById = (id: string) => products.find((product) => product.id === id)
export const getProductsByCategory = (category: ProductCategory) =>
  products.filter((product) => product.category === category && product.approved)
export const getProductsBySeller = (sellerId: string) => products.filter((product) => product.sellerId === sellerId)
export const getFeaturedProducts = () => products.filter((product) => product.featured && product.approved)
export const getPhysicalProducts = () =>
  products.filter(
    (product) =>
      (product.deliveryType === DeliveryType.PHYSICAL || product.deliveryType === DeliveryType.BOTH) &&
      product.approved,
  )
export const createProduct = (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  products.push(newProduct)
  return newProduct
}
export const updateProduct = (id: string, data: Partial<Product>) => {
  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...data, updatedAt: new Date() }
    return products[index]
  }
  return null
}
export const deleteProduct = (id: string) => {
  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    const deletedProduct = products[index]
    products = products.filter((product) => product.id !== id)
    return deletedProduct
  }
  return null
}

// Order operations
export const getOrders = () => orders
export const getOrderById = (id: string) => orders.find((order) => order.id === id)
export const getOrdersByBuyer = (buyerId: string) => orders.filter((order) => order.buyerId === buyerId)
export const getOrdersBySeller = (sellerId: string) => orders.filter((order) => order.sellerId === sellerId)
export const getPhysicalOrdersBySeller = (sellerId: string) =>
  orders.filter((order) => order.sellerId === sellerId && order.isPhysical)
export const createOrder = (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
  const newOrder: Order = {
    ...order,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  orders.push(newOrder)

  // Create transaction for seller earnings
  if (order.sellerEarnings > 0) {
    const isPhysical = order.isPhysical
    createTransaction({
      userId: order.sellerId,
      amount: order.sellerEarnings,
      type: "credit",
      status: isPhysical ? "pending" : "completed", // Digital products are credited immediately
      orderId: newOrder.id,
      description: `Earnings from order #${newOrder.id}`,
    })

    // Update seller's wallet balance
    const seller = getUserById(order.sellerId)
    if (seller) {
      if (isPhysical) {
        // For physical products, add to pending balance
        updateUser(seller.id, {
          pendingBalance: seller.pendingBalance + order.sellerEarnings,
        })
      } else {
        // For digital products, add directly to wallet balance
        updateUser(seller.id, {
          walletBalance: seller.walletBalance + order.sellerEarnings,
        })
      }
    }
  }

  return newOrder
}
export const updateOrder = (id: string, data: Partial<Order>) => {
  const index = orders.findIndex((order) => order.id === id)
  if (index !== -1) {
    const oldStatus = orders[index].status
    const newStatus = data.status || oldStatus

    orders[index] = { ...orders[index], ...data, updatedAt: new Date() }

    // If order status changed to delivered, move earnings from pending to available
    if (oldStatus !== "delivered" && newStatus === "delivered" && orders[index].isPhysical) {
      const seller = getUserById(orders[index].sellerId)
      const earnings = orders[index].sellerEarnings

      if (seller && earnings) {
        // Update transaction status
        const transaction = getTransactionByOrderId(id)
        if (transaction && transaction.status === "pending") {
          updateTransaction(transaction.id, { status: "completed" })
        }

        // Move from pending to available balance
        updateUser(seller.id, {
          pendingBalance: Math.max(0, seller.pendingBalance - earnings),
          walletBalance: seller.walletBalance + earnings,
        })
      }
    }

    return orders[index]
  }
  return null
}

// Review operations
export const getReviews = () => reviews
export const getReviewById = (id: string) => reviews.find((review) => review.id === id)
export const getReviewsByProduct = (productId: string) => reviews.filter((review) => review.productId === productId)
export const getReviewsByUser = (userId: string) => reviews.filter((review) => review.userId === userId)
export const createReview = (review: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
  const newReview: Review = {
    ...review,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  reviews.push(newReview)

  // Update product rating
  const productReviews = getReviewsByProduct(review.productId)
  const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0)
  const avgRating = totalRating / productReviews.length

  updateProduct(review.productId, {
    rating: Number.parseFloat(avgRating.toFixed(1)),
    reviewCount: productReviews.length,
  })

  return newReview
}

// Transaction operations
export const getTransactions = () => transactions
export const getTransactionById = (id: string) => transactions.find((tx) => tx.id === id)
export const getTransactionsByUser = (userId: string) => transactions.filter((tx) => tx.userId === userId)
export const getTransactionByOrderId = (orderId: string) => transactions.find((tx) => tx.orderId === orderId)
export const createTransaction = (transaction: Omit<Transaction, "id" | "createdAt">) => {
  const newTransaction: Transaction = {
    ...transaction,
    id: uuidv4(),
    createdAt: new Date(),
  }
  transactions.push(newTransaction)
  return newTransaction
}
export const updateTransaction = (id: string, data: Partial<Transaction>) => {
  const index = transactions.findIndex((tx) => tx.id === id)
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...data }
    return transactions[index]
  }
  return null
}

// Payout operations
export const getPayoutRequests = () => payoutRequests
export const getPayoutRequestById = (id: string) => payoutRequests.find((pr) => pr.id === id)
export const getPayoutRequestsByUser = (userId: string) => payoutRequests.filter((pr) => pr.userId === userId)
export const getPendingPayoutRequests = () => payoutRequests.filter((pr) => pr.status === "pending")
export const createPayoutRequest = (payoutRequest: Omit<PayoutRequest, "id" | "createdAt">) => {
  const newPayoutRequest: PayoutRequest = {
    ...payoutRequest,
    id: uuidv4(),
    createdAt: new Date(),
  }
  payoutRequests.push(newPayoutRequest)
  return newPayoutRequest
}
export const updatePayoutRequest = (id: string, data: Partial<PayoutRequest>) => {
  const index = payoutRequests.findIndex((pr) => pr.id === id)
  if (index !== -1) {
    payoutRequests[index] = { ...payoutRequests[index], ...data }

    // If status changed to completed, create a payout transaction and update wallet balance
    if (data.status === "completed" && payoutRequests[index].status !== "completed") {
      const payout = payoutRequests[index]
      const user = getUserById(payout.userId)

      if (user) {
        // Create transaction record
        createTransaction({
          userId: user.id,
          amount: payout.amount,
          type: "payout",
          status: "completed",
          description: `Payout processed on ${new Date().toLocaleDateString()}`,
          reference: `PAY-${payout.id.substring(0, 8).toUpperCase()}`,
        })

        // Update user wallet balance
        updateUser(user.id, {
          walletBalance: Math.max(0, user.walletBalance - payout.amount),
        })
      }

      // Set processed date
      payoutRequests[index].processedAt = new Date()
    }

    return payoutRequests[index]
  }
  return null
}
