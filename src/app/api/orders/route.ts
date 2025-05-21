import { type NextRequest, NextResponse } from "next/server"
import { getOrderById, getOrdersByBuyer, getOrdersBySeller, createOrder, updateOrder } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type") // 'buying' or 'selling'

  if (id) {
    const order = getOrderById(id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if user is authorized to view this order
    if (order.buyerId !== user.id && order.sellerId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(order)
  }

  if (type === "buying") {
    const orders = getOrdersByBuyer(user.id)
    return NextResponse.json(orders)
  }

  if (type === "selling") {
    const orders = getOrdersBySeller(user.id)
    return NextResponse.json(orders)
  }

  // Admin can see all orders
  if (user.role === "admin") {
    const orders = getOrdersByBuyer(user.id).concat(getOrdersBySeller(user.id))
    return NextResponse.json(orders)
  }

  // Default to showing both buying and selling orders
  const buyingOrders = getOrdersByBuyer(user.id)
  const sellingOrders = getOrdersBySeller(user.id)
  return NextResponse.json([...buyingOrders, ...sellingOrders])
}

export async function POST(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { productId, sellerId, amount, paymentId } = data

  if (!productId || !sellerId || !amount) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
  }

  const newOrder = createOrder({
    productId,
    buyerId: user.id,
    sellerId,
    amount: Number(amount),
    status: "pending",
    paymentId,
  })

  return NextResponse.json({ success: true, order: newOrder })
}

export async function PUT(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { id, status } = data

  if (!id || !status) {
    return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 })
  }

  const order = getOrderById(id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  // Only admin or seller can update order status
  if (order.sellerId !== user.id && user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const updatedOrder = updateOrder(id, {
    status,
    updatedAt: new Date(),
  })

  return NextResponse.json({ success: true, order: updatedOrder })
}
