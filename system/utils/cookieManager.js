exports.setCookie = (res, name, value, expiry) => {
	res.cookie(name, value, {
		expires: expiry,
		httpOnly: true,
	});
};

exports.clearCookie = (res, name, value) => {
	res.cookie(name, value, {
		expires: new Date(Date.now() + 10),
		httpOnly: true,
	});
};
