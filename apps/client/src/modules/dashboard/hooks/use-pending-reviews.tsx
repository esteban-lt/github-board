import { useQuery } from "@tanstack/react-query"
import { getPendingReviewsAction } from "../actions/get-pending-reviews-action"

export const usePendingReviews = () => {
  return useQuery({
    queryKey: ['dashboard', 'pending-reviews'],
    queryFn: getPendingReviewsAction,
    staleTime: 1000 * 60 * 1,
  });
}
