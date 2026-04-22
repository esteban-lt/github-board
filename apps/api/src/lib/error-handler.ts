import type { Response } from 'express';
import { ResponseError } from './response-error';

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof ResponseError) return res.status(error.statusCode).json({ error: error.message });
  console.log(error);
  return res.status(500).json({ error: 'Internal server error' });
}
