interface ISliders {
	slides: string;
	direction: string;
	previousBtn?: string;
	nextBtn?: string;
}

export const sliders = ({ slides, direction, previousBtn, nextBtn }: ISliders): void => {
	let slideIndex: number = 1;
	let paused: number = 0;
	const allSlides: NodeListOf<HTMLElement> = document.querySelectorAll(slides);

	const showSlides = (slideNumber: number): void => {
		if (slideNumber > allSlides.length) {
			slideIndex = 1;
		}

		if (slideNumber < 1) {
			slideIndex = allSlides.length;
		}

		allSlides.forEach(slide => {
			slide.classList.add('animated');
			slide.style.display = 'none';
		});

		allSlides[slideIndex - 1].style.display = 'block';
	};

	showSlides(slideIndex);

	const changeNumberSlide = (slideNumber: number): void => {
		showSlides((slideIndex += slideNumber));
	};

	const previousButton: HTMLElement | null = previousBtn
		? document.querySelector(previousBtn)
		: null;
	const nextButton: HTMLElement | null = nextBtn ? document.querySelector(nextBtn) : null;

	if (previousButton) {
		previousButton.addEventListener('click', () => {
			changeNumberSlide(-1);
			allSlides[slideIndex - 1].classList.remove('slideInRight');
			allSlides[slideIndex - 1].classList.add('slideInLeft');
		});
	}

	if (nextButton) {
		nextButton.addEventListener('click', () => {
			changeNumberSlide(1);
			allSlides[slideIndex - 1].classList.remove('slideInRight');
			allSlides[slideIndex - 1].classList.add('slideInRight');
		});
	}

	const activateAnimation = () => {
		if (direction === 'vertical') {
			paused = setInterval(() => {
				changeNumberSlide(1);
				allSlides[slideIndex - 1].classList.add('slideInDown');
			}, 3000);
		} else {
			paused = setInterval(() => {
				changeNumberSlide(1);
				allSlides[slideIndex - 1].classList.add('slideInRight');
			}, 3000);
		}
	};

	activateAnimation();

	allSlides[0].parentNode?.addEventListener('mouseenter', () => {
		clearInterval(paused);
	});
	allSlides[0].parentNode?.addEventListener('mouseleave', () => {
		activateAnimation();
	});
};
