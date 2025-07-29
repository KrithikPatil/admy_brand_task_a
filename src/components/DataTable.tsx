"use client";
import React, { useState, useMemo } from "react";

// Example data
type Row = {
  id: number;
  name: string;
  category: string;
  revenue: number;
};

export const initialData: Row[] = [
  { id: 1, name: "Google", category: "Search", revenue: 182 },
  { id: 2, name: "Facebook", category: "Social", revenue: 86 },
  { id: 3, name: "Amazon", category: "E-commerce", revenue: 386 },
  { id: 4, name: "Netflix", category: "Streaming", revenue: 25 },
  { id: 5, name: "Microsoft", category: "Tech", revenue: 143 },
  { id: 6, name: "Apple", category: "Tech", revenue: 274 },
  { id: 7, name: "Twitter", category: "Social", revenue: 3.7 },
  { id: 8, name: "Snapchat", category: "Social", revenue: 2.5 },
  { id: 9, name: "Spotify", category: "Streaming", revenue: 9.7 },
  { id: 10, name: "Shopify", category: "E-commerce", revenue: 2.9 },
];

const columns: { key: keyof Row; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "revenue", label: "Revenue ($B)" },
];

function sortData(data: Row[], sortKey: keyof Row, sortOrder: "asc" | "desc"): Row[] {
  return [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

export default function DataTable({ data }: { data?: any[] | null }) {
  // Use uploaded data if provided, else fallback to initialData
  const tableData = Array.isArray(data) && data.length > 0 ? data : initialData;

  // Dynamically generate columns from data if available
  const dynamicColumns = useMemo(() => {
    if (tableData.length > 0) {
      return Object.keys(tableData[0]).map((key) => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }));
    }
    return columns;
  }, [tableData]);

  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<string>(dynamicColumns[0]?.key || "");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Filtering
  const filteredData = useMemo(() => {
    if (!filter) return tableData;
    return tableData.filter((row) =>
      dynamicColumns.some((col) => String(row[col.key]).toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, tableData, dynamicColumns]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  // Handlers
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-white dark:bg-black/40 rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 w-full md:w-64 bg-background text-foreground"
        />
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <button
            className="px-2 py-1 rounded bg-accent text-accent-foreground disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >Prev</button>
          <button
            className="px-2 py-1 rounded bg-accent text-accent-foreground disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >Next</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/60">
              {dynamicColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left cursor-pointer select-none hover:bg-accent transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1 text-xs">{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={dynamicColumns.length} className="text-center py-6 text-muted-foreground">No data found.</td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr key={row.id ?? i} className="border-b hover:bg-primary/10 transition-colors">
                  {dynamicColumns.map((col) => (
                    <td key={col.key} className="px-4 py-2 whitespace-nowrap">{row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
