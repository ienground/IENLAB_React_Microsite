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
          <div className="flex flex-col">
            <div className="w-full h-16" />
            {children}
          </div>
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}