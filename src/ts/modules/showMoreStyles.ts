import { getResource } from '../services/requests';

export const showMoreStyles = (triggerSelector: string, wrapper: string) => {
	interface Card {
		src: string;
		title: string;
		link: string;
	}

	const btn: HTMLButtonElement | null =
		document.querySelector(triggerSelector);
	if (!btn) return;

	btn.addEventListener('click', (event: Event) => {
		getResource('./db.json/')
			.then(res => createCards(res))
			.catch(error => console.log(error));

		(event.target as HTMLElement).remove();
	});

	const createCards = (response: Card[]) => {
		response.forEach(({ src, title, link }: Card) => {
			const card: HTMLDivElement = document.createElement('div');

			card.classList.add(
				'animated',
				'fadeInUp',
				'col-sm-3',
				'col-sm-offset-0',
				'col-xs-10',
				'col-xs-offset-1',
			);

			card.innerHTML = `
				<div class='styles-block'>
					<img src=${src} alt="styles">
					<h4>${title}</h4>
					<a href=${link}>Подробнее</a>
				</div>
				`;

			document.querySelector(wrapper)?.append(card);
		});
	};
};
