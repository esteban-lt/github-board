import { Link, useMatch } from "react-router";

import type { NavLink } from "@/interfaces/nav-link"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({ items }: { items: NavLink[] }) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const match = useMatch({ path: item.url, end: item.url === "/" });
          const isActive = Boolean(match);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
