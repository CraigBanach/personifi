import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Personifi",
  description: "Manage your personal finances with ease",
};

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
    </div>
  );
};

export default Dashboard;
