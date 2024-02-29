export const burger = (burgerSelector: string, menuSelector: string) => {
	const burgerMenu: HTMLUListElement | null = document.querySelector(menuSelector);
	const burgerButton: HTMLButtonElement | null = document.querySelector(burgerSelector);

	if (!burgerMenu || !burgerButton) return;

	burgerMenu.style.display = 'none';

	burgerButton.addEventListener('click', () => {
		if (burgerMenu.style.display === 'none' && window.screen.availWidth < 993) {
			burgerMenu.style.display = 'block';
		} else {
			burgerMenu.style.display = 'none';
		}
	});

	window.addEventListener('resize', () => {
		if (window.screen.availWidth > 992) {
			burgerMenu.style.display = 'none';
		}
	});
};
