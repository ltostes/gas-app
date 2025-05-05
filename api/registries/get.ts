import { Redis } from '@upstash/redis';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { config } from 'dotenv';

// Load .env.local instead of default .env
config({ path: '.env.local' });

// Initializing Redis connection with env variables
const redis = Redis.fromEnv();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { key } = req.query;
  
  const val:Object = await redis.get(key.toString());

  res.writeHead(200);
  
  const response = await JSON.stringify(val);
  res.write(response);
  
  res.end();
}