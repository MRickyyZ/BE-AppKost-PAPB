const express = require('express');
const cors = require('cors'); // Import cors
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const kostRoutes = require('./routes/kostRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/kost', kostRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
