// icons
import {CommentOutlined, UserOutlined, SearchOutlined} from '@ant-design/icons';
const icons = {
	CommentOutlined,
	UserOutlined,
	SearchOutlined,
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //
const camper = {
	id: 'camper-menu',
	title: '캠퍼 메인메뉴',
	type: 'group',
	children: [
		{
			id: 'campground',
			title: '캠핑장',
			type: 'collapse',
			icon: icons.SearchOutlined,
			children: [
				{
					id: 'camp',
					title: '캠핑장 조회',
					type: 'item',
					url: '/campground',
				},
			],
		},
		{
			id: 'mypage',
			title: 'MyPage',
			type: 'collapse',
			icon: icons.UserOutlined,
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
					url: '/reviewList',
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
export default camper;
