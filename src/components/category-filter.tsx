"use client"

import { useState } from "react"
import { ProductCategory } from "@/models/product"

interface CategoryFilterProps {
  onSelect: (category: ProductCategory | null) => void
  initialCategory?: ProductCategory | null
}

export function CategoryFilter({ onSelect, initialCategory = null }: CategoryFilterProps) {
  const [selected, setSelected] = useState<ProductCategory | null>(initialCategory)

  const handleSelect = (category: ProductCategory | null) => {
    setSelected(category)
    onSelect(category)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
            selected === null ? "bg-sky-100 text-sky-700" : "hover:bg-gray-100"
          }`}
        >
          All Categories
        </button>
        {Object.values(ProductCategory).map((category) => (
          <button
            key={category}
            onClick={() => handleSelect(category as ProductCategory)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              selected === category ? "bg-sky-100 text-sky-700" : "hover:bg-gray-100"
            }`}
          >
            {category.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  )
}
