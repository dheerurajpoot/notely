"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { User } from "@/models/user"

interface ReviewFormProps {
  productId: string
  user: User
  onReviewSubmitted: () => void
}

export function ReviewForm({ productId, user, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review")
      }

      // Clear form
      setRating(0)
      setComment("")

      // Notify parent component
      onReviewSubmitted()
    } catch (error: any) {
      setError(error.message || "An error occurred while submitting your review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Your Rating</p>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="text-sm font-medium">
          Your Review (Optional)
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isSubmitting || rating === 0} className="bg-sky-600 hover:bg-sky-700">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
