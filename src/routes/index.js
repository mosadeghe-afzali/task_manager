const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./project');
const teamRoutes = require('./team');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/teams', teamRoutes);

module.exports = router;