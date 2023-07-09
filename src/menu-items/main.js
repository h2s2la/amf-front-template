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
			id: 'board',
			title: '게시판',
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
