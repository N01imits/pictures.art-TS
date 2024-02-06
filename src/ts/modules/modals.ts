type bindModalOptions = {
	triggerSelector: string;
	modalSelector: string;
	closeSelector: string;
	closeClickOverlay: boolean;
};

export const modals = (): void => {
	const bindModal = ({
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay,
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
				if (e.target) {
					e.preventDefault();
				}
				closeAllPopupWindows();
				openModal();
			});
		});

		close?.addEventListener('click', closeModal);
		close?.addEventListener('click', closeAllPopupWindows);

		modal?.addEventListener('click', e => {
			if (e.target === modal && closeClickOverlay) {
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
					element.style.display = 'block';
					document.body.style.overflow = 'hidden';
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

	bindModal({
		triggerSelector: '.button-design',
		modalSelector: '.popup-design',
		closeSelector: '.popup-design .popup-close',
		closeClickOverlay: true,
	});

	bindModal({
		triggerSelector: '.button-consultation',
		modalSelector: '.popup-consultation',
		closeSelector: '.popup-consultation .popup-close',
		closeClickOverlay: true,
	});

	showModalByTime('.popup-consultation', 60000);
};
