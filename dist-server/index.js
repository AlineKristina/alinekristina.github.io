"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const isConnected = await database_1.default.ping();
        res.json({
            status: 'ok',
            database: isConnected ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Health check failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await database_1.default.getCollection('events').find({}).toArray();
        res.json(events);
    }
    catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            error: 'Failed to fetch events',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get events by date range
app.get('/api/events/range', async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ error: 'Start and end dates are required' });
        }
        const events = await database_1.default.getCollection('events').find({
            date: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        }).toArray();
        res.json(events);
    }
    catch (error) {
        console.error('Error fetching events by range:', error);
        res.status(500).json({
            error: 'Failed to fetch events',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Create a new event
app.post('/api/events', async (req, res) => {
    try {
        const { title, description, date, type, time } = req.body;
        // Validation
        if (!title || !date || !type) {
            return res.status(400).json({
                error: 'Missing required fields: title, date, and type are required'
            });
        }
        const event = {
            title,
            description: description || '',
            date: new Date(date),
            type,
            time: time || '',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await database_1.default.getCollection('events').insertOne(event);
        if (result.insertedId) {
            const newEvent = await database_1.default.getCollection('events').findOne({ _id: result.insertedId });
            res.status(201).json(newEvent);
        }
        else {
            throw new Error('Failed to insert event');
        }
    }
    catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({
            error: 'Failed to create event',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Update an event
app.put('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, type, time } = req.body;
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }
        const updateData = {
            ...(title && { title }),
            ...(description !== undefined && { description }),
            ...(date && { date: new Date(date) }),
            ...(type && { type }),
            ...(time !== undefined && { time }),
            updatedAt: new Date()
        };
        const result = await database_1.default.getCollection('events').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updateData });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const updatedEvent = await database_1.default.getCollection('events').findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json(updatedEvent);
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({
            error: 'Failed to update event',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Delete an event
app.delete('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }
        const result = await database_1.default.getCollection('events').deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({
            error: 'Failed to delete event',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Start server
async function startServer() {
    try {
        await database_1.default.connect();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`API endpoints available at http://localhost:${PORT}/api`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down server...');
    await database_1.default.disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\nShutting down server...');
    await database_1.default.disconnect();
    process.exit(0);
});
startServer();
