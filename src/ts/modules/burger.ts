export const burger = (burgerSelector: string, menuSelector: string) => {
	const burgerMenu: HTMLUListElement | null = document.querySelector(menuSelector);
	const burgerButton: HTMLButtonElement | null = document.querySelector(burgerSelector);
	const breakpoint = 992;

	if (!burgerMenu || !burgerButton) return;

	burgerMenu.style.display = 'none';

	burgerButton.addEventListener('click', () => {
		if (burgerMenu.style.display === 'none' && window.screen.availWidth <= breakpoint) {
			burgerMenu.style.display = 'block';
		} else {
			burgerMenu.style.display = 'none';
		}
	});

	window.addEventListener('resize', () => {
		if (window.screen.availWidth > breakpoint) {
			burgerMenu.style.display = 'none';
		}
	});
};
