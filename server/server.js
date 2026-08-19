require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const seedDefaultAdmin = require('./utils/seedAdmin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// Connect DB → Create default admin → Start server
const startServer = async () => {
  try {
    await connectDB();

    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();