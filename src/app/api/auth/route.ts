import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getUserByEmail, createUser } from "@/lib/db"
import { UserRole } from "@/models/user"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { action } = data

  if (action === "login") {
    const { email, password } = data

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = getUserByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Set a cookie to simulate authentication
    cookies().set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json({ success: true, user: { ...user, password: undefined } })
  }

  if (action === "signup") {
    const { name, email, password, university } = data

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const existingUser = getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const newUser = createUser({
      name,
      email,
      password,
      role: UserRole.USER,
      university,
    })

    // Set a cookie to simulate authentication
    cookies().set("userId", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json({ success: true, user: { ...newUser, password: undefined } })
  }

  if (action === "logout") {
    cookies().delete("userId")
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
