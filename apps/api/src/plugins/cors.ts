import cors from 'cors';
import { env } from './env';

export const corsAdapter = cors({
  origin: env.FRONTEND_URL,
  credentials: true,
});
