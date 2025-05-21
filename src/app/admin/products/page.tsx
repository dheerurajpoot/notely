"use client"

import { useState } from "react"
import { Edit, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getProducts } from "@/lib/db"
import { ProductCategory } from "@/lib/models"

export default function AdminProductsPage() {
  const allProducts = getProducts()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all")
  const [approvalFilter, setApprovalFilter] = useState<"all" | "approved" | "pending">("all")

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesApproval =
      approvalFilter === "all" ||
      (approvalFilter === "approved" && product.approved) ||
      (approvalFilter === "pending" && !product.approved)

    return matchesSearch && matchesCategory && matchesApproval
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
        <p className="text-muted-foreground">Manage all products on the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>View, approve, and manage all products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="border rounded-md px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "all")}
            >
              <option value="all">All Categories</option>
              {Object.values(ProductCategory).map((category) => (
                <option key={category} value={category}>
                  {category.replace("_", " ")}
                </option>
              ))}
            </select>
            <select
              className="border rounded-md px-3 py-2"
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value as "all" | "approved" | "pending")}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-2">Seller</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Actions</div>
            </div>

            {filteredProducts.map((product, index) => (
              <div key={product.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                <div className="col-span-1 text-muted-foreground">{index + 1}</div>
                <div className="col-span-3 font-medium">{product.title}</div>
                <div className="col-span-2">
                  <span className="px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="col-span-1 font-medium">${product.price.toFixed(2)}</div>
                <div className="col-span-2 text-sm text-muted-foreground">Seller #{product.sellerId.slice(-4)}</div>
                <div className="col-span-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {product.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  {!product.approved && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
