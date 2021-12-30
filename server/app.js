const cors = require('cors');
const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogRoutes');
const authRouter = require('./routes/authRoutes');

// connecting to database
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:')
  });

// Middleware;
app.use(cors({
  origin: 'http://localhost:3000', // <-- location of the react app we are connecting to
  credentials: true
}))
app.use(express.json());

// connect to routes
app.use('/', authRouter);
app.use('/blog', blogsRouter);


module.exports = app;