export const scrolling = (upSelector: string) => {
	const upElement: HTMLElement | null = document.querySelector(upSelector);
	const scrollActivationHeight: number = 1600;
	if (!upElement) {
		return;
	}
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > scrollActivationHeight) {
			upElement.classList.add('animated', 'fadeIn');
			upElement.classList.remove('fadeOut');
		} else {
			upElement.classList.add('fadeOut');
			upElement.classList.remove('fadeIn');
		}
	});

	const smoothScroll = (): void => {
		const anchorLinks: NodeListOf<HTMLAnchorElement> =
			document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach((anchorLink: HTMLAnchorElement) => {
			anchorLink.addEventListener('click', (event: Event) => {
				event.preventDefault();
				const clickedAnchorElement =
					event.currentTarget as HTMLAnchorElement;
				const hash: string | null =
					clickedAnchorElement.getAttribute('href');
				if (!hash) {
					return;
				}
				const scrollingTarget: HTMLElement | null =
					document.querySelector(hash);
				if (scrollingTarget) {
					scrollingTarget.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
				}
			});
		});
	};

	smoothScroll();
};
