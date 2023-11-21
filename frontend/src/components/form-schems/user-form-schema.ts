import * as yup from 'yup';

export const userFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполнить email')
		// .matches(/^\w+$/, 'Неверный email. Допускаются только буквы и цифры')
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			'Неверный формат email. Пример: test@example.com',
		)
		.min(6, 'Неверный email. Минимум 6 символа')
		.max(25, 'Неверный email. Максимум 25 символов'),
	name: yup
		.string()
		.required('Заполнить Имя')
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ]+$/,
			'Неверный формат Имени. Допускаются только буквы',
		)
		.min(2, 'Неверный Имя. Минимум 2 символа')
		.max(25, 'Неверный Имя. Максимум 25 символов'),
	surname: yup
		.string()
		.required('Заполнить Фамилию')
		.matches(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Допускаются только буквы и цифры')
		.min(2, 'Неверный Фамилию. Минимум 2 символа')
		.max(25, 'Неверный Фамилия. Максимум 25 символов'),
});
