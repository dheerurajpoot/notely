import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CategoryCardProps {
  title: string
  icon: ReactNode
  count: number
  featured?: boolean
}

export function CategoryCard({ title, icon, count, featured = false }: CategoryCardProps) {
  return (
    <Link href="#">
      <Card className={cn("transition-all hover:shadow-md", featured ? "border-sky-600 bg-sky-50" : "")}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{count.toLocaleString()} items</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-center">
          <span className="text-sm font-medium text-sky-600 flex items-center">
            Browse {title}
            <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
