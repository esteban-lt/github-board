import { useQuery } from '@tanstack/react-query';
import { getDashboardStatsAction } from '../actions/get-dashboard-stats-action';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStatsAction,
    staleTime: 1000 * 60 * 3,
  });
}
