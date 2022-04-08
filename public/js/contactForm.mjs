import axios from 'axios';
import * as emailModule from './email.mjs';

const activateForm = (form) => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.querySelector('#contact_name').value;
		const email = document.querySelector('#contact_email').value;
		const subject = document.querySelector('#contact_subject').value;
		const message = document.querySelector('#contact_message').value;
		emailModule.sendContactEmail(name, email, subject, message);
	});
};

const activateCaptcha = (captcha) => {
	// Captcha DOM elements
	const image = document.querySelector('#captcha_img');
	const input = document.querySelector('#captcha_input');
	const checkButton = document.querySelector('.check_captcha');
	const submitButton = document.querySelector('#submit');
	const test = document.querySelector('#captcha_test');
	const errorMsg = document.querySelector('#captcha_error');

	// Variables to manage captcha data
	let captchaDeck;
	let answer;

	// Set the captcha image and answer text
	const setCaptcha = () => {
		const blob = new Blob([captchaDeck[captchaDeck.length - 1].image], {
			type: 'image/svg+xml',
		});
		const url = URL.createObjectURL(blob);
		image.src = url;
		answer = captchaDeck[captchaDeck.length - 1].text;
		captchaDeck.pop();
	};

	// Test the answer submitted by the user
	checkButton.addEventListener('click', (e) => {
		e.preventDefault();
		if (input.value === answer) {
			captcha.style.display = 'none';
			submitButton.style.display = 'block';
		} else if (captchaDeck.length <= 0) {
			test.style.display = 'none';
			errorMsg.style.visibility = 'visible';
		} else {
			setCaptcha();
		}
	});

	// Get new deck of captchas on page load
	(async () => {
		const res = await axios({
			method: 'GET',
			url: '/api/v2/utils/contactcaptcha?setCount=5',
		});
		if (res.data.status === 'success') {
			// eslint-disable-next-line prefer-destructuring
			captchaDeck = res.data.captchaDeck;
			setCaptcha();
		}
	})();
};

export { activateForm, activateCaptcha };
