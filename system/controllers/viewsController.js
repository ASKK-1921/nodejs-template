// --- DEPENDENCIES ---
const UAParser = require('ua-parser-js');

// --- MODELS ---

// --- UTILITIES ---
const cookieManager = require('../utils/cookieManager');

// --- CONTROLLER FUNCTIONS ---

// Check if browser is desktop or mobile
const checkMobile = (req) => {
	const parser = new UAParser();
	const ua = req.headers['user-agent'];
	return parser.setUA(ua).getDevice().type === 'mobile';
};

// Set Language to be used on LP and parent pages
const setLanguage = (req, res) => {
	let language = 'en';

	if (req.cookies.lang && req.cookies.lang === 'ja') {
		language = 'ja';
	}

	if (req.query.lang) {
		language = req.query.lang;
	}

	const expiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
	cookieManager.setCookie(res, 'lang', language, expiry);

	return language;
};

// --- GENERATE PAGES ---

// Root directory patch for EJS
exports.ejsRootPatch = (req, res, next) => {
	res.locals.viewsRoot = `${process.cwd()}/public/views`;
	next();
};

// Simple pages
exports.getPage = (page) => (req, res, next) => {
	const root = checkMobile(req) ? 'mobile/' : '';
	const language = setLanguage(req, res);
	const title = page.charAt(0).toUpperCase() + page.slice(1);
	return res.status(200).render(`${root}${language}/${page}.ejs`, { title });
};
