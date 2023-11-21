import { useRoutes } from 'react-router-dom';
import { routerConfig } from './routerConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IsRole } from '../redux/slice/userSlice';

export const AppRoute: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const role = [IsRole.ADMIN, IsRole.USER];

	const element = useRoutes(routerConfig({ isAuth, role }));
	return element;
};
