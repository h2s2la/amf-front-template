import React from 'react';
import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
//import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(
	lazy(() => import('pages/authentication/Register')),
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: 'login',
			element: <AuthLogin />,
		},
		{
			path: 'sign-up',
			element: <AuthRegister />,
		},
	],
};

export default LoginRoutes;
