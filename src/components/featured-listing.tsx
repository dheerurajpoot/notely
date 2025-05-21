import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface FeaturedListingProps {
  title: string
  subject: string
  price: number
  rating: number
  reviews: number
  seller: string
  university: string
  imageUrl: string
}

export function FeaturedListing({
  title,
  subject,
  price,
  rating,
  reviews,
  seller,
  university,
  imageUrl,
}: FeaturedListingProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-sky-600">${price.toFixed(2)}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="bg-sky-50">
            {subject}
          </Badge>
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>By {seller}</span>
            <span className="mx-2">•</span>
            <span>{university}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground text-sm ml-1">({reviews})</span>
        </div>
        <Badge variant="secondary" className="bg-sky-100 text-sky-800 hover:bg-sky-200">
          Preview
        </Badge>
      </CardFooter>
    </Card>
  )
}
