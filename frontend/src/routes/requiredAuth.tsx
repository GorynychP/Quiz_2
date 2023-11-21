import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { IsRole } from '../redux/slice/userSlice';

interface RequiredAuthProps {
	children: ReactNode;
	isAuth: boolean;
	role: number[];
	// role: number;
}
export const RequiredAuth: React.FC<RequiredAuthProps> = ({
	children,
	isAuth,
	role,
}) => {
	const userRole = useSelector((state: RootState) =>
		Number(state.user.user.roleId),
	);
	const ROLE = [userRole];
	const hasRequeredRole = () => {
		if (!isAuth) {
			return false;
		}
		return role.some((requiredRole) => {
			const hasRole = ROLE.includes(requiredRole);
			return hasRole;
		});
	};
	// if (userRole === IsRole.GUEST) {
	// 	return false;
	// }
	if (!isAuth) {
		return false;
	}
	if (!hasRequeredRole()) {
		return <Navigate to="/" />;
	} else return children;
};
