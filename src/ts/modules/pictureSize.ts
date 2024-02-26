export const pictureSize = (imgSelector: string) => {
	const blocks: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(imgSelector);

	const showImg = (block: HTMLDivElement) => {
		const img: HTMLImageElement | null = block.querySelector('img');
		if (img) {
			img.src = img.src.replace(/(\.\w+)$/, '-1$1');
		}
		block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
			if (p instanceof HTMLParagraphElement) {
				p.style.display = 'none';
			}
		});
	};

	const hideImg = (block: HTMLDivElement) => {
		const img: HTMLImageElement | null = block.querySelector('img');
		if (img) {
			img.src = img.src.replace(/-1(\.\w+)$/, '$1');
		}
		block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
			if (p instanceof HTMLParagraphElement) {
				p.style.display = 'block';
			}
		});
	};
	blocks.forEach((block: HTMLDivElement) => {
		block.addEventListener('mouseover', () => showImg(block));
		block.addEventListener('mouseout', () => hideImg(block));
	});
};
