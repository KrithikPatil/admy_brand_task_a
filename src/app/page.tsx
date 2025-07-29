

"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCharts } from "@/components/DashboardCharts";
import { CustomCharts } from "@/components/CustomCharts";
import { DatasetUploader } from "@/components/DatasetUploader";
import { useState } from "react";
import DataTable from "@/components/DataTable";
import mockData from "@/data/mockDataset.json";

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);

  // Only show insights if no dataset is uploaded (showing default data)
  const insights = null; // Dataset insights removed

  const dashboardData = Array.isArray(data) && data.length > 0 ? data : mockData;

  // Calculate metrics
  const totalRevenue = dashboardData.reduce((sum, row) => sum + (Number(row.revenue) || 0), 0);
  const totalUsers = dashboardData.reduce((sum, row) => sum + (Number(row.users) || 0), 0);
  const totalConversions = dashboardData.reduce((sum, row) => sum + (Number(row.conversions) || 0), 0);
  const avgGrowth = dashboardData.length > 0 ? (dashboardData.reduce((sum, row) => sum + (Number(row.growth) || 0), 0) / dashboardData.length) : 0;

  // Save as Report handler
  const handleSaveReport = () => {
    const name = prompt("Enter a name for your report:");
    if (!name) return;
    // Save to localStorage (or send to backend if available)
    localStorage.setItem(
      `admybrand_report_${name}`,
      JSON.stringify(data)
    );
    alert("Report saved! You can add logic to show it in /reports.");
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <DatasetUploader onData={setData} />
      {/* Show Save as Report if user uploaded data */}
      {Array.isArray(data) && data.length > 0 && (
        <div className="mb-4">
          <button
            className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
            onClick={handleSaveReport}
          >
            Save as Report
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Revenue</span>
          <span className="font-bold text-lg">${totalRevenue}B</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Users</span>
          <span className="font-bold text-lg">{totalUsers.toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Conversions</span>
          <span className="font-bold text-lg">{totalConversions.toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Growth %</span>
          <span className="font-bold text-lg">{avgGrowth.toFixed(2)}%</span>
        </Card>
      </div>
      <div className="mt-10">
        <DataTable data={dashboardData} />
      </div>
      <div className="mt-10">
        <DashboardCharts data={dashboardData} />
      </div>
      <div className="mt-10">
        <CustomCharts data={dashboardData} />
      </div>
    </div>
  );
}
