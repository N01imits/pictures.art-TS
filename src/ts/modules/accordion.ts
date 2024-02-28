// export const accordion = ({ triggersSelector: string blocksSelector: string): void => {
// const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(triggersSelector);
// const blocks: NodeListOf<HTMLDivElement> = document.querySelectorAll(blocksSelector);

// blocks.forEach(block => {
// 	block.classList.add('animated', 'fadeInDown');
// });

// buttons.forEach(button => {
// 	button.addEventListener('click', () => {
// 		const isActive = button.classList.contains('active');
// 		if (!isActive) {
// 			buttons.forEach(btnInner => {
// 				btnInner.classList.remove('active', 'active-style');
// 			});
// 			button.classList.add('active', 'active-style');
// 		}
// 	});
// });
// };

export const accordion = (triggersSelector: string) => {
	const buttons = document.querySelectorAll(triggersSelector);

	buttons.forEach(button => {
		button.addEventListener('click', function (this: HTMLElement) {
			this.classList.toggle('active-style');
			this.nextElementSibling?.classList.toggle('active-content');

			if (this.classList.contains('active-style') && this.nextElementSibling) {
				(this.nextElementSibling as HTMLElement).style.maxHeight =
					this.nextElementSibling.scrollHeight + 80 + 'px';
			} else if (this.nextElementSibling) {
				(this.nextElementSibling as HTMLElement).style.maxHeight = '0px';
			}
		});
	});
};
