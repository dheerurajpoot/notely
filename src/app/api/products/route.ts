import { type NextRequest, NextResponse } from "next/server"
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import type { ProductCategory } from "@/models/product"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category") as ProductCategory | null

  if (id) {
    const product = getProductById(id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  }

  if (category) {
    const products = getProductsByCategory(category)
    return NextResponse.json(products)
  }

  const products = getProducts()
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { title, description, price, category, subject, university } = data

  if (!title || !description || isNaN(price) || !category || !subject) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
  }

  const newProduct = createProduct({
    title,
    description,
    price: Number(price),
    category,
    subject,
    university,
    sellerId: user.id,
    featured: false,
    approved: false,
  })

  return NextResponse.json({ success: true, product: newProduct })
}

export async function PUT(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { id, title, description, price, category, subject, university } = data

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  const product = getProductById(id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  if (product.sellerId !== user.id && user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const updatedProduct = updateProduct(id, {
    ...(title && { title }),
    ...(description && { description }),
    ...(price && { price: Number(price) }),
    ...(category && { category }),
    ...(subject && { subject }),
    ...(university && { university }),
    updatedAt: new Date(),
  })

  return NextResponse.json({ success: true, product: updatedProduct })
}

export async function DELETE(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  const product = getProductById(id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  if (product.sellerId !== user.id && user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const deletedProduct = deleteProduct(id)

  return NextResponse.json({ success: true, product: deletedProduct })
}
