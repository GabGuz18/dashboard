'use client'

import { SidebarProvider, SideNavBar } from "@/components";

export default function DashboardLayout({ children }) {

  return (
    <SidebarProvider>
      <SideNavBar />
        <main className="w-full">
          {children}
        </main>
    </SidebarProvider>
  );
}