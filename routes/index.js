import express from 'express';
import UsersController from '../controllers/UsersController';
import AppController from '../controllers/AppController';


const router = express.Router();

router.get('/status', async (req, res) => {
  try {
    const status = await AppController.getStatus();
    res.status(200).json(status);
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await AppController.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const newUser = await UsersController.postNew(req, res);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
