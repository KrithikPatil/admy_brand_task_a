"use client";
import React, { useRef, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadialBarChart, RadialBar } from "recharts";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DraggableLegend from "@/components/DraggableLegend";
import radarData from "@/data/mockRadarData.json";
import radialData from "@/data/mockRadialData.json";

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

export function CustomCharts({ data }: { data?: any[] | null }) {
  const [chartType, setChartType] = React.useState("line");
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [scrollNeeded, setScrollNeeded] = useState(false);
  const safeData = data ?? null;
  const numericCols = guessNumericColumns(safeData);
  const categoryCol = guessCategoryColumn(safeData);
  const yKey = numericCols[0];
  const xKey = categoryCol || numericCols[1] || Object.keys(safeData?.[0] || {})[0];

  // Default demo data if no upload
  const demo = !safeData || !yKey;
  const chartData = demo
    ? [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 800 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 1200 },
      { name: "May", value: 900 },
      { name: "Jun", value: 1700 },
    ]
    : (safeData as any[]).map((row: any, i: number) => ({
      ...row,
      name: row[xKey] || i + 1,
      value: Number(row[yKey]),
    }));

  // Coerce radialData values to numbers and filter out invalid entries (for radial chart only)
  const validRadialData = (radialData ?? [])
    .map((entry) => ({
      ...entry,
      value: Number(entry.value)
    }))
    .filter((entry) => Number.isFinite(entry.value));

  useEffect(() => {
    // Check if chart area overflows the card
    const card = chartAreaRef.current?.parentElement;
    const chart = chartAreaRef.current;
    if (card && chart) {
      setScrollNeeded(chart.scrollWidth > card.clientWidth);
    }
  }, [chartType, chartData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mt-8"
    >
      <Card className={`p-6 flex flex-col gap-4 ${scrollNeeded ? 'overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/40 scrollbar-track-transparent' : ''}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          <Button variant={chartType === "line" ? "default" : "outline"} onClick={() => setChartType("line")}>Line</Button>
          <Button variant={chartType === "bar" ? "default" : "outline"} onClick={() => setChartType("bar")}>Bar</Button>
          <Button variant={chartType === "pie" ? "default" : "outline"} onClick={() => setChartType("pie")}>Pie</Button>
          <Button variant={chartType === "radar" ? "default" : "outline"} onClick={() => setChartType("radar")}>Radar</Button>
          <Button variant={chartType === "radial" ? "default" : "outline"} onClick={() => setChartType("radial")}>Radial</Button>
        </div>
        {/* Chart area with fixed min width for legend overflow */}
        <div ref={chartAreaRef} className="min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
          {chartType === "line" && (
            <ResponsiveContainer width="100%" height={220}>
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
            <ResponsiveContainer width="100%" height={220}>
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
            <div className="flex flex-col items-center w-full">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom legend below chart, visually contained with scroll if needed */}
              <div
                className="w-full flex flex-wrap justify-center items-center gap-4 pt-2 max-h-[80px] md:max-h-[120px] lg:max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/40 scrollbar-track-transparent rounded bg-muted/40 px-2"
                style={{
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {chartData.map((entry, idx) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm px-2 py-1 rounded bg-muted">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ background: COLORS[idx % COLORS.length] }} />
                    <span className="truncate max-w-[80px]" title={entry.name}>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {chartType === "radar" && (
            <div className="flex flex-col items-center w-full">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius={90} data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                  {Object.keys(radarData[0])
                    .filter((k) => k !== "metric")
                    .map((company, idx) => (
                      <Radar
                        key={company}
                        name={company}
                        dataKey={company}
                        stroke={COLORS[idx % COLORS.length]}
                        fill={COLORS[idx % COLORS.length]}
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                    ))}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <DraggableLegend
                data={Object.keys(radarData[0])
                  .filter((k) => k !== "metric")
                  .map((company, idx) => ({
                    name: company,
                    value: radarData.reduce((sum, d) => sum + (Number(d[company as keyof typeof d]) || 0), 0)
                  }))}
              />
            </div>
          )}

          {chartType === "radial" && (
            <div className="flex flex-col items-center w-full">
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="90%"
                  barSize={18}
                  data={validRadialData}
                >
                  <RadialBar
                    dataKey="value"
                    background
                    cornerRadius={5}
                  >
                    {validRadialData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </RadialBar>
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
              <DraggableLegend
                data={validRadialData.map((entry, idx) => ({
                  name: entry.name,
                  value: entry.value,
                  color: COLORS[idx % COLORS.length],
                }))}
              />
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {demo
            ? "Showing demo data. Upload a dataset to see your own charts. Radar/Radial charts use mock data."
            : `Charting column: ${yKey}${xKey ? ` vs ${xKey}` : ""}`}
        </div>
        {/* Visual scroll indicator if scroll is needed */}
        {scrollNeeded && (
          <div className="w-full h-2 mt-2 flex items-center justify-center">
            <div className="w-16 h-1 bg-primary/30 rounded-full animate-pulse" />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
