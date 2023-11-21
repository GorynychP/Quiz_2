import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useState, useEffect } from 'react';
import {
	editUserAsync,
	setEmail,
	setName,
	setSurname,
	setUser,
} from '../../redux/slice/userSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userFormSchema } from '../../components/form-schems';
interface UserEditForm {
	email: string;
	name: string;
	surname: string;
}
export const MyAccount: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const [serverError, setServerError] = useState<string | null>(null);
	const [edit, setEdit] = useState(false);
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<UserEditForm>({
		resolver: yupResolver(userFormSchema),
	});

	useEffect(() => {
		if (!edit) {
			setValue('email', user.email);
			setValue('name', user.name);
			setValue('surname', user.surname);
		}
	}, [edit, user, setValue]);

	const onSubmit: SubmitHandler<UserEditForm> = async (data) => {
		const userData = await dispatch(editUserAsync(data));
		setEdit(false);
		if (userData.error) {
			setEdit(true);
			setServerError(`Ошибка запроса: ${userData.payload}`);
			return;
		}
	};
	const formError =
		errors?.email?.message ||
		errors?.name?.message ||
		errors?.surname?.message;

	const errorMessage = formError || serverError;

	const editUser = () => {
		setServerError(null);
		setEdit(!edit);
	};
	const cancelEditUser = () => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
		setEdit(!edit);
	};
	return (
		<div className="flex justify-center mt-10 ">
			<form
				className="bg-zinc-700 border rounded-lg overflow-hidden shadow-md w-96"
				style={{ width: '600px' }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="text-end mt-3 mr-3">
					{!edit ? (
						<button
							type="submit"
							className=" text-white py-2 px-4 rounded"
							style={{ background: '#157347' }}
							onClick={editUser}
						>
							Редактировать
						</button>
					) : (
						<>
							<button
								type="button"
								className=" text-white py-2 px-4 rounded mr-2 "
								style={{ background: '#157347' }}
								onClick={editUser}
								disabled={!!formError}
							>
								Сохранить
							</button>
							<button
								type="button"
								className=" bg-yellow-700 text-white py-2 px-4 rounded "
								onClick={cancelEditUser}
							>
								Отмена
							</button>
						</>
					)}
				</div>
				<div className="p-4 flex items-center">
					<div className="w-52 h-52 bg-gray-300 rounded-full mr-4">
						<img
							className="w-52 h-52  rounded-full mr-4"
							src="/src/assets/img/avatar-1577909_640.png"
							alt=""
						/>
					</div>
					<div className="ml-4 ">
						<div className="mb-4">
							<h2 className="text-xl font-semibold">
								Email:{' '}
								{!edit ? (
									user.email
								) : (
									<input
										className="w-48 border rounded p-1"
										type="email"
										value={user.email}
										{...register('email', {
											onChange: ({ target }) =>
												dispatch(
													setEmail(target.value),
												),
										})}
									/>
								)}
							</h2>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">
								Имя:{' '}
								{!edit ? (
									user.name
								) : (
									<input
										className="w-48 border rounded p-1"
										type="text"
										value={user.name}
										{...register('name', {
											onChange: ({ target }) =>
												dispatch(setName(target.value)),
										})}
									/>
								)}
							</h2>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">
								Фамилия:{' '}
								{!edit ? (
									user.surname
								) : (
									<input
										className="w-48 border rounded p-1"
										type="text"
										value={user.surname}
										{...register('surname', {
											onChange: ({ target }) =>
												dispatch(
													setSurname(target.value),
												),
										})}
									/>
								)}
							</h2>
						</div>
						{edit && errorMessage && (
							<div className="text-red-500">{errorMessage}</div>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};
