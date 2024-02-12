import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

// Add the isAlive method to the redisClient object
redisClient.isAlive = async function () {
  try {
    await this.ping();
    return true;
  } catch (error) {
    console.error('Redis is not alive', error);
    return false;
  }
};

// Add the isAlive method to the dbClient object
dbClient.isAlive = async function () {
  try {
    await this.authenticate();
    return true;
  } catch (error) {
    console.error('DB is not alive', error);
    return false;
  }
};

// Add the nbUsers and nbFiles methods to the dbClient object
dbClient.nbUsers = async function () {
  try {
    const users = await this.collection('users').countDocuments();
    return users;
  } catch (error) {
    console.error('Error counting users', error);
    return 0;
  }
};

dbClient.nbFiles = async function () {
  try {
    const files = await this.collection('files').countDocuments();
    return files;
  } catch (error) {
    console.error('Error counting files', error);
    return 0;
  }
};

export default AppController;
