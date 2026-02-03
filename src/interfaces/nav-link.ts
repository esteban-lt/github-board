import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}
