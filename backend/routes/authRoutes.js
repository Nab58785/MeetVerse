const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper to ensure data dir & users file exist
const getUsersFromFile = () => {
  try {
    const dir = path.join(__dirname, '../data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf8');
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const saveUserToFile = (userData) => {
  try {
    const users = getUsersFromFile();
    users.push(userData);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving user to file:', err.message);
  }
};

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, phone, country, timeZone, profilePicture } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check local file
    const fileUsers = getUsersFromFile();
    const existingInFile = fileUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingInFile) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      id: Date.now().toString(),
      name: name || username || email.split('@')[0],
      username: username || '',
      email,
      password: hashedPassword,
      phone: phone || '',
      country: country || 'PK',
      timeZone: timeZone || 'Asia/Karachi',
      profilePicture: profilePicture || '',
      createdAt: new Date().toISOString()
    };

    // Save to local file
    saveUserToFile(userData);

    // Also try saving to MongoDB if available
    try {
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profilePicture: userData.profilePicture
      });
      await newUser.save();
    } catch (dbErr) {
      console.log('MongoDB save skipped/failed, saved to file:', dbErr.message);
    }

    return res.status(201).json({
      message: 'Account Registered Successfully!',
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check file users first
    const fileUsers = getUsersFromFile();
    let user = fileUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Fallback check MongoDB
      try {
        user = await User.findOne({ email });
      } catch (e) {}
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id || user._id, role: user.role || 'user' }, process.env.JWT_SECRET || 'supersecretjwt', {
      expiresIn: '1d'
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || ''
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get User Profile
router.get('/profile/:id', async (req, res) => {
  try {
    const fileUsers = getUsersFromFile();
    const user = fileUsers.find(u => u.id === req.params.id);
    if (user) {
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    }
    const dbUser = await User.findById(req.params.id).select('-password');
    res.status(200).json(dbUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
