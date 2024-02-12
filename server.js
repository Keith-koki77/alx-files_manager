import express from 'express';
import loadRoutes from './routes';
import redisUtils from './utils/redis';
import dbUtils from './utils/db';

const app = express();
const PORT = process.env.PORT || 5000;

loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbUtils.connect();
  redisUtils.connect();
});
