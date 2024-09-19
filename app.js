const express = require('express');
const userRouter = require('./routes/user');
const amarengaRouter = require('./routes/amarenga');
const announcementRouter = require('./routes/announcement');
const publicationsRouter = require('./routes/publications');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require('./db/db');

const port = process.env.PORT || 5000;
const app = express();

// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://gs-institut-filippo-smaldone.vercel.app',
  'https://gsifsnyamirambo.rw'
];

// Middleware to parse incoming requests as JSON
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow sending cookies with requests
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // restrict allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // restrict allowed headers
}));

// Cookie parser for handling cookies
app.use(cookieParser());

// Registering routers
app.use(userRouter);
app.use(amarengaRouter);
app.use(announcementRouter);
app.use(publicationsRouter);

// Root route for basic health check
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// Listening on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});