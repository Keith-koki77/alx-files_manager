import dbUtils from '../utils/db';
import redisUtils from '../utils/redis';

const AppController = {
  /**
   * should return if Redis is alive and if the DB is alive too
   */
  async getStatus(req, res) {
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();

    if (redisIsAlive && dbIsAlive) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(500).json({ redis: redisIsAlive, db: dbIsAlive });
    }
  },


  /**
   * should return the number of users and files in DB:
   */
  async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.eroor('Error getting stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default AppController;
