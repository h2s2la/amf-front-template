import React from 'react';

import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
//import MinimalLayout from 'layout/MinimalLayout';
const DefaultPage = Loadable(lazy(() => import('pages/DefaultPage')));

const ReviewList = Loadable(lazy(() => import('pages/mypage/ReviewList')));
const CreateReview = Loadable(lazy(() => import('pages/mypage/CreateReview')));
const CreateCampReview = Loadable(
	lazy(() => import('pages/mypage/CreateCampReview')),
);
const Review = Loadable(lazy(() => import('pages/mypage/Review')));
// const Board = Loadable(lazy(() => import('pages/board/Board')));
// const Post = Loadable(lazy(() => import('pages/board/Post')));
// const Createcampground = Loadable(
// 	lazy(() => import('pages/camp/CreateCampground')),
// );

// const CampsiteList = Loadable(lazy(() => import('pages/camp/CampsiteList')));

// const Createcampsite = Loadable(
// 	lazy(() => import('pages/camp/CreateCampsite')),
// );

const BookingList = Loadable(lazy(() => import('pages/mypage/BookingList')));
const CampBookingList = Loadable(
	lazy(() => import('pages/mypage/CampBookingList')),
);
// const BookingComplete = Loadable(
// 	lazy(() => import('pages/camp/BookingComplete')),
// );

// const UpdatePost = Loadable(lazy(() => import('pages/board/UpdatePost')));

// ==============================|| MAIN ROUTING ||============================== //

const MypageRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '',
			element: <DefaultPage />,
		},
		{
			path: 'reviewList',
			element: <ReviewList />,
		},
		{
			path: 'createReview/:bookingId',
			element: <CreateReview />,
		},
		{
			path: 'createCampReview/:bookingId',
			element: <CreateCampReview />,
		},
		{
			path: 'review/:review_id',
			element: <Review />,
		},
		{
			path: 'bookingList',
			element: <BookingList />,
		},
		{
			path: 'campBookingList',
			element: <CampBookingList />,
		},
		// {
		// 	path: 'bookingComplete/:bookingId',
		// 	element: <BookingComplete />,
		// },
		// {
		// 	path: 'board',
		// 	element: <Board />,
		// },
		// {
		// 	path: 'post/:id',
		// 	element: <Post />,
		// },
		// {
		// 	path: 'campground/regist',
		// 	element: <Createcampground />,
		// },
		// {
		// 	path: 'campsite',
		// 	element: <CampsiteList />,
		// },
		// {
		// 	path: 'campsite/regist',
		// 	element: <Createcampsite />,
		// },
		// {
		// 	path: 'post/update',
		// 	element: <UpdatePost />,
		// },
	],
};

export default MypageRoutes;
