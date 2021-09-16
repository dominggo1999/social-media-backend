require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routers here
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Morgan logger
app.use(morgan('tiny'));

// Middleware
app.use(cors());
app.use(express.json()); // based on body parser
app.use(express.urlencoded({ extended: true }));

// Use routers here
// Example             app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);

console.log('Starting server');
// Connecting to mongodb atlas
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Start server only if database connection is success
    app.listen(PORT, (err) => {
      if(err) console.error(err);
      console.log(`Success! Your application is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
