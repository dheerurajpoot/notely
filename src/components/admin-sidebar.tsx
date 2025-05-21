"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  Truck,
  BarChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

export function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin") && pathname === "/admin" ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <LayoutDashboard className="h-4 w-4 text-sky-600" />
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/users") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <Users className="h-4 w-4 text-sky-600" />
          Users
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/products") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <ShoppingBag className="h-4 w-4 text-sky-600" />
          Products
        </Link>
        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/orders") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <Truck className="h-4 w-4 text-sky-600" />
          Orders
        </Link>
        <Link
          href="/admin/payouts"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/payouts") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <Wallet className="h-4 w-4 text-sky-600" />
          Payouts
        </Link>
        <Link
          href="/admin/analytics"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/analytics") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <BarChart className="h-4 w-4 text-sky-600" />
          Analytics
        </Link>
        <Link
          href="/admin/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/admin/settings") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <Settings className="h-4 w-4 text-sky-600" />
          Settings
        </Link>
        <div className="pt-2 pb-1">
          <p className="px-3 text-xs font-medium text-muted-foreground">SUPPORT</p>
        </div>
        <Link
          href="/help"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
            isActive("/help") ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50"
          }`}
        >
          <HelpCircle className="h-4 w-4 text-sky-600" />
          Help Center
        </Link>
      </nav>
      <div className="p-4 border-t">
        <form action={logout}>
          <Button variant="outline" className="w-full" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </form>
      </div>
    </div>
  )
}
