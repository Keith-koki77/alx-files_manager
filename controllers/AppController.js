const { redisClient, db } = require('../utils');

exports.getStatus = async (req, res) => {
  try {
    const redisAlive = await redisClient.ping();
    const dbAlive = await db.query('SELECT 1');
    res.status(200).json({ redis: redisAlive === 'PONG', db: dbAlive.rowCount > 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const usersCount = await db.query('SELECT COUNT(*) FROM users');
    const filesCount = await db.query('SELECT COUNT(*) FROM files');
    res.status(200).json({ users: usersCount.rows[0].count, files: filesCount.rows[0].count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
