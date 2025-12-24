const Subscription = require('../models/Subscription');

exports.requireActiveSubscription = async (req, res, next) => {
  const sub = await Subscription.findOne({ user: req.user._id, status: 'active' }).populate('plan');
  if (!sub) return res.status(402).json({ status:'error', message:'Active subscription required' });
  req.subscription = sub;
  next();
};
