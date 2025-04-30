import { PageHeader } from "@/components/ui/pageHeader";
import type { Metadata } from "next";
// import { DashboardHeader } from "@/components/dashboard/dashboard-header";
// import { TransactionForm } from "@/components/transactions/transaction-form";
// import { CategorySummary } from "@/components/transactions/category-summary";

export const metadata: Metadata = {
  title: "New Transaction | Personifi",
  description: "Add a new transaction to your personal finance tracker",
};

export default function NewTransactionPage() {
  return (
    <>
      <PageHeader
        title="New Transaction"
        subTitle="Record a new income or expense transaction"
      />
      {/* <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <TransactionForm />
        </div>
        <div>
          <CategorySummary />
        </div>
      </div> */}
    </>
  );
}
