const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const projectRoutes = require('./project');
const teamRoutes = require('./team');
const taskRoutes = require('./task');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/projects', projectRoutes);
router.use('/teams', teamRoutes);
router.use('/tasks', taskRoutes)

module.exports = router;