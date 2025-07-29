
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar({ open = false, setOpen }: { open?: boolean; setOpen?: (open: boolean) => void }) {
  // Only render the mobile dropdown if open is true (controlled from header)
  return (
    <>
      {/* Mobile Dropdown (controlled from header) */}
      {open && (
        <div className="md:hidden absolute left-0 top-14 w-full bg-background shadow-lg border-b z-40">
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
          </nav>
        </div>
      )}
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 h-screen w-64 flex-shrink-0 bg-white/70 dark:bg-black/40 border-r border-white/30 dark:border-black/30 backdrop-blur-xl flex-col p-6 gap-8 shadow-2xl transition-all duration-500 group/sidebar ${open ? 'translate-x-0' : '-translate-x-80'} hover:scale-[1.025] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:backdrop-blur-2xl hover:border-primary/40`}
        style={{ zIndex: 99 }}
      >
        <div className="border-b border-white/20 dark:border-black/30 mb-4" />
        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-4 py-2 font-semibold text-lg transition-all duration-300 group/link overflow-hidden hover:bg-primary/10 hover:pl-7 focus:bg-primary/20 focus:outline-none group text-foreground"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-secondary opacity-0 group-hover/link:opacity-80 transition-all duration-300" />
              <span className="inline-block transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2 group-hover:text-primary">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
