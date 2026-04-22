import { Bell, BookMarked, ChevronDown, CircleDot, GitPullRequest, Plus, Puzzle, Search, Zap } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ButtonGroup } from "../ui/button-group";

export const Header = () => {
  return (
    <header className="flex h-12 shrink-0 justify-between items-center gap-2 px-4 border-b border-sidebar-border transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Module</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Submodule</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon-sm" aria-label="Search">
          <Search />
          <span className="sr-only">Search</span>
        </Button>

        <ButtonGroup>
          <Button variant="outline" size="icon-sm" aria-label="Notifications">
            <CircleDot />
            <span className="sr-only">View issues</span>
          </Button>

          <Button variant="outline" size="icon-sm" aria-label="Notifications">
            <GitPullRequest />
            <span className="sr-only">View pull requests</span>
          </Button>

          <Button variant="outline" size="icon-sm" aria-label="Notifications">
            <BookMarked />
            <span className="sr-only">View repositories</span>
          </Button>
        </ButtonGroup>

        <Button variant="outline" size="icon-sm" aria-label="Notifications">
          <Bell />
          <span className="sr-only">View notifications</span>
        </Button>
      </div>
    </header>
  );
};
