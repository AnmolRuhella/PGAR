const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stripePriceId: { type: String }, // if using Stripe
  price: { type: Number, required: true }, // in smallest currency unit if you prefer
  interval: { type: String, enum: ['monthly','yearly'], default: 'monthly' },
  features: [String],
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Plan', planSchema);
