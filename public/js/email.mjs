import axios from 'axios';

const sendContactEmail = async (name, email, subject, message) => {
	const res = await axios({
		method: 'POST',
		url: '/contact',
		data: {
			name,
			email,
			subject,
			message,
		},
	});
	if (res.data.status === 'success') {
		if (document.getElementById('contact_lp')) {
			document.getElementById('contact_lp').innerHTML =
				'<h3 style="text-align:center;padding:2em;">Thank you for your message!<br><br>A member of our support staff will be in touch soon.</h3>';
		}
	}
	if (res.data.status === 'error') {
		// eslint-disable-next-line no-alert
		return alert('Your message could not be sent at this time. Please try again later.');
	}
};

// eslint-disable-next-line import/prefer-default-export
export { sendContactEmail };
