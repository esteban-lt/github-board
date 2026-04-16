import type { LucideIcon } from "lucide-react";

export interface DashboardStatCard {
  title: string;
  metric: number;
  caption: string;
  icon: LucideIcon;
  iconClassName?: string;
}
