// icons
import {CommentOutlined} from '@ant-design/icons';

const icons = {
	CommentOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const main = {
	id: 'main-menu',
	title: '메인메뉴',
	type: 'group',
	children: [
		{
			id: 'campground',
			title: '캠핑장',
			type: 'collapse',
			icon: icons.CommentOutlined,
			children: [
				{
					id: 'camp',
					title: '캠핑장 조회',
					type: 'item',
					url: '/campground',
				},
				{
					id: 'campgroundInfo',
					title: '캠핑장 정보',
					type: 'item',
					url: '/campground/regist',
				},
				{
					id: 'campsiteInfo',
					title: '캠핑사이트 정보',
					type: 'item',
					url: '/campsite',
				},
			],
		},
		{
			id: 'mypage',
			title: 'MyPage',
			type: 'collapse',
			icon: icons.CommentOutlined,
			children: [
				{
					id: 'booking',
					title: '예약내역 조회',
					type: 'item',
					url: '/bookingList',
				},
				{
					id: 'review',
					title: '후기관리',
					type: 'item',
					url: '/review',
				},
			],
		},

		{
			id: 'board',
			title: 'QnA',
			type: 'collapse',
			icon: icons.CommentOutlined,
			children: [
				{
					id: 'book',
					title: '일반게시판',
					type: 'item',
					url: '/board',
				},
			],
		},
	],
};

export default main;
