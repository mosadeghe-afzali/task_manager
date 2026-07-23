const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const projectRoutes = require('./project');
const teamRoutes = require('./team');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/projects', projectRoutes);
router.use('/teams', teamRoutes);

module.exports = router;