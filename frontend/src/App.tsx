import { useLayoutEffect, useEffect } from 'react';
import { AppRoute } from './routes/app-route';
import { useAppDispatch } from './redux/store';
import { checkAuthAsync, setUser } from './redux/slice/userSlice';
import { Header } from './components';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);

	useLayoutEffect(() => {
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
	}, [dispatch]);

	return (
		<>
			<Header />
			<div className="mt-9  " style={{ minHeight: '850px' }}>
				<AppRoute />
			</div>
		</>
	);
};

export default App;
