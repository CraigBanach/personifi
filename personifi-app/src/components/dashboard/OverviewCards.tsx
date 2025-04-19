import {
  PoundSterlingIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const OverviewCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <PoundSterlingIcon className="h-4 w-4 text-finance-navy" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">£12,546.00</div>
        <p className="text-xs text-muted-foreground">
          +£1,234.00 from last month
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
        <ArrowUpIcon className="h-4 w-4 text-finance-green" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">£4,395.00</div>
        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
        <ArrowDownIcon className="h-4 w-4 text-finance-red" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">£2,860.00</div>
        <p className="text-xs text-muted-foreground">-4.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
        <TrendingUpIcon className="h-4 w-4 text-finance-gold" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">34.9%</div>
        <p className="text-xs text-muted-foreground">+5.2% from last month</p>
      </CardContent>
    </Card>
  </div>
);
