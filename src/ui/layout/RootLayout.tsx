import * as React from "react";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/ui/components/AppSidebar.tsx";
import {AppHeader} from "@/ui/components/AppHeader.tsx";
import {AppFooter} from "@/ui/components/AppFooter.tsx";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4">
          {children}
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}