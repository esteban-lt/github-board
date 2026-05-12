import { Link, useLocation, useParams } from "react-router";
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

type BreadcrumbSegment = {
  label: string;
  href?: string;
};

const ROUTE_LABELS: Record<string, string> = {
  "": "Dashboard",
  "activity-feed": "Activity Feed",
  "repositories": "Repositories",
  "connect": "Connect",
};

const useBreadcrumbs = (): BreadcrumbSegment[] => {
  const { pathname } = useLocation();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "Dashboard" }];
  }

  const crumbs: BreadcrumbSegment[] = [];

  // /activity-feed
  if (segments[0] === "activity-feed") {
    return [{ label: "Activity Feed" }];
  }

  // /repositories/*
  if (segments[0] === "repositories") {
    crumbs.push({ label: "Repositories", href: segments.length > 1 ? "/repositories" : undefined });

    if (segments[1] === "connect") {
      crumbs.push({ label: "Connect" });
    } else if (owner && repo) {
      crumbs.push({ label: `${owner}/${repo}` });
    }

    return crumbs;
  }

  segments.forEach((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    const label = ROUTE_LABELS[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push(isLast ? { label } : { label, href });
  });

  return crumbs;
};

export const Header = () => {
  
  const crumbs = useBreadcrumbs();

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
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-2">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.href!}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
