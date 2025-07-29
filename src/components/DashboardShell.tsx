"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar: width 64 when open, width 0 when closed, overflow-hidden to hide content */}
      <div className={`transition-all duration-500 h-full ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}> 
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      {/* Main content: flex-1 min-w-0 ensures it fills available space and never overflows */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 bg-background transition-all duration-500 min-w-0">{children}</main>
      </div>
    </div>
  );
}
