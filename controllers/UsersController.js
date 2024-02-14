import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    try {
      const { email, password } = request.body;

      if (!email) {
        return response.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return response.status(400).json({ error: 'Missing password' });
      }

      const usersCollection = dbClient.db.collection('users');

      const existingUser = await usersCollection.findOne({ email });

      if (existingUser) {
        return response.status(400).json({ error: 'Already exist' });
      }

      const hashedPassword = sha1(password);

      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      const newUser = {
        id: result.insertedId,
        email,
      };

      return response.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating new user:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
