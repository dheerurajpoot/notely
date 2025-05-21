import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  change?: { value: number; positive: boolean }
}

export function StatsCard({ title, value, icon, description, change }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {change && (
          <div className={`flex items-center text-xs mt-1 ${change.positive ? "text-green-500" : "text-red-500"}`}>
            {change.positive ? "↑" : "↓"} {Math.abs(change.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}
