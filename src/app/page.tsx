

"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCharts } from "@/components/DashboardCharts";
import { CustomCharts } from "@/components/CustomCharts";
import { DatasetUploader } from "@/components/DatasetUploader";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);

  // Simple insights: count, columns, preview
  const insights = data && data.length > 0 ? (
    <Card className="p-6 mt-6 w-full max-w-2xl mx-auto">
      <h3 className="font-semibold mb-2">Dataset Insights</h3>
      <div className="text-sm mb-2">Rows: <b>{data.length}</b></div>
      <div className="text-sm mb-2">Columns: <b>{Object.keys(data[0] || {}).join(", ")}</b></div>
      <div className="overflow-x-auto">
        <table className="text-xs border w-full mt-2">
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((col) => (
                <th key={col} className="border px-2 py-1 bg-muted text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border px-2 py-1">{val as string}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-muted-foreground mt-2">Showing first 5 rows.</div>
      </div>
    </Card>
  ) : null;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <DatasetUploader onData={setData} />
      {insights}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {["Revenue", "Users", "Conversions", "Growth %"].map((label) => (
          <Card key={label} className="p-6 flex flex-col gap-2 shadow-sm">
            <span className="text-muted-foreground text-sm">{label}</span>
            <Skeleton className="h-8 w-24 rounded bg-muted" />
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <DashboardCharts />
      </div>
      <div className="mt-10">
        <CustomCharts data={data} />
      </div>
    </div>
  );
}
