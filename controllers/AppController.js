import DBClient from '../utils/db.js';
import RedisClient from '../utils/redis.js';

/**
  * should return if Redis is alive and if the DB is alive too
  */
async function getStatus(req, res) {
  const redisAlive = RedisClient.isAlive();
  const dbAlive = await DBClient.isAlive();

  return res.status(200).json({
    redis: redisAlive,
    db: dbAlive
  });
}

/**
  * should return the number of users and files in DB:
  */
async function getStats(req, res) {

  const usersCount = await DBClient.nbUsers();
  const filesCount = await DBClient.nbFiles();

  return res.status(200).json({
    users: usersCount,
    files: filesCount
  });
}

export default {
  getStatus,
  getStats
};
