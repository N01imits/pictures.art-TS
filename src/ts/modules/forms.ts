export const forms = () => {
	const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('form');
	const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
	const uploads: NodeListOf<HTMLInputElement> = document.querySelectorAll('[name="upload"]');

	const messages = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так...',
		spinner: './assets/img/spinner.gif',
		ok: './assets/img/ok.png',
		fail: './assets/img/fail.png',
	};

	const postData = async (url: string, data: any) => {
		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});

		return await result.text();
	};

	const getBase64 = async (file: File): Promise<string> => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		return new Promise((resolve, reject) => {
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = error => reject(error);
		});
	};

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = '';
		});
		uploads.forEach(upload => {
			if (upload.previousElementSibling) {
				upload.previousElementSibling.textContent = 'Файл не выбран';
			}
		});
	};

	uploads.forEach(upload => {
		upload.addEventListener('input', () => {
			const file = upload.files?.[0];
			if (file) {
				let fileName = file.name.split('.')[0];
				const extension = file.name.split('.')[1];

				if (fileName.length > 6) {
					fileName = fileName.substring(0, 6) + '...';
				}

				const newFileName = `${fileName}.${extension}`;
				if (upload.previousElementSibling) {
					upload.previousElementSibling.textContent = newFileName;
				}
			}
		});
	});

	const formDataToJson = (formData: FormData) => {
		return JSON.stringify(Object.fromEntries(formData));
	};

	forms.forEach(form => {
		form.addEventListener('submit', async e => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.parentNode?.append(statusMessage);

			form.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				form.style.display = 'none';
			}, 400);

			const statusImg = document.createElement('img');
			statusImg.setAttribute('src', messages.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.append(statusImg);

			const textMessage = document.createElement('div');
			textMessage.textContent = messages.loading;
			statusMessage.append(textMessage);

			const formData = new FormData(form);
			const fileInput: HTMLInputElement | null = form.querySelector('input[type="file"]');
			if (fileInput?.files?.length) {
				const file = fileInput.files[0];
				const base64Image = await getBase64(file);
				formData.append('upload', base64Image);
				console.log(base64Image);
			}

			const jsonData = formDataToJson(formData);

			try {
				await postData('https://postsimpleserver.onrender.com/api/data', jsonData);
				statusImg.setAttribute('src', messages.ok);
				textMessage.textContent = messages.success;
			} catch (error) {
				statusImg.setAttribute('src', messages.fail);
				textMessage.textContent = messages.failure;
			} finally {
				clearInputs();
				setTimeout(() => {
					statusMessage.remove();
					form.style.display = 'block';
					form.classList.remove('fadeOutUp');
					form.classList.add('fadeInUp');
				}, 5000);
			}
		});
	});
};
