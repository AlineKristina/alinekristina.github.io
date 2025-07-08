import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blacksheeps-guild';
    this.client = new MongoClient(uri);
  }

  async connect(): Promise<void> {
    try {
      if (!this.client) {
        throw new Error('MongoDB client not initialized');
      }
      
      await this.client.connect();
      this.db = this.client.db(process.env.DB_NAME || 'blacksheeps-guild');
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }

  getCollection(name: string): Collection {
    return this.getDb().collection(name);
  }

  async ping(): Promise<boolean> {
    try {
      await this.getDb().admin().ping();
      return true;
    } catch {
      return false;
    }
  }
}

export default new Database();
