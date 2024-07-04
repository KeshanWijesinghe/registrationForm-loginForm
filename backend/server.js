const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://viperkeshan619:j83qqpkKQF9vpYeX@book-store.894kkyb.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Book-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
const usersRoute = require('./routes/users');
app.use('/api/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
