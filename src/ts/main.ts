import { modals } from './modules/modals';
import { sliders } from './modules/sliders';

document.addEventListener('DOMContentLoaded', () => {
	modals();
	sliders({
		slides: '.feedback-slider-item',
		direction: 'horizontal',
		previousBtn: '.main-prev-btn',
		nextBtn: '.main-next-btn',
	});
	sliders({
		slides: '.main-slider-item',
		direction: 'vertical',
	});
});
