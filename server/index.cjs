const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blacksheeps';
let db;
let mongoClient;

// Mock storage for when MongoDB is not available
let mockEvents = [
  {
    _id: '1',
    title: 'Guild Meeting',
    description: 'Monthly guild meeting to discuss strategies',
    date: new Date('2025-07-15T19:00:00Z'),
    type: 'meeting',
    time: '19:00',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'War of Emperium',
    description: 'Weekly WoE event',
    date: new Date('2025-07-12T20:00:00Z'),
    type: 'pvp',
    time: '20:00',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let nextMockId = 3;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
async function initDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000
    });
    await mongoClient.connect();
    db = mongoClient.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    console.log('Running in mock mode without database');
    // Don't exit, just run without database for demo purposes
  }
}

// Middleware to check database connection
const requireDB = (req, res, next) => {
  // Always proceed - we'll use mock data if database is not available
  next();
};

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ 
        status: 'error', 
        database: 'disconnected',
        message: 'Database not connected'
      });
    }
    await db.admin().ping();
    res.json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Health check failed',
      error: error.message
    });
  }
});

// Get all events
app.get('/api/events', requireDB, async (req, res) => {
  try {
    if (db) {
      const events = await db.collection('events').find({}).toArray();
      res.json(events);
    } else {
      // Use mock data when database is not available
      res.json(mockEvents);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch events',
      message: error.message
    });
  }
});

// Get events by date range
app.get('/api/events/range', requireDB, async (req, res) => {
  try {
    const { start, end } = req.query;
    
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }

    const events = await db.collection('events').find({
      date: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    }).toArray();

    res.json(events);
  } catch (error) {
    console.error('Error fetching events by range:', error);
    res.status(500).json({ 
      error: 'Failed to fetch events',
      message: error.message
    });
  }
});

// Create a new event
app.post('/api/events', requireDB, async (req, res) => {
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

    if (db) {
      const result = await db.collection('events').insertOne(event);
      const newEvent = await db.collection('events').findOne({ _id: result.insertedId });
      res.status(201).json(newEvent);
    } else {
      // Use mock storage
      const newEvent = {
        _id: String(nextMockId++),
        ...event
      };
      mockEvents.push(newEvent);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      error: 'Failed to create event',
      message: error.message
    });
  }
});

// Update an event
app.put('/api/events/:id', requireDB, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, type, time } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const updateData = {
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = new Date(date);
    if (type !== undefined) updateData.type = type;
    if (time !== undefined) updateData.time = time;

    const result = await db.collection('events').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.value);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ 
      error: 'Failed to update event',
      message: error.message
    });
  }
});

// Delete an event
app.delete('/api/events/:id', requireDB, async (req, res) => {
  try {
    const { id } = req.params;

    if (db) {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const result = await db.collection('events').deleteOne({ 
        _id: new ObjectId(id) 
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json({ message: 'Event deleted successfully' });
    } else {
      // Use mock storage
      const eventIndex = mockEvents.findIndex(event => event._id === id);
      
      if (eventIndex === -1) {
        return res.status(404).json({ error: 'Event not found' });
      }

      mockEvents.splice(eventIndex, 1);
      res.json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ 
      error: 'Failed to delete event',
      message: error.message
    });
  }
});

// User tracking system
const activeUsers = new Map(); // sessionId -> { lastSeen, userAgent, ip }
const USER_TIMEOUT = 30000; // 30 seconds timeout

// Clean up inactive users periodically
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, user] of activeUsers.entries()) {
    if (now - user.lastSeen > USER_TIMEOUT) {
      activeUsers.delete(sessionId);
    }
  }
}, 10000); // Check every 10 seconds

// User heartbeat endpoint
app.post('/api/user/heartbeat', (req, res) => {
  try {
    const { sessionId } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    activeUsers.set(sessionId, {
      lastSeen: Date.now(),
      userAgent,
      ip
    });
    
    res.json({ 
      success: true, 
      activeUsers: activeUsers.size,
      sessionId 
    });
  } catch (error) {
    console.error('Error updating user heartbeat:', error);
    res.status(500).json({ error: 'Failed to update heartbeat' });
  }
});

// Get active users count
app.get('/api/users/active', (req, res) => {
  try {
    // Clean up old users before returning count
    const now = Date.now();
    for (const [sessionId, user] of activeUsers.entries()) {
      if (now - user.lastSeen > USER_TIMEOUT) {
        activeUsers.delete(sessionId);
      }
    }
    
    res.json({ 
      activeUsers: activeUsers.size,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting active users:', error);
    res.status(500).json({ error: 'Failed to get active users count' });
  }
});

// Start server after database connection
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
