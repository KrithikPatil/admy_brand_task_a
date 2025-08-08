

"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCharts } from "@/components/DashboardCharts";
import { CustomCharts } from "@/components/CustomCharts";
import { DatasetUploader } from "@/components/DatasetUploader";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next"
import DataTable from "@/components/DataTable";
import mockData from "@/data/mockDataset.json";

export default function Home() {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "dashboard",
    onAfterPrint: () => {},
  });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Analytics/>
        <Card className="w-full h-full flex flex-col justify-between p-6 shadow-sm">
          <div className="flex flex-col gap-4 flex-1">
            <DatasetUploader onData={setData} />
            {/* Show Save as Report if user uploaded data */}
            {Array.isArray(data) && data.length > 0 && (
              <div>
                <button
                  className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                  onClick={handleSaveReport}
                >
                  Save as Report
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={handlePrint}>
              Export as PDF
            </Button>
          </div>
        </Card>
        <Card className="w-full h-full p-6 shadow-sm">
          <DataTable data={dashboardData} />
        </Card>
      </div>
      <div ref={printRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
          <DashboardCharts data={dashboardData} />
        </div>
        <div className="mt-10">
          <CustomCharts data={dashboardData} />
        </div>
      </div>
    </div>
  );
}
