const Activity = require('../models/Activity');

exports.logActivity = (action) => async (req, res, next) => {
  try {
    // call after main handler or before? We'll capture here as pre-log
    await Activity.create({
      user: req.user ? req.user._id : null,
      action,
      meta: { path: req.path, method: req.method, body: req.body },
      ip: req.ip
    });
  } catch (e) {
    console.warn('Activity log failed', e.message);
  }
  next();
};
