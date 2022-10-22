import * as dotenv from "dotenv";
import path from "path"
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Environment variables mapped from .env file
export const config = {
  port: process.env.API_PORT ?? '',
  env: process.env.API_ENV ?? '',
  football_api_base_url: process.env.FOOTBALL_API_BASE_URL ?? '',
  football_api_token: process.env.FOOTBALL_API_TOKEN ?? ''
}