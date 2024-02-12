import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller

  // should return if Redis is alive and if the DB is alive
  router.get('/status', async (req, res) => {
    try {
      const redisStatus = await redis.ping();
      const dbStatus = await db.query('SELECT NOW()');
      res.status(200).json({ redis: redisStatus, db: dbStatus.rowCount });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // should return the number of users and files in DB
  router.get('/stats', async (req, res) => {
    try {
      const usersCount = await db.query('SELECT COUNT(*) FROM users');
      const filesCount = await db.query('SELECT COUNT(*) FROM files');
      res.status(200).json({ users: usersCount.rows[0].count, files: filesCount.rows[0].count });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // User Controller

  // should create a new user in DB
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // should retrieve the user base on the token used
  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // Auth Controller

  // should sign-in the user by generating a new authentication token
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // should sign-out the user based on the token
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Files Controller

  // should create a new file in DB and in disk
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });

  // should retrieve the file document based on the ID
  router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
  });

  // should retrieve all users file documents for a
  // specific parentId and with pagination
  router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
  });

  // should set isPublic to true on the file document based on the ID
  router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
  });

  // should set isPublic to false on the file document based on the ID
  router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
  });

  // should return the content of the file document based on the ID
  router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
  });
}

export default controllerRouting;
