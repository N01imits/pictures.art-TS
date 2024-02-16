import { modals } from './modules/modals';
import { sliders } from './modules/sliders';
import { forms } from './modules/forms';
import { checkTextInputs } from './modules/checkTextInputs';
import { mask } from './modules/mask';

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


});
