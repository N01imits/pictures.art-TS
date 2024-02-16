export const mask = (selector: string) => {
	const setCursorPosition = (position: number, element: any) => {
		element.focus();
		if (element.setSelectionRange) {
			element.setSelectionRange(position, position);
		} else if (element.createTextRange) {
			const range = element.createTextRange();
			range.collapse(true);
			range.moveEnd('character', position);
			range.moveStart('character', position);
			range.select();
		}
	};

	function createMask(this: HTMLInputElement, event: Event) {
		const phoneMask: string = '+7 (___) ___ __ __';
		let i: number = 0;
		const defaultMask = phoneMask.replace(/\D/g, '');
		let value = this.value.replace(/\D/g, '') ?? '';

		if (defaultMask.length >= value.length) value = defaultMask;

		this.value = phoneMask.replace(/./g, symbol => {
			return /[_\d]/.test(symbol) && value.length
				? value.charAt(i++)
				: i >= value.length
				? ''
				: symbol;
		});

		if (event.type === 'blur') {
			if (this.value.length === 2) this.value = '';
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	const inputs = document.querySelectorAll(selector);
	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	});
};
