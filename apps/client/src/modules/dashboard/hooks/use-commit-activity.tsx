import { useQuery } from "@tanstack/react-query"
import { getCommitActivityAction } from "../actions/get-commit-activity-action";

export const useCommitActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'commit-activity'],
    queryFn: getCommitActivityAction,
    staleTime: 1000 * 60 * 3,
  });
}
