const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: String, required: true, unique: true },
  password: { type: String }, // For protected meetings
  scheduledDate: { type: Date },
  expiryTime: { type: Date },
  isWaitingRoomEnabled: { type: Boolean, default: false },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date },
    leftAt: { type: Date }
  }],
  chatHistory: [{
    sender: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  recordingLink: { type: String },
  sharedFiles: [{
    filename: { type: String },
    url: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  }],
  status: { type: String, enum: ['scheduled', 'active', 'ended'], default: 'active' },
  durationMinutes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meeting', meetingSchema);
