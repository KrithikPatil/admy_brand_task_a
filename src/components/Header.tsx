import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen?: boolean; setSidebarOpen?: (open: boolean) => void }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-500 relative">
      <div className="flex items-center gap-3">
        {/* Unified Sidebar Toggle Button for both mobile and desktop */}
        {typeof setSidebarOpen === 'function' && (
          <Button
            variant="ghost"
            size="icon"
            className={`transition-all duration-500 mr-2 ${sidebarOpen ? 'ml-0' : 'md:ml-[-1rem]'} md:inline-flex`}
            style={{ marginLeft: sidebarOpen ? 0 : (window.innerWidth >= 768 ? '-1rem' : 0) }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <span className="font-bold text-lg tracking-tight">ADmyBRAND Insights</span>
      </div>
      <ThemeToggle />
    </header>
  );
}
