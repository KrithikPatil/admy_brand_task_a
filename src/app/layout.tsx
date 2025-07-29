import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardShellWrapper from "@/components/DashboardShellWrapper"; // client-side shell wrapper

export const metadata: Metadata = {
  title: "ADmyBRAND",
  description: "A simple dashboard for ADmyBRAND",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <DashboardShellWrapper>{children}</DashboardShellWrapper>
      </body>
    </html>
  );
}
