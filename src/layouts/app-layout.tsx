import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutHeader } from "@/components/custom/layout-header";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <LayoutHeader />    
        <section className="p-4">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
