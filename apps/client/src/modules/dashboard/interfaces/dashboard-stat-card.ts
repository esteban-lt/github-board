import type { LucideIcon } from "lucide-react";

export interface StatTrend {
  value: number;
  label: string;
  type: 'delta' | 'percent';
}

export interface DashboardStatCard {
  title: string;
  metric: number;
  caption?: string;
  trend?: StatTrend | null;
  icon?: LucideIcon;
  iconClassName?: string;
  sparkline?: number[];
}
