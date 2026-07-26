const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const meetingRoutes = require('./routes/meetingRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.send('MeetVerse Backend API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

// Socket.io for WebRTC signaling, Chat, and Whiteboard
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join Meeting Room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    // Chat Message
    socket.on('send-message', (message) => {
      io.to(roomId).emit('receive-message', { userId, message, time: new Date() });
    });

    // Whiteboard Drawing
    socket.on('draw', (drawData) => {
      socket.to(roomId).emit('receive-draw', drawData);
    });

    // Screen Sharing Signal
    socket.on('screen-share', (isSharing) => {
      socket.to(roomId).emit('user-screen-share', { userId, isSharing });
    });

    // Leave Meeting
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meetverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('MongoDB connection error:', err.message);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
