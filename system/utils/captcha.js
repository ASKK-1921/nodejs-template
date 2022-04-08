const svgCaptcha = require('svg-captcha');

exports.getCaptchaDeck = (req, res, next) => {
	const setCount = parseInt(req.query.setCount, 10) || 3;
	const captchaDeck = [];
	for (let i = 0; i < setCount; i++) {
		const captcha = svgCaptcha.create({
			size: 6,
			ignoreChars: '0Oo1lIi',
			noise: 1,
		});
		captchaDeck.push({ image: captcha.data, text: captcha.text });
	}

	return res.status(200).json({ status: 'success', captchaDeck });
};
