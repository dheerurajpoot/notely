"use server"

import { redirect } from "next/navigation"
import { createProduct, updateProduct, deleteProduct, createOrder, createReview, updateUser } from "./db"
import { requireAuth } from "./auth"
import { ProductCategory } from "./models"
import { UserRole } from "./types"

export async function createProductAction(formData: FormData) {
  const user = requireAuth()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = formData.get("category") as ProductCategory
  const subject = formData.get("subject") as string
  const university = formData.get("university") as string

  if (!title || !description || isNaN(price) || !category || !subject) {
    return { error: "All required fields must be filled" }
  }

  const newProduct = createProduct({
    title,
    description,
    price,
    category,
    subject,
    university,
    sellerId: user.id,
    featured: false,
    approved: false,
  })

  return { success: true, product: newProduct }
}

export async function updateProductAction(id: string, formData: FormData) {
  const user = requireAuth()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = formData.get("category") as ProductCategory
  const subject = formData.get("subject") as string
  const university = formData.get("university") as string

  if (!title || !description || isNaN(price) || !category || !subject) {
    return { error: "All required fields must be filled" }
  }

  const updatedProduct = updateProduct(id, {
    title,
    description,
    price,
    category,
    subject,
    university,
    updatedAt: new Date(),
  })

  if (!updatedProduct) {
    return { error: "Product not found" }
  }

  return { success: true, product: updatedProduct }
}

export async function deleteProductAction(id: string) {
  const user = requireAuth()

  const deletedProduct = deleteProduct(id)

  if (!deletedProduct) {
    return { error: "Product not found" }
  }

  return { success: true }
}

export async function purchaseProductAction(productId: string) {
  const user = requireAuth()
  const product = getProductById(productId)

  if (!product) {
    return { error: "Product not found" }
  }

  const newOrder = createOrder({
    productId,
    buyerId: user.id,
    sellerId: product.sellerId,
    amount: product.price,
    status: "completed",
  })

  return { success: true, order: newOrder }
}

export async function createReviewAction(formData: FormData) {
  const user = requireAuth()

  const productId = formData.get("productId") as string
  const rating = Number.parseInt(formData.get("rating") as string)
  const comment = formData.get("comment") as string

  if (!productId || isNaN(rating) || rating < 1 || rating > 5) {
    return { error: "Invalid review data" }
  }

  const newReview = createReview({
    productId,
    userId: user.id,
    rating,
    comment,
  })

  return { success: true, review: newReview }
}

export async function updateProfileAction(formData: FormData) {
  const user = requireAuth()

  const name = formData.get("name") as string
  const bio = formData.get("bio") as string
  const university = formData.get("university") as string

  if (!name) {
    return { error: "Name is required" }
  }

  const updatedUser = updateUser(user.id, {
    name,
    bio,
    university,
  })

  if (!updatedUser) {
    return { error: "Failed to update profile" }
  }

  return { success: true, user: updatedUser }
}

export async function becomeSeller() {
  const user = requireAuth()

  if (user.role === UserRole.SELLER) {
    return { error: "You are already a seller" }
  }

  const updatedUser = updateUser(user.id, {
    role: UserRole.SELLER,
  })

  if (!updatedUser) {
    return { error: "Failed to update role" }
  }

  return { success: true, user: updatedUser }
}

// Admin actions
export async function approveProductAction(id: string) {
  requireAdmin()

  const updatedProduct = updateProduct(id, {
    approved: true,
  })

  if (!updatedProduct) {
    return { error: "Product not found" }
  }

  return { success: true, product: updatedProduct }
}

export async function featureProductAction(id: string) {
  requireAdmin()

  const updatedProduct = updateProduct(id, {
    featured: true,
  })

  if (!updatedProduct) {
    return { error: "Product not found" }
  }

  return { success: true, product: updatedProduct }
}

// Helper functions
function getProductById(id: string) {
  // This is imported from db.ts but we're mocking it here
  return {
    id,
    title: "Sample Product",
    description: "Sample description",
    price: 9.99,
    category: ProductCategory.NOTES,
    subject: "Sample Subject",
    sellerId: "2",
    featured: false,
    approved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

function requireAdmin() {
  const user = requireAuth()

  if (user.role !== "admin") {
    redirect("/dashboard")
  }

  return user
}
