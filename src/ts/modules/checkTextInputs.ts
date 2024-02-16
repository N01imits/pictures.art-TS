export const checkTextInputs = (selector: string): void => {
	const textInputs = document.querySelectorAll(selector);
	textInputs.forEach(textInput => {
		textInput.addEventListener('keypress', event => {
			if (event.key.match(/[^а-яё 0-9]/gi)) event.preventDefault();
		});
	});
};
