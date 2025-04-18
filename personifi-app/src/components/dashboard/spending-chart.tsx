"use client"

import type React from "react"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SpendingChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2500,
  },
  {
    name: "Apr",
    total: 2300,
  },
  {
    name: "May",
    total: 2800,
  },
  {
    name: "Jun",
    total: 3200,
  },
  {
    name: "Jul",
    total: 2860,
  },
]

export function SpendingChart({ className, ...props }: SpendingChartProps) {
  const [period, setPeriod] = useState("7d")

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Spending Overview</CardTitle>
          <CardDescription>Your spending patterns over time</CardDescription>
        </div>
        <div>
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `£${value}`}
            />
            <Tooltip formatter={(value: number) => [`£${value}`, "Total"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
