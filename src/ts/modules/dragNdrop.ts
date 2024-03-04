export const dragAndDrop = () => {
	const fileInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('[name="upload"]');
	const allEvents: string[] = ['drag', 'dragend', 'dragover', 'dragleave', 'drop'];
	const dragHighlightEvents: string[] = ['dragover', 'dragenter'];
	const dragUnhighlightEvents: string[] = ['dragleave', 'dragend'];

	const highlight = (elementSelector: HTMLElement) => {
		const fileUpload = elementSelector.closest('.file_upload');
		if (!elementSelector || !fileUpload) return;
		if (fileUpload) fileUpload.classList.add('highlighted');
	};

	const unhighlight = (elementSelector: HTMLElement) => {
		const fileUpload = elementSelector.closest('.file_upload');
		if (!elementSelector && !fileUpload) return;
		if (fileUpload) fileUpload.classList.remove('highlighted');
	};

	dragHighlightEvents.forEach((eventName: string) => {
		fileInputs.forEach((input: HTMLInputElement) => {
			input.addEventListener(eventName, () => highlight(input), false);
		});
	});

	dragUnhighlightEvents.forEach((eventName: string) => {
		fileInputs.forEach((input: HTMLInputElement) => {
			input.addEventListener(eventName, () => unhighlight(input), false);
		});
	});

	const preventDefaults = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
	};

	allEvents.forEach((eventName: string) => {
		fileInputs.forEach((input: HTMLInputElement) => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});

	fileInputs.forEach((input: HTMLInputElement) => {
		input.addEventListener('drop', (e: DragEvent) => {
			const files = e.dataTransfer?.files;
			if (files && files.length > 0) {
				const file = files[0];
				input.files = files;
				const [originalFileName, extension] = file.name.split('.');
				const shortFileName =
					originalFileName.length > 6
						? `${originalFileName.substring(0, 6)}...`
						: originalFileName;
				const newFileName = `${shortFileName}.${extension}`;
				if (input.previousElementSibling) {
					input.previousElementSibling.textContent = newFileName;
				}
			}
		});
	});
};
