import { type NextRequest, NextResponse } from "next/server"
import { getUsers, getUserById, updateUser, deleteUser } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  // If requesting a specific user
  if (id) {
    // Users can only access their own data, admins can access any user
    if (id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const userData = getUserById(id)

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Don't return password
    const { password, ...userWithoutPassword } = userData
    return NextResponse.json(userWithoutPassword)
  }

  // Only admins can list all users
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const users = getUsers().map(({ password, ...user }) => user)
  return NextResponse.json(users)
}

export async function PUT(request: NextRequest) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const { id, ...updateData } = data

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Users can only update their own data, admins can update any user
  if (id !== currentUser.id && currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  // Don't allow role changes unless admin
  if (updateData.role && currentUser.role !== "admin") {
    delete updateData.role
  }

  const updatedUser = updateUser(id, {
    ...updateData,
    updatedAt: new Date(),
  })

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Don't return password
  const { password, ...userWithoutPassword } = updatedUser
  return NextResponse.json({ success: true, user: userWithoutPassword })
}

export async function DELETE(request: NextRequest) {
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Don't allow deleting self
  if (id === currentUser.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
  }

  const deletedUser = deleteUser(id)

  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Don't return password
  const { password, ...userWithoutPassword } = deletedUser
  return NextResponse.json({ success: true, user: userWithoutPassword })
}
