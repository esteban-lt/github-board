"use client"

import * as React from "react"
import {
  Activity,
  BookMarked,
  FolderOpen,
  GalleryVerticalEnd,
  Layers,
  LayoutDashboard,
  Puzzle,
  Settings2,
  UsersRound,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavOrganization } from "@/components/nav-organization"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Esteban Ledezma",
    email: "estebanlt@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Repositories",
      url: "#",
      icon: BookMarked,
    },
    {
      title: "Activity Feed",
      url: "#",
      icon: Activity,
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
  ],
  projects: [
    {
      title: "Teams",
      url: "#",
      icon: Layers,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderOpen,
    },
    {
      title: "Users",
      url: "#",
      icon: UsersRound,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOrganization items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
