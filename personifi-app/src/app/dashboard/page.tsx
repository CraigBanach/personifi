import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { BudgetProgress } from "@/components/dashboard/budget-progress"
import { UpcomingBills } from "@/components/dashboard/upcoming-bills"
import { SavingsGoals } from "@/components/dashboard/savings-goals"

export const metadata: Metadata = {
  title: "Dashboard | Personifi",
  description: "Manage your personal finances with ease",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Get an overview of your financial health" />
      <div className="grid gap-6">
        <OverviewCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <SpendingChart className="lg:col-span-4" />
          <BudgetProgress className="lg:col-span-3" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <RecentTransactions className="lg:col-span-4" />
          <div className="flex flex-col gap-6 lg:col-span-3">
            <UpcomingBills />
            <SavingsGoals />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
