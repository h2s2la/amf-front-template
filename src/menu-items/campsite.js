// icons
import {CommentOutlined, UserOutlined} from '@ant-design/icons';
const icons = {
	CommentOutlined,
	UserOutlined,
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //
const campsite = {
	id: 'campsite-menu',
	title: '캠핑장 메인메뉴',
	type: 'group',
	children: [
		{
			id: 'campground',
			title: '캠핑장',
			type: 'collapse',
			icon: icons.CommentOutlined,
			children: [
				{
					id: 'campgroundInfo',
					title: '캠핑장 등록',
					type: 'item',
					url: '/campground/regist',
				},
				{
					id: 'campgroundInfoModify',
					title: '캠핑장 수정',
					type: 'item',
					url: '/campground/modify',
				},
				{
					id: 'campsiteInfo',
					title: '캠핑사이트 관리',
					type: 'item',
					url: '/campsite',
				},
			],
		},
		{
			id: 'mypage',
			title: '예약관리',
			type: 'collapse',
			icon: icons.UserOutlined,
			children: [
				{
					id: 'booking',
					title: '예약관리(캠지기)',
					type: 'item',
					url: '/campBookingList',
				},
				// {
				// 	id: 'review',
				// 	title: '후기관리',
				// 	type: 'item',
				// 	url: '/reviewList',
				// },
			],
		},
	],
};
export default campsite;
