'use client';

import dynamic from 'next/dynamic';

const DashboardShell = dynamic(() =>
  import('@/components/DashboardShell').then((mod) => mod.DashboardShell),
  { ssr: false }
);

export default function DashboardShellWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
