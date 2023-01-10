const UAParser = require('ua-parser-js');
const languageManager = require('./languageManager');

const checkDevice = (req) => {
	const parser = new UAParser();
	const ua = req.headers['user-agent'];
	return parser.setUA(ua).getDevice().type === 'mobile';
};

module.exports = (req, res, page) => {
	const device = checkDevice(req) ? 'mobile/' : 'desktop/';
	const lang = languageManager(req, res);
	const title = page.charAt(0).toUpperCase() + page.slice(1);

	return res.status(200).render(`${device}/${page}.ejs`, { title, lang });
};
