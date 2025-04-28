import { BudgetProgress } from "@/components/dashboard/budgetProgress";
import { OverviewCards } from "@/components/dashboard/overviewCards";
import { RecentTransactions } from "@/components/dashboard/recentTransactions";
import { SavingsGoals } from "@/components/dashboard/savingsGoals";
import { SpendingChart } from "@/components/dashboard/spendingChart";
import { UpcomingBills } from "@/components/dashboard/upcomingBills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Personifi",
  description: "Manage your personal finances with ease",
};

const Dashboard = async () => {
  return (
    <main className="flex flex-col p-4 md:p-6">
      <section className="flex flex-col justify-between gap-1 py-4 px-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Get an overview of your financial health
        </p>
      </section>
      <section className="flex flex-col gap-6">
        <OverviewCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <SpendingChart />
          <BudgetProgress />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <RecentTransactions />
          <div className="flex flex-col gap-6 col-span-4 lg:col-span-3">
            <UpcomingBills />
            <SavingsGoals />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
