// Dependencies
const express = require('express');

// Controllers
const viewsController = require('../controllers/viewsController');

// Initialise the router
const router = express.Router();

// Patch root directory for EJS files
router.use(viewsController.ejsRootPatch);

// Public area on the Landing Page
router.get('/', viewsController.getPage('home'));

module.exports = router;
