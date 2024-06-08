import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASS
} =  process.env

const redis = new Redis({
  host: REDIS_HOST || '127.0.0.1',
  port: Number(REDIS_PORT || 6379),
  username: REDIS_USERNAME || 'your_redis_username',
  password: REDIS_PASS || 'your_redis_password'
});

export default redis;