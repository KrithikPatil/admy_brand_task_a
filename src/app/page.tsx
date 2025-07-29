

"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCharts } from "@/components/DashboardCharts";
import { CustomCharts } from "@/components/CustomCharts";
import { DatasetUploader } from "@/components/DatasetUploader";
import { useState } from "react";
import DataTable from "@/components/DataTable";

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);

  // Only show insights if no dataset is uploaded (showing default data)
  const insights = null; // Dataset insights removed

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
        <DataTable data={data} />
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
