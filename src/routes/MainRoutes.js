import React from 'react';

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
const DefaultPage = Loadable(lazy(() => import('pages/DefaultPage')));

const Board = Loadable(lazy(() => import('pages/board/Board')));
const Post = Loadable(lazy(() => import('pages/board/Post')));
const CreatePost = Loadable(lazy(() => import('pages/board/CreatePost')));
const UpdatePost = Loadable(lazy(() => import('pages/board/UpdatePost')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '',
			element: <DefaultPage />
		},
		{
			path: 'board',
			element: <Board />,
		},
		{
			path: 'post/:id',
			element: <Post />,
		},
		{
			path: 'post/write',
			element: <CreatePost />,
		},
		{
			path: 'post/update',
			element: <UpdatePost />,
		},
	]
};

export default MainRoutes;
