import { Link, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { logoutAsync } from '../../redux/slice/userSlice';
import { useSelector } from 'react-redux';

export const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const logaut = () => {
		dispatch(logoutAsync());
		navigate('/login');
	};
	return (
		<div className="flex justify-between mt-3">
			<div className="w-auto flex">
				<Link
					className="mr-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					to="/"
				>
					<h2>Главная</h2>
				</Link>
				{isAuth && (
					<Link
						className="mr-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						to="/myTests"
					>
						<h2>Мои тесты</h2>
					</Link>
				)}
			</div>
			<div>
				{!isAuth ? (
					<>
						<Link to="/login" className="button-test">
							Войти
						</Link>
						<Link to="/register" className="button-test">
							Регистарция
						</Link>
					</>
				) : (
					<>
						<Link to="/user" className="button-test">
							Мой аккаунт
						</Link>
						<button
							onClick={logaut}
							className="button-test hover:text-blue-600"
						>
							Выйти
						</button>{' '}
					</>
				)}
			</div>
		</div>
	);
};
