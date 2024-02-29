import { modals } from './modules/modals';
import { sliders } from './modules/sliders';
import { forms } from './modules/forms';
import { checkTextInputs } from './modules/checkTextInputs';
import { mask } from './modules/mask';
import { showMoreStyles } from './modules/showMoreStyles';
import { calc } from './modules/calc';
import { filter } from './modules/filter';
import { pictureSize } from './modules/pictureSize';
import { accordion } from './modules/accordion';

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
	forms();
	mask('[name="phone"]');
	checkTextInputs('[name="name"]');
	checkTextInputs('[name="message"]');
	showMoreStyles('.button-styles', '#styles .row');
	calc({
		size: '#size',
		material: '#material',
		options: '#options',
		promocode: '.promocode',
		result: '.calc-price',
		resultForServer: 'input[name="result-price"]',
	});
	filter();
	pictureSize('.sizes-block');
	accordion('.accordion-heading');
});
