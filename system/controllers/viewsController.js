// --- DEPENDENCIES ---
const renderPage = require('../utils/renderPage');

// --- MODELS ---

// --- UTILITIES ---

// --- CONTROLLER FUNCTIONS ---

// --- GENERATE PAGES ---

// Simple pages
exports.getPage = (page) => (req, res, next) => {
	renderPage(req, res, page);
};
