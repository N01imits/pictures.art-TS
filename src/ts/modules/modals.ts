type bindModalOptions = {
	triggerSelector: string;
	modalSelector: string;
	closeSelector: string;
	destroy?: boolean;
};

export const modals = (): void => {
	let btnPressed: boolean = false;
	const bindModal = ({
		triggerSelector,
		modalSelector,
		closeSelector,
		destroy = false,
	}: bindModalOptions): void => {
		const triggers: NodeListOf<HTMLElement> = document.querySelectorAll(triggerSelector);
		const modal: HTMLElement | null = document.querySelector(modalSelector);
		const close: HTMLElement | null = document.querySelector(closeSelector);
		const windows: NodeListOf<HTMLElement> = document.querySelectorAll('[data-modal]');
		const scroll: number = calcScroll();

		const openModal = (): void => {
			if (modal) {
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scroll}px`;
			}
		};

		const closeAllPopupWindows = (): void => {
			windows.forEach(window => {
				window.style.display = 'none';
				document.body.style.marginRight = `0px`;
				window.classList.add('animated', 'fadeIn');
			});
		};

		const closeModal = () => {
			if (modal) {
				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.marginRight = `0px`;
			}
		};

		triggers.forEach(trigger => {
			trigger.addEventListener('click', e => {
				btnPressed = true;
				if (e.target) {
					e.preventDefault();
				}

				if (destroy) {
					trigger.remove();
				}
				closeAllPopupWindows();
				openModal();
			});
		});

		close?.addEventListener('click', closeModal);
		close?.addEventListener('click', closeAllPopupWindows);

		modal?.addEventListener('click', e => {
			if (e.target === modal) {
				closeAllPopupWindows();
				closeModal();
			}
		});

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});
	};

	const showModalByTime = (selector: string, time: number): void => {
		setTimeout(() => {
			const element: HTMLElement | null = document.querySelector(selector);
			if (element) {
				let display: string = '';

				const modals: NodeListOf<Element> = document.querySelectorAll('[data-modal]');
				modals.forEach(modal => {
					if (getComputedStyle(modal).display !== 'none') {
						display = 'block';
					}
				});
				if (!display) {
					const scroll: number = calcScroll();
					element.style.display = 'block';
					document.body.style.overflow = 'hidden';
					document.body.style.marginRight = `${scroll}px`;
				}
			}
		}, time);
	};

	function calcScroll(): number {
		const div: HTMLElement = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	// function openByScroll(showSelector: string): void {
	// 	window.addEventListener('scroll', () => {
	// 		if (
	// 			!btnPressed &&
	// 			window.scrollY + document.documentElement.clientHeight >=
	// 				document.documentElement.scrollHeight
	// 		) {
	// 			(document.querySelector(showSelector) as HTMLElement).click();
	// 		}
	// 	});
	// }

	const footer = document.querySelector('#footer') as HTMLElement;
	const gift = document.querySelector('.fixed-gift') as HTMLElement;
	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !btnPressed) {
					gift.click();
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.9 },
	);
	observer.observe(footer);

	bindModal({
		triggerSelector: '.button-design',
		modalSelector: '.popup-design',
		closeSelector: '.popup-design .popup-close',
	});

	bindModal({
		triggerSelector: '.button-consultation',
		modalSelector: '.popup-consultation',
		closeSelector: '.popup-consultation .popup-close',
	});

	bindModal({
		triggerSelector: '.fixed-gift',
		modalSelector: '.popup-gift',
		closeSelector: '.popup-gift .popup-close',
		destroy: true,
	});

	// openByScroll('.fixed-gift');
	showModalByTime('.popup-consultation', 65000);
};
