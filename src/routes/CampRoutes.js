import React from 'react';

import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
//import MinimalLayout from 'layout/MinimalLayout';
const DefaultPage = Loadable(lazy(() => import('pages/DefaultPage')));

const CampgroundList = Loadable(
	lazy(() => import('pages/campground/CampgroundList')),
);
// const Board = Loadable(lazy(() => import('pages/board/Board')));
// const Post = Loadable(lazy(() => import('pages/board/Post')));
const Createcampground = Loadable(
	lazy(() => import('pages/campground/CreateCampground')),
);
// const UpdatePost = Loadable(lazy(() => import('pages/board/UpdatePost')));

// ==============================|| MAIN ROUTING ||============================== //

const CampRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '',
			element: <DefaultPage />,
		},
		{
			path: 'campground',
			element: <CampgroundList />,
		},
		// {
		// 	path: 'board',
		// 	element: <Board />,
		// },
		// {
		// 	path: 'post/:id',
		// 	element: <Post />,
		// },
		{
			path: 'campground/regist',
			element: <Createcampground />,
		},
		// {
		// 	path: 'post/update',
		// 	element: <UpdatePost />,
		// },
	],
};

export default CampRoutes;
