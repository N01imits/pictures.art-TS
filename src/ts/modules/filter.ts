export const filter = (): void => {
	const menu = document.querySelector('.portfolio-menu') as HTMLElement,
		wrapper = document.querySelector('.portfolio-wrapper') as HTMLElement,
		no = document.querySelector('.portfolio-no') as HTMLElement,
		items = wrapper.querySelectorAll('.all, .lovers, .chef, .girl, .guy');

	const hideAllItems = () => {
		items.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'animated', 'fadeIn');
		});
		no.classList.add('hide');
		no.classList.remove('show', 'animated', 'fadeIn');
	};

	const showItems = (selector: string) => {
		const selectedItems = wrapper.querySelectorAll(selector);
		if (selectedItems.length) {
			selectedItems.forEach(item => {
				item.classList.remove('hide');
				item.classList.add('show', 'animated', 'fadeIn');
			});
		} else {
			no.classList.remove('hide');
			no.classList.add('show', 'animated', 'fadeIn');
		}
	};

	menu.addEventListener('click', (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target && target.tagName === 'LI') {
			hideAllItems();
			showItems(`.${target.classList.item(0)}`);
			menu.querySelectorAll('li').forEach(btn =>
				btn.classList.remove('active'),
			);
			target.classList.add('active');
		}
	});
};
