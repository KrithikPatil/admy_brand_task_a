"use client";
import mockData1 from "@/data/mockDataset.json";
import mockData2 from "@/data/mockDataset2.json";
import mockData3 from "@/data/mockDataset3.json";
import mockData4 from "@/data/mockDataset4.json";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { Card } from "@/components/ui/card";
import { DashboardCharts } from "@/components/DashboardCharts";
import { CustomCharts } from "@/components/CustomCharts";

export default function ReportsPage() {
  // Load saved reports from localStorage
  const [savedReports, setSavedReports] = useState<{ label: string; data: any[] }[]>([]);
  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("admybrand_report_"));
    const reports = keys.map((k) => {
      try {
        const data = JSON.parse(localStorage.getItem(k) || "[]");
        return { label: k.replace("admybrand_report_", "Saved: "), data };
      } catch {
        return null;
      }
    }).filter(Boolean) as { label: string; data: any[] }[];
    setSavedReports(reports);
  }, []);

  const datasets = [
    { label: "Tech & Social", data: mockData1 },
    { label: "Automotive & Aerospace", data: mockData2 },
    { label: "Beverage & Consumer", data: mockData3 },
    { label: "Electronics", data: mockData4 },
    ...savedReports,
  ];
  const [selected, setSelected] = useState(0);
  const currentData = datasets[selected].data;
  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold mb-2">Reports</h1>
      <div className="w-full mb-4">
        <div className={`grid gap-3 grid-cols-2 sm:grid-cols-4 ${datasets.length > 4 ? 'md:grid-cols-5 lg:grid-cols-6' : ''}`}>
          {datasets.map((ds, idx) => (
            <button
              key={ds.label}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border shadow-sm font-semibold transition-all duration-200
                ${selected === idx
                  ? "bg-gradient-to-r from-primary to-blue-500 text-white border-primary scale-105"
                  : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-primary"}
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              onClick={() => setSelected(idx)}
            >
              {/* Icon for each dataset */}
              {idx === 0 && (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><circle cx="11" cy="11" r="9" /><path d="M7 11h8M11 7v8" /></svg>
              )}
              {idx === 1 && (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500"><rect x="4" y="7" width="14" height="8" rx="2" /><path d="M7 7V5a4 4 0 0 1 8 0v2" /></svg>
              )}
              {idx === 2 && (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500"><ellipse cx="11" cy="11" rx="8" ry="9" /><path d="M11 2v18" /></svg>
              )}
              {idx === 3 && (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><rect x="5" y="5" width="12" height="12" rx="3" /><path d="M11 8v6" /></svg>
              )}
              {idx > 3 && (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
              <span className="truncate">{ds.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Revenue</span>
          <span className="font-bold text-lg">${currentData.reduce((sum: number, row: any) => sum + (Number(row.revenue) || 0), 0)}B</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Users</span>
          <span className="font-bold text-lg">{currentData.reduce((sum: number, row: any) => sum + (Number(row.users) || 0), 0).toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Conversions</span>
          <span className="font-bold text-lg">{currentData.reduce((sum: number, row: any) => sum + (Number(row.conversions) || 0), 0).toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-muted-foreground text-sm">Growth %</span>
          <span className="font-bold text-lg">{currentData.length > 0 ? (currentData.reduce((sum: number, row: any) => sum + (Number(row.growth) || 0), 0) / currentData.length).toFixed(2) : 0}%</span>
        </Card>
      </div>
      <div className="mt-10">
        <DataTable data={currentData} />
      </div>
      <div className="mt-10">
        <DashboardCharts data={currentData} />
      </div>
      <div className="mt-10">
        <CustomCharts data={currentData} />
      </div>
    </div>
  );
}
