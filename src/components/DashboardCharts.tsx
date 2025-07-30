"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LegendProps,
} from "recharts";
import DraggableLegend from '@/components/DraggableLegend';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 800 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 1200 },
  { name: "May", value: 900 },
  { name: "Jun", value: 1700 },
];

const barData = [
  { name: "Facebook", users: 2400 },
  { name: "Google", users: 1398 },
  { name: "Instagram", users: 9800 },
  { name: "LinkedIn", users: 3908 },
];

const pieData = [
  { name: "Organic", value: 400 },
  { name: "Paid", value: 300 },
  { name: "Referral", value: 300 },
  { name: "Social", value: 200 },
];

const COLORS = ["#6366f1", "#06b6d4", "#f59e42", "#f43f5e"];

export function DashboardCharts({ data }: { data?: any[] }) {
  const chartData = Array.isArray(data) && data.length > 0 ? data : undefined;

  const lineChartData = chartData
    ? chartData.map((row) => ({ name: row.name, value: row.revenue }))
    : lineData;

  const barChartData = chartData
    ? chartData.map((row) => ({ name: row.name, users: row.users }))
    : barData;

  const pieChartData = chartData
    ? chartData.map((row) => ({ name: row.name, value: row.conversions }))
    : pieData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Card>
          <h2 className="font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        <Card>
          <h2 className="font-semibold mb-4">Users by Channel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
        <Card>
          <h2 className="font-semibold mb-4">Conversions by Company</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <DraggableLegend data={pieChartData} />
        </Card>
      </motion.div>
    </div>
  );
}
