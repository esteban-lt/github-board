import 'dotenv/config';
import { get } from 'env-var';

export const env = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asEnum(['development', 'production', 'test']) as 'development' | 'production' | 'test',
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  GITHUB_CLIENT_ID: get('GITHUB_CLIENT_ID').required().asString(),
  GITHUB_CLIENT_SECRET: get('GITHUB_CLIENT_SECRET').required().asString(), 
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString(),
  ENCRYPTION_KEY: get('ENCRYPTION_KEY').required().asString(),
}
