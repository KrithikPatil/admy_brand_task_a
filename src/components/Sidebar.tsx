
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

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  // Ensure min-h-screen is only set on client to avoid hydration mismatch
  React.useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-muted/80 border-b sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img src="/logo.png" alt="Logo" />
          </Avatar>
          <span className="font-bold text-lg tracking-tight">ADmyBRAND</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 top-14 w-full bg-background shadow-lg border-b z-40 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2 hover:bg-accent transition-colors font-medium text-base"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex w-64 flex-shrink-0 bg-gradient-to-b from-muted/70 to-background border-r flex-col p-6 gap-8 shadow-lg${clientReady ? ' min-h-screen' : ''}`}> 
        <div className="flex items-center gap-3 mb-8">
          <Avatar className="h-10 w-10 ring-2 ring-primary">
            <img src="/logo.png" alt="Logo" />
          </Avatar>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ADmyBRAND</span>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors font-semibold text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto text-xs text-muted-foreground text-center">
          <span className="block font-semibold">© 2025 ADmyBRAND</span>
          <span className="block">All rights reserved.</span>
        </div>
      </aside>
    </>
  );
}
