import {
  Sidebar, SidebarContent, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import {useIsMobile} from "@/hooks/use-mobile.ts";

export function AppSidebar() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sidebar
      collapsible="offcanvas"
    >
      <SidebarHeader>
        <span className="font-bold px-2">Logo</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/">홈</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/about">소개</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
