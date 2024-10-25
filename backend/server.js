const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'your_mongo_connection_string_here'; // Replace with your actual connection string
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Personalized Fitness & Nutrition API!');
});

// User Schema
const userSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  goal: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Endpoint to receive user data
app.post('/api/user', (req, res) => {
  const userData = new User(req.body);
  userData.save()
    .then(() => res.status(201).send({ message: 'User data saved successfully!' }))
    .catch(err => res.status(500).send({ error: 'Error saving user data' }));
});

// Endpoint to get user data (for testing)
app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ error: 'Error fetching user data' }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
