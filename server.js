const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// MongoDB Atlas Connection String
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model
const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  availability: String,
  location: String
});

const Resource = mongoose.model('Resource', resourceSchema);

// API Endpoint to get resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to serve homepage.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homepage.html');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
