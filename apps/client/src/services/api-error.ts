import axios from 'axios';

const FALLBACK_MESSAGE = 'An unexpected error occurred. Please try again.';

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }

  static fromAxiosError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? FALLBACK_MESSAGE;
      const statusCode = error.response?.status ?? 500;
      return new ApiError(message, statusCode);
    }

    return new ApiError(FALLBACK_MESSAGE, 500);
  }
}
