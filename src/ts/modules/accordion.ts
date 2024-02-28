export const accordion = (triggersSelector: string) => {
	const buttons = document.querySelectorAll(triggersSelector);

	buttons.forEach(button => {
		button.addEventListener('click', event => {
			const currentButton = event.currentTarget as HTMLParagraphElement;
			currentButton.classList.toggle('active-style');
			const nextElement =
				currentButton.nextElementSibling as HTMLDivElement | null;
			nextElement?.classList.toggle('active-content');
			if (
				currentButton.classList.contains('active-style') &&
				nextElement
			) {
				nextElement.style.maxHeight =
					nextElement.scrollHeight + 80 + 'px';
			} else if (nextElement) {
				nextElement.style.maxHeight = '0px';
			}
		});
	});
};
