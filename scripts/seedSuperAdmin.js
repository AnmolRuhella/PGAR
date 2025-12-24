const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'superadmin@example.com' });
  if (!exists) {
    await User.create({ name: 'Super Admin', email: 'superadmin@example.com', password: 'SuperPass123', role: 'superadmin' });
    console.log('Superadmin created');
  } else console.log('Superadmin exists');
  process.exit();
};

run();
