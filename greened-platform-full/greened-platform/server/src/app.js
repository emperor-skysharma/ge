require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const challengeRoutes = require('./routes/challenges');
const submissionRoutes = require('./routes/submissions');
const forumRoutes = require('./routes/forums');
const analyticsRoutes = require('./routes/analytics');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(errorHandler);
module.exports = app;