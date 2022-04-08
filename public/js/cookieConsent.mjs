/* eslint-disable no-undef */
import 'cookieconsent';

const runCookies = () => {
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		// eslint-disable-next-line prefer-rest-params
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'INSERT-GTAG-HERE');
};

const checkForCookieConsent = () => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://www.googletagmanager.com/gtag/js?id=INSERT-GTAG-ID-HERE';
	document.head.appendChild(script);

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = '/css/cookieconsent.min.css';
	document.head.appendChild(link);

	window.cookieconsent.initialise({
		palette: {
			popup: {
				background: '#eaf7f7',
				text: '#5c7291',
			},
			button: {
				background: '#56cbdb',
				text: '#ffffff',
			},
		},
		position: 'bottom-right',
		type: 'opt-in',
		content: {
			href: '/cookies',
			target: '_self',
		},
		onInitialise: function (status) {
			if (status === cookieconsent.status.allow) runCookies();
		},
		onStatusChange: function () {
			if (this.hasConsented()) runCookies();
		},
	});
};

export { checkForCookieConsent, runCookies };
