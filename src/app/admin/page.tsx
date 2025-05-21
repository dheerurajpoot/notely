import { BarChart, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/ui-components"
import { getProducts, getUsers, getOrders } from "@/lib/db"

export default function AdminDashboardPage() {
  const products = getProducts()
  const users = getUsers()
  const orders = getOrders()

  const pendingProducts = products.filter((product) => !product.approved)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage the Notely platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Total Products"
          value={products.length}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Revenue"
          value="$1,234.56"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          change={{ value: 8, positive: true }}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Approvals ({pendingProducts.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Platform revenue over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <p className="ml-2 text-muted-foreground">Revenue chart will appear here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Recently registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Recently placed orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Order #{order.id.slice(-4)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.amount.toFixed(2)}</p>
                        <p className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 inline-block">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Product Approvals</CardTitle>
              <CardDescription>Products waiting for admin approval</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingProducts.length > 0 ? (
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700">
                              {product.category}
                            </span>
                            <span className="text-xs text-muted-foreground">Seller #{product.sellerId.slice(-4)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm font-medium">
                          Reject
                        </button>
                        <button className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium">
                          Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending products to approve.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
