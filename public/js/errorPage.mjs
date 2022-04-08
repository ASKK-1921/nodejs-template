const setButtonLink = (button) => {
	if (button.id === 'error_back') {
		button.firstElementChild.innerHTML = 'Go back';
		button.addEventListener('click', () => {
			window.history.back();
		});
	} else if (button.id === 'error_login') {
		button.firstElementChild.innerHTML = 'Log in';
		button.addEventListener('click', () => {
			window.location.assign('/login');
		});
	}
};

// eslint-disable-next-line import/prefer-default-export
export { setButtonLink };
