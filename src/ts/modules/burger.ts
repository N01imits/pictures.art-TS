export const burger = (burgerSelector: string, menuSelector: string) => {
	const burgerMenu: HTMLUListElement | null = document.querySelector(menuSelector);
	const burgerButton: HTMLButtonElement | null = document.querySelector(burgerSelector);
	const screenWidthThreshold = 992;

	if (!burgerMenu || !burgerButton) return;

	burgerMenu.style.display = 'none';

	burgerButton.addEventListener('click', () => {
		if (
			burgerMenu.style.display === 'none' &&
			window.screen.availWidth <= screenWidthThreshold
		) {
			burgerMenu.style.display = 'block';
		} else {
			burgerMenu.style.display = 'none';
		}
	});

	window.addEventListener('resize', () => {
		if (window.screen.availWidth > screenWidthThreshold) {
			burgerMenu.style.display = 'none';
		}
	});
};
