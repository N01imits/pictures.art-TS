import { postData } from '../services/requests';

interface Calc {
	size: string;
	material: string;
	promocode: string;
	options: string;
	result: string;
}

export const calc = ({ size, material, promocode, options, result }: Calc) => {
	const sizeValue = document.querySelector<HTMLSelectElement>(size);
	const materialValue = document.querySelector<HTMLSelectElement>(material);
	const optionsValue = document.querySelector<HTMLSelectElement>(options);
	const promocodeValue = document.querySelector<HTMLInputElement>(promocode);
	const resultValue = document.querySelector<HTMLDivElement>(result);

	if (
		!sizeValue ||
		!materialValue ||
		!optionsValue ||
		!promocodeValue ||
		!resultValue
	) {
		console.error('Один или несколько элементов не найдены');
		return;
	}

	const culcSum = async () => {
		if (!sizeValue.value || !materialValue.value) {
			resultValue.textContent =
				'Для расчета нужно выбрать размер и материал картины';
			return;
		}

		const sum = Math.round(
			+sizeValue.value * +materialValue.value + +optionsValue.value,
		);

		if (promocodeValue.value.toUpperCase() === 'IWANTPOPART') {
			resultValue.textContent = Math.round(sum * 0.7).toString();
		} else {
			resultValue.textContent = sum.toString();
		}

		const dataToSend = JSON.stringify({
			size: sizeValue.value,
			material: materialValue.value,
			options: optionsValue.value,
			promocode: promocodeValue.value,
			totalCost: resultValue.textContent,
		});

		try {
			const response = await postData(
				'https://postsimpleserver.onrender.com/api/data',
				dataToSend,
			);
			console.log('Ответ сервера:', response);
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
		}
	};

	sizeValue.addEventListener('change', culcSum);
	materialValue.addEventListener('change', culcSum);
	optionsValue.addEventListener('change', culcSum);
	promocodeValue.addEventListener('input', culcSum);
};
