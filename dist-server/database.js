"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        this.client = null;
        this.db = null;
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blacksheeps-guild';
        this.client = new mongodb_1.MongoClient(uri);
    }
    async connect() {
        try {
            if (!this.client) {
                throw new Error('MongoDB client not initialized');
            }
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME || 'blacksheeps-guild');
            console.log('Connected to MongoDB successfully');
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
    async disconnect() {
        if (this.client) {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        }
    }
    getDb() {
        if (!this.db) {
            throw new Error('Database not connected');
        }
        return this.db;
    }
    getCollection(name) {
        return this.getDb().collection(name);
    }
    async ping() {
        try {
            await this.getDb().admin().ping();
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.default = new Database();
