// --- DEPENDENCIES ---
const UAParser = require('ua-parser-js');
const fs = require('fs');

// --- UTILITIES ---
const cookieManager = require('./cookieManager');


// --- CONTROLLER FUNCTIONS ---

// Check if the device is mobile or desktop
const checkDevice = (req) => {
	const parser = new UAParser();
	const ua = req.headers['user-agent'];
	return parser.setUA(ua).getDevice().type === 'mobile';
};

// Get or set the user's langauge preference and deliver
// the appropriate language pack for the requested page.
const setLanguage = (req, res) => {
	let language = req.query.lang ? req.query.lang : req.cookies.lang || 'en';
	const languageFiles = `./public/languages`;

	if (!fs.existsSync(`${languageFiles}/${language}.json`)) {
		language = 'en';
	}

	if (!req.cookies.lang || req.query.lang !== req.cookies.lang) {
		const expiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
		cookieManager.setCookie(res, 'lang', language, expiry);
	}

	const languageData = fs.readFileSync(`${languageFiles}/${language}.json`);
	const languagePack = JSON.parse(languageData);

	return languagePack[`${req.url}`];
};

// --- EXPORTS ---
module.exports = (req, res, page) => {
	const device = checkDevice(req) ? 'mobile/' : 'desktop/';
	const lang = setLanguage(req, res);
	const title = page.charAt(0).toUpperCase() + page.slice(1);

	return res.status(200).render(`${device}/${page}.ejs`, { title, lang });
};
