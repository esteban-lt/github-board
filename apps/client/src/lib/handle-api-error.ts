import { ApiError } from '@/services/api-error';

export const handleApiError = (error: unknown): never => {
  throw ApiError.fromAxiosError(error);
};
