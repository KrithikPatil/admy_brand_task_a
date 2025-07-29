"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COLORS = ["#6366f1", "#06b6d4", "#f59e42", "#f43f5e", "#22c55e", "#eab308"];

function guessNumericColumns(data: any[] | null): string[] {
  if (!data || !data.length) return [];
  const sample = data[0];
  return Object.keys(sample).filter(
    (k) => !isNaN(Number(sample[k])) && sample[k] !== ""
  );
}

function guessCategoryColumn(data: any[] | null): string | null {
  if (!data || !data.length) return null;
  const sample = data[0];
  const found = Object.keys(sample).find(
    (k) => isNaN(Number(sample[k])) && typeof sample[k] === "string"
  );
  return found ?? null;
}

export function CustomCharts({ data }: { data: any[] | null }) {
  const [chartType, setChartType] = React.useState("line");
  const numericCols = guessNumericColumns(data);
  const categoryCol = guessCategoryColumn(data);
  const yKey = numericCols[0];
  const xKey = categoryCol || numericCols[1] || Object.keys(data?.[0] || {})[0];

  // Default demo data if no upload
  const demo = !data || !yKey;
  const chartData = demo
    ? [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 800 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 1200 },
        { name: "May", value: 900 },
        { name: "Jun", value: 1700 },
      ]
    : data.map((row, i) => ({
        ...row,
        name: row[xKey] || i + 1,
        value: Number(row[yKey]),
      }));

  return (
    <Card className="p-6 flex flex-col gap-4 mt-8">
      <div className="flex flex-wrap gap-2 mb-2">
        <Button variant={chartType === "line" ? "default" : "outline"} onClick={() => setChartType("line")}>Line</Button>
        <Button variant={chartType === "bar" ? "default" : "outline"} onClick={() => setChartType("bar")}>Bar</Button>
        <Button variant={chartType === "pie" ? "default" : "outline"} onClick={() => setChartType("pie")}>Pie</Button>
      </div>
      {chartType === "line" && (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {chartType === "bar" && (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
      {chartType === "pie" && (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
      <div className="text-xs text-muted-foreground mt-2">
        {demo
          ? "Showing demo data. Upload a dataset to see your own charts."
          : `Charting column: ${yKey}${xKey ? ` vs ${xKey}` : ""}`}
      </div>
    </Card>
  );
}
