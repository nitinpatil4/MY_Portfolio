const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const seedDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345';

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    console.log('Default admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  console.log('✅ Default admin created');
  console.log(`📧 Email: ${email}`);
};

module.exports = seedDefaultAdmin;