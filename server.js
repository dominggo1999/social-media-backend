require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Import routers here
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Morgan logger
// app.use(morgan('tiny'));

// Middleware
app.use(cors());
app.use(express.json()); // based on body parser
app.use(express.urlencoded());

// Use routers here
// Example             app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
