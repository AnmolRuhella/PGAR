const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Types.ObjectId, ref: 'Plan', required: true },
  status: { type: String, enum: ['active','past_due','canceled','trialing'], default: 'trialing' },
  stripeSubscriptionId: { type: String },
  currentPeriodEnd: { type: Date },
  startedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
