const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// Create a Meeting
router.post('/create', async (req, res) => {
  try {
    const { title, hostId, isWaitingRoomEnabled, password } = req.body;
    
    // Generate unique Room ID
    const roomId = Math.random().toString(36).substring(2, 10);

    const newMeeting = new Meeting({
      title,
      host: hostId,
      roomId,
      password,
      isWaitingRoomEnabled
    });

    await newMeeting.save();
    res.status(201).json({ message: 'Meeting created', meeting: newMeeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User's Meetings (Dashboard & Meeting History)
router.get('/user/:userId', async (req, res) => {
  try {
    const meetings = await Meeting.find({ host: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join a Meeting
router.post('/join', async (req, res) => {
  try {
    const { roomId, password, userId } = req.body;
    
    const meeting = await Meeting.findOne({ roomId });
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    if (meeting.password && meeting.password !== password) {
      return res.status(401).json({ message: 'Invalid meeting password' });
    }

    if (userId) {
      // Add participant logic
      meeting.participants.push({ user: userId, joinedAt: new Date() });
      await meeting.save();
    }

    res.status(200).json({ message: 'Joined successfully', meeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
