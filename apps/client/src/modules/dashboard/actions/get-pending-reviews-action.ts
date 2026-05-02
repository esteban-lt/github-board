import dashboardApi from '../api/dashboard-api';

export const getPendingReviewsAction = async () => {
  try {
    const response = await dashboardApi.getPendingReviews();
    return response.data;
  } catch(error) {
    throw new Error('Error getting pending reviews');
  }
}

