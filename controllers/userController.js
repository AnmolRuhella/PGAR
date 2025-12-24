const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ status:'success', data: users });
  } catch (err) { next(err); }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ status:'error', message:'User not found' });
    res.json({ status:'success', data:user });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const allowed = ((req.user.role === 'superadmin') ? ['name','email','role','active'] : ['name','active']);
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ status:'success', data:user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status:'success', message:'User deleted' });
  } catch (err) { next(err); }
};
