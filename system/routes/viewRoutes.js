// --- DEPENDENCIES ---
const express = require('express');

// --- CONTROLLERS ---
const viewsController = require('../controllers/viewsController');

// --- ROUTER ---
const router = express.Router();

// --- ROUTES ---

// Public pages
router.get('/', viewsController.getPage('home'));

// --- EXPORTS ---
module.exports = router;
