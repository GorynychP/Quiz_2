import { SubmitHandler, useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slice/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';
import { request } from '../../components/utils/request';
import { regFormSchema } from '../../components/form-schems/reg-form-schema';

interface RegistrForm {
	email: string;
	name: string;
	surname: string;
	password: string;
	passcheck: string;
}

export const Registration: React.FC = () => {
	const [serverError, setServerError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	// const user = useSelector((state: RootState) => state.user.user);

	const onSubmit: SubmitHandler<RegistrForm> = (data) => {
		request('http://localhost:3005/register', 'POST', data).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}
				dispatch(setUser(user));
				navigate('/');
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const {
		register,
		// reset,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrForm>({
		defaultValues: {
			email: '',
			name: '',
			surname: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const formError =
		errors?.email?.message ||
		errors?.name?.message ||
		errors?.surname?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	const errorMessage = formError || serverError;
	return (
		<div className="flex items-center justify-center">
			<div className="w-96 p-8 bg-zinc-700 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-4">Регистрация</h2>
				<form
					className=" flex flex-col"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-3">
						<input
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="email"
							placeholder="Email..."
							{...register('email', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					<div className="mb-3">
						<input
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="text"
							placeholder="Имя..."
							{...register('name', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					<div className="mb-3">
						<input
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="text"
							placeholder="Фамилия..."
							{...register('surname', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					<div className="mb-3">
						<input
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="password"
							placeholder="Пароль..."
							{...register('password', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					<div className="mb-3">
						<input
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="password"
							placeholder="Повтор пароля..."
							{...register('passcheck', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					{errorMessage && (
						<div className="text-red-500 mb-3">{errorMessage}</div>
					)}
					<button
						className="className=w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
						type="submit"
						disabled={!!formError}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	);
};
