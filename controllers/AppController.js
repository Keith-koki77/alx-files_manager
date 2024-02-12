import dbUtils from '../utils/db';
import redisUtils from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
    const dbStatus = await dbUtils.isConnected();
    const redisStatus = await redisUtils.isAlive();

    return res.status(200).json({
      redis: redisStatus,
      db: dbStatus,
    });
  }

  static async getStats(req, res) {
    const usersCount = await dbUtils.db.collection('users').countDocuments();
    const filesCount = await dbUtils.db.collection('files').countDocuments();

    return res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  }
}

export default AppController;
