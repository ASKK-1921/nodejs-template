import axios from 'axios';

const changeLanguage = async (lang) => {
	await axios({
		method: 'GET',
		url: window.location.pathname,
		params: { lang },
	});
	window.location.reload();
};

const setLanguage = (button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		changeLanguage(button.id === 'langEN' ? 'en' : 'ja');
	});
};

export { changeLanguage, setLanguage };
