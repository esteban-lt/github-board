import dashboardApi from "../api/dashboard-api";

export const getCommitActivityAction = async () => {
  try {
    const response = await dashboardApi.getCommitActivity();
    return response.data;
  } catch(error) {
    throw new Error('Error getting commit activity');
  }
}
