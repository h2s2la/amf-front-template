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
//const basename = process.env.PUBLIC_URL;
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
// const router = createBrowserRouter(LoginRoutes, {basename: basename});

// root.render(
// 	// <React.StrictMode>
// 	<RouterProvider router={router} />
// 	// </React.StrictMode>
//   );
export default LoginRoutes;
