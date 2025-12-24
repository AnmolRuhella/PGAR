const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, 
  meta: { type: mongoose.Schema.Types.Mixed }, 
  ip: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
