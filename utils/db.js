import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
    constructor() {
        this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}/`, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(DB_DATABASE);
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            this.client.close();
        }
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const usersCollection = this.db.collection('users');
        const count = await usersCollection.countDocuments();
        return count;
    }

    async nbFiles() {
        const filesCollection = this.db.collection('files');
        const count = await filesCollection.countDocuments();
        return count;
    }
}

const dbClient = new DBClient();

export default dbClient;
