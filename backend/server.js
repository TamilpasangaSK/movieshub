// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const UserModel = require('./models/User')
const RequestModel = require('./models/Request');
const AboutModel = require('./models/About');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/movieshub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Error:', err));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) 
            {
                if(user.password === password)
                {
                    res.json("Login Successful");
                }
                else 
                {
                res.json("invalid password");
                }
            } 
            else 
            {
                res.json("User not found");
            }    
        })
        .catch(err => res.status(500).json({ message: 'Server error', error: err }));
    });

app.post('/register', async(req, res) => {
   UserModel.create(req.body)
    .then(employe => res.json(employe))   
    .catch(err => res.json(err));
});

app.post('/request', async (req, res) => {
    RequestModel.create(req.body)
        .then(request => res.json(request))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }));
}); 

app.post('/about', async (req, res) => {
    AboutModel.create(req.body)
        .then(about => res.json(about))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
