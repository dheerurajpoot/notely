import { type NextRequest, NextResponse } from "next/server"
import { getReviewById, getReviewsByProduct, getReviewsByUser, createReview } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const productId = searchParams.get("productId")
  const userId = searchParams.get("userId")

  if (id) {
    const review = getReviewById(id)

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json(review)
  }

  if (productId) {
    const reviews = getReviewsByProduct(productId)
    return NextResponse.json(reviews)
  }

  if (userId) {
    const user = getCurrentUser()

    // Only allow users to see their own reviews or admins to see any user's reviews
    if (!user || (user.id !== userId && user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const reviews = getReviewsByUser(userId)
    return NextResponse.json(reviews)
  }

  return NextResponse.json({ error: "Missing query parameters" }, { status: 400 })
}

export async function POST(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { productId, rating, comment } = data

  if (!productId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid review data" }, { status: 400 })
  }

  // Check if user has already reviewed this product
  const existingReviews = getReviewsByProduct(productId)
  const userReview = existingReviews.find((review) => review.userId === user.id)

  if (userReview) {
    return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
  }

  const newReview = createReview({
    productId,
    userId: user.id,
    rating: Number(rating),
    comment,
  })

  return NextResponse.json({ success: true, review: newReview })
}
