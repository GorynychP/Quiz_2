import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполнить email')
		.min(6, 'Неверный email. Минимум 6 символа')
		.max(25, 'Неверный email. Максимум 25 символов'),
	password: yup
		.string()
		.required('Заполнить пароль')
		.matches(
			/^[\w#%/]+/,
			'Неверный пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверный заполнен пароль. Минимум 6 символа')
		.max(20, 'Неверный заполнен пароль. Максимум 20 символов'),
});
