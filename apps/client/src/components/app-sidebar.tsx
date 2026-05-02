import * as React from "react"
import {
  Activity,
  BookMarked,
  GalleryVerticalEnd,
  LayoutDashboard,
  Puzzle,
  Settings2,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/modules/auth/context/auth-context"

const data = {
  teams: [
    {
      name: "GitHub Board",
      logo: GalleryVerticalEnd,
      role: "Team Owner",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Activity Feed",
      url: "/activity-feed",
      icon: Activity,
    },
    {
      title: "Repositories",
      url: "/repositories",
      icon: BookMarked,
    },
    {
      title: "Automations",
      url: "#",
      icon: Zap,
    },
    {
      title: "Integrations",
      url: "#",
      icon: Puzzle,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
