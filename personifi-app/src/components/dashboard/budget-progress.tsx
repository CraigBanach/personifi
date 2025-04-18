"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BudgetProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const categories = [
  {
    name: "Housing",
    spent: 1200,
    budget: 1500,
    color: "bg-finance-navy",
  },
  {
    name: "Food",
    spent: 450,
    budget: 500,
    color: "bg-finance-green",
  },
  {
    name: "Transport",
    spent: 280,
    budget: 300,
    color: "bg-finance-gold",
  },
  {
    name: "Entertainment",
    spent: 180,
    budget: 200,
    color: "bg-purple-500",
  },
  {
    name: "Shopping",
    spent: 320,
    budget: 300,
    color: "bg-finance-red",
  },
  {
    name: "Utilities",
    spent: 150,
    budget: 200,
    color: "bg-teal-500",
  },
];

export function BudgetProgress({ className, ...props }: BudgetProgressProps) {
  const [period, setPeriod] = useState("current");

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Budget Progress</CardTitle>
          <CardDescription>
            Your spending against budget categories
          </CardDescription>
        </div>
        <div>
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">This month</SelectItem>
              <SelectItem value="previous">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", category.color)} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  £{category.spent} / £{category.budget}
                </div>
              </div>
              <Progress
                value={(category.spent / category.budget) * 100}
                className={cn(
                  "h-2",
                  category.spent > category.budget
                    ? "bg-finance-red-light"
                    : "bg-gray-200"
                )}
                indicatorClassName={
                  category.spent > category.budget
                    ? "bg-finance-red"
                    : category.color
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
