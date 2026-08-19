require('dotenv').config();

const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      username: 'admin',
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const admin = await Admin.create({
      username: 'admin',
      password: 'Admin@12345',
    });

    console.log('Admin created successfully.');
    console.log('Username:', admin.username);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();