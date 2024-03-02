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

	const element = document.documentElement;
	const body = document.body;

	const calcScroll = (): void => {
		upElement.addEventListener('click', event => {
			const scrollTop = Math.round(body.scrollTop || element.scrollTop);
			const targetElement = event.currentTarget as HTMLAnchorElement;
			if (targetElement.hash !== '') {
				event.preventDefault();
				let hashElement: HTMLElement | null = document.querySelector(
					targetElement.hash,
				);
				let hashElementTop: number = 0;
				while (hashElement && hashElement.offsetParent) {
					hashElementTop += hashElement.offsetTop;
					hashElement = hashElement.offsetParent as HTMLElement;
				}
				hashElementTop = Math.round(hashElementTop);
				smoothScroll({
					from: scrollTop,
					to: hashElementTop,
					hash: targetElement.hash,
				});
			}
		});
	};

	interface ISmoothScroll {
		from: number;
		to: number;
		hash: string;
	}

	const smoothScroll = ({ from, to, hash }: ISmoothScroll): void => {
		let timeInterval = 1;
		let prevScrollTop = 0;
		let speed = 0;

		if (from < to) {
			speed = 30;
		} else {
			speed = -30;
		}

		const move = setInterval(() => {
			const scrollTop = Math.round(body.scrollTop || element.scrollTop);
			if (
				prevScrollTop === scrollTop ||
				(to > from && scrollTop >= to) ||
				(to < from && scrollTop <= to)
			) {
				clearInterval(move);
				history.replaceState(
					history.state,
					document.title,
					location.href.replace(/#.*$/g, '') + hash,
				);
			} else {
				body.scrollTop += speed;
				element.scrollTop += speed;
				prevScrollTop = scrollTop;
			}
		}, timeInterval);
	};

	calcScroll();
};
