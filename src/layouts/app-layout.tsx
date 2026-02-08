import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/app-layout/header";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />    
        <section className="flex flex-col gap-4 p-4">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
