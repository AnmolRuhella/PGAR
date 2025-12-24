const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');

// controllers/subscriptionController.js
// Minimal stub so routes can load without stripe for now.

exports.createCheckoutSession = async (req, res, next) => {
  try {
    // TODO: Replace with real Stripe integration later
    res.json({ status: 'success', message: 'Checkout session (demo) — implement Stripe later' });
  } catch (err) {
    next(err);
  }
};

exports.webhookHandler = (req, res) => {
  // If you don't use webhooks now, simple 200 OK
  res.status(200).send('webhook endpoint (stub)');
};
