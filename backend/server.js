// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// require models after setting up handlers to get better errors
let UserModel, RequestModel, AboutModel;
try {
  UserModel = require('./models/User');
  RequestModel = require('./models/Request');
  AboutModel = require('./models/About');
  console.log('✅ Models loaded');
} catch (err) {
  console.error('❌ Failed to load models:', err && err.stack ? err.stack : err);
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Use env var for URI; encode special chars in password or set MONGO_URI in .env
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://iamsanthoshmca2022_db_user:dJCUoVZNYbYQSPKc@cluster0.p4pm5c8.mongodb.net/';

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongo connection error:', err && err.stack ? err.stack : err);
});
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongo disconnected');
});

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ DB Error (connect):', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

start();

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).exec();
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.password !== password) return res.status(401).json({ message: 'Invalid password' });
        return res.json({ message: 'Login Successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message || err });
    }
});

app.post('/register', async(req, res) => {
   try {
     const created = await UserModel.create(req.body);
     return res.status(201).json(created);
   } catch (err) {
     return res.status(400).json({ message: 'Create failed', error: err.message || err });
   }
});

app.post('/request', async (req, res) => {
    try {
      const request = await RequestModel.create(req.body);
      return res.status(201).json(request);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message || err });
    }
}); 

app.post('/about', async (req, res) => {
    try {
      const about = await AboutModel.create(req.body);
      return res.status(201).json(about);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message || err });
    }
});
