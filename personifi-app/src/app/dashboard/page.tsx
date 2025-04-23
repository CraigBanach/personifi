import { BudgetProgress } from "@/components/dashboard/budgetProgress";
import { OverviewCards } from "@/components/dashboard/overviewCards";
import { SpendingChart } from "@/components/dashboard/spendingChart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Personifi",
  description: "Manage your personal finances with ease",
};

const Dashboard = () => {
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
      </section>
    </main>
  );
};

export default Dashboard;
