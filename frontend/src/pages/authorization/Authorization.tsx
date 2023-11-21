import { SubmitHandler, useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { loginAsync } from '../../redux/slice/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginFormSchema } from '../../components/form-schems';
import { useSelector } from 'react-redux';
interface RegistrForm {
	email: string;
	password: string;
}

export const Authorization: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const [serverError, setServerError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<RegistrForm> = async (data) => {
		const user = await dispatch(loginAsync(data));
		if (user.error) {
			setServerError(`Ошибка запроса: ${user.payload}`);
			return;
		}
		navigate('/');
	};

	const {
		register,
		// reset,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrForm>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginFormSchema),
	});
	const formError = errors?.email?.message || errors?.password?.message;

	const errorMessage = formError || serverError;
	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<div className="flex items-center justify-center">
			<div className="w-96 p-8 bg-zinc-700 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-4">Вход</h2>
				<form
					className="flex flex-col"
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
							type="password"
							placeholder="Пароль..."
							{...register('password', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>
					{errorMessage && (
						<div className="text-red-500 mb-3">{errorMessage}</div>
					)}
					<button
						className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
						type="submit"
						disabled={!!formError}
					>
						Войти
					</button>
				</form>
			</div>
		</div>
	);
};
