import React from 'react';
import {
	Authorization,
	EditTest,
	Home,
	MyAccount,
	MyTests,
	Registration,
	TestExecution,
	TestPage,
} from '../pages';
import { RequiredAuth } from './requiredAuth';

interface routerConfigProps {
	isAuth: boolean;
	role: number[];
	// userRole: number;
}
interface RouteConfig {
	path: string;
	element: React.ReactNode;
}
export const routerConfig = ({
	isAuth,
	role,
}: routerConfigProps): RouteConfig[] => [
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Authorization /> },
	{ path: '/register', element: <Registration /> },
	{
		path: '/user',
		element: (
			<RequiredAuth isAuth={isAuth} role={role}>
				<MyAccount />
			</RequiredAuth>
		),
	},
	{
		path: '/myTests',
		element: (
			<RequiredAuth isAuth={isAuth} role={role}>
				<MyTests />
			</RequiredAuth>
		),
	},
	{
		path: '/tests/:id?',
		element: <TestPage />,
	},
	{
		path: '/myTests/:id/edit',
		element: (
			<RequiredAuth isAuth={isAuth} role={role}>
				<EditTest />
			</RequiredAuth>
		),
	},
	{ path: '/test/:id', element: <TestExecution /> },
	{ path: '*', element: <div> Неизвестная страница</div> },
];
