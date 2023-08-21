import React from 'react';

import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
//import MinimalLayout from 'layout/MinimalLayout';
const DefaultPage = Loadable(lazy(() => import('pages/DefaultPage')));

const CampgroundList = Loadable(
	lazy(() => import('pages/camp/CampgroundList')),
);
const Campground = Loadable(lazy(() => import('pages/camp/Campground')));
// const Board = Loadable(lazy(() => import('pages/board/Board')));
// const Post = Loadable(lazy(() => import('pages/board/Post')));
const CreateCampground = Loadable(
	lazy(() => import('pages/camp/CreateCampground')),
);
const UpdateCampground = Loadable(
	lazy(() => import('pages/camp/UpdateCampground')),
);

const CampsiteList = Loadable(lazy(() => import('pages/camp/CampsiteList')));

const CreateCampsite = Loadable(
	lazy(() => import('pages/camp/CreateCampsite')),
);

const UpdateCampsite = Loadable(
	lazy(() => import('pages/camp/UpdateCampsite')),
);

const Booking = Loadable(lazy(() => import('pages/camp/Booking')));
const BookingComplete = Loadable(
	lazy(() => import('pages/camp/BookingComplete')),
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
		{
			path: 'camps/:id',
			element: <Campground />,
		},
		{
			path: 'booking/:id',
			element: <Booking />,
		},
		{
			path: 'bookingComplete/:bookingId',
			element: <BookingComplete />,
		},
		{
			path: 'campground/regist',
			element: <CreateCampground />,
		},
		{
			path: 'campground/modify',
			element: <UpdateCampground />,
		},
		{
			path: 'campsite',
			element: <CampsiteList />,
		},
		{
			path: 'campsite/regist',
			element: <CreateCampsite />,
		},
		{
			path: 'campsite/:id',
			element: <UpdateCampsite />,
		},
	],
};

export default CampRoutes;
