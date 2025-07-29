"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">🌞</span>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <span className="text-xs">🌚</span>
    </div>
  );
}
