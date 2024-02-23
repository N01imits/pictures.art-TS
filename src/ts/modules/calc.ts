interface Calc {
	size: string;
	material: string;
	promocode: string;
	options: string;
	result: string;
	resultForServer: string;
}

export const calc = ({
	size,
	material,
	promocode,
	options,
	result,
	resultForServer,
}: Calc) => {
	const sizeValue = document.querySelector<HTMLSelectElement>(size);
	const materialValue = document.querySelector<HTMLSelectElement>(material);
	const optionsValue = document.querySelector<HTMLSelectElement>(options);
	const promocodeValue = document.querySelector<HTMLInputElement>(promocode);
	const resultValue = document.querySelector<HTMLDivElement>(result);
	const resultValueForServer =
		document.querySelector<HTMLInputElement>(resultForServer);

	if (
		!sizeValue ||
		!materialValue ||
		!optionsValue ||
		!promocodeValue ||
		!resultValue ||
		!resultValueForServer
	) {
		console.error('Один или несколько элементов не найдены');
		return;
	}

	const calcSum = async () => {
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

		resultValueForServer.value = resultValue.textContent;
	};

	sizeValue.addEventListener('change', calcSum);
	materialValue.addEventListener('change', calcSum);
	optionsValue.addEventListener('change', calcSum);
	promocodeValue.addEventListener('input', calcSum);
};
