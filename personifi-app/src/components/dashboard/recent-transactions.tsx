"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpIcon, ShoppingBagIcon, HomeIcon, UtensilsIcon, CarIcon, SearchIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RecentTransactionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const transactions = [
  {
    id: "t1",
    description: "Tesco",
    amount: -120.5,
    date: "Today",
    category: "Food",
    icon: UtensilsIcon,
  },
  {
    id: "t2",
    description: "Salary Deposit",
    amount: 2150.0,
    date: "Yesterday",
    category: "Income",
    icon: ArrowUpIcon,
  },
  {
    id: "t3",
    description: "British Gas",
    amount: -85.0,
    date: "Yesterday",
    category: "Utilities",
    icon: HomeIcon,
  },
  {
    id: "t4",
    description: "Amazon",
    amount: -65.99,
    date: "12/07/2023",
    category: "Shopping",
    icon: ShoppingBagIcon,
  },
  {
    id: "t5",
    description: "BP Petrol",
    amount: -45.0,
    date: "11/07/2023",
    category: "Transport",
    icon: CarIcon,
  },
  {
    id: "t6",
    description: "Nando's",
    amount: -78.5,
    date: "10/07/2023",
    category: "Food",
    icon: UtensilsIcon,
  },
]

export function RecentTransactions({ className, ...props }: RecentTransactionsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent financial activity</CardDescription>
        </div>
        <div className="relative w-full max-w-[180px]">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full",
                      transaction.amount > 0 ? "bg-finance-green-light" : "bg-gray-100",
                    )}
                  >
                    <transaction.icon
                      className={cn("h-5 w-5", transaction.amount > 0 ? "text-finance-green" : "text-gray-500")}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date} • {transaction.category}
                    </p>
                  </div>
                </div>
                <div className={cn("text-sm font-medium", transaction.amount > 0 ? "text-finance-green" : "")}>
                  {transaction.amount > 0 ? "+" : ""}£{Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">No transactions found</div>
          )}
          {filteredTransactions.length > 0 && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" size="sm">
                View All Transactions
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
