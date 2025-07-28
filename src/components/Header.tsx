import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg tracking-tight">ADmyBRAND Insights</span>
      </div>
      <ThemeToggle />
    </header>
  );
}
