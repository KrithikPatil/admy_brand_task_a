"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview", icon: <Home size={18} /> },
  { href: "/reports", label: "Reports", icon: <BarChart2 size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export function Sidebar({ open = false, setOpen }: { open?: boolean; setOpen?: (open: boolean) => void }) {
  return (
    <>
      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 top-14 w-full bg-background shadow-lg border-b z-40">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Avatar className="w-8 h-8" />
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-muted-foreground text-xs">john@example.com</div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2 hover:bg-accent transition-colors font-medium text-base text-foreground"
                onClick={() => setOpen && setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-border pt-2 flex flex-col gap-1">
              <Link
                href="/profile"
                className="rounded px-3 py-2 hover:bg-accent transition-colors font-medium text-base text-foreground"
                onClick={() => setOpen && setOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setOpen && setOpen(false);
                  // handle logout logic here
                }}
                className="rounded px-3 py-2 hover:bg-accent transition-colors font-medium text-base text-foreground text-left"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white/80 dark:bg-zinc-900/60 border-r backdrop-blur-lg p-6 shadow-xl flex-col justify-between transition-all duration-500 ${open ? "translate-x-0" : "-translate-x-80"
          }`}
        style={{ zIndex: 99 }}
      >
        <div>
          {/* User Profile (Top) */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-10 h-10 border" />
            <div>
              <p className="font-semibold text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-white/20 dark:border-black/30 mb-4" />

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 rounded-md px-4 py-2 text-foreground font-medium text-sm hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <span className="text-muted-foreground group-hover:text-primary">
                  {link.icon}
                </span>
                <span className="group-hover:scale-105 transition-transform">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-white/20 dark:border-black/30 pt-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition"
          >
            <User size={18} />
            Profile
          </Link>
          <Button variant="ghost" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
