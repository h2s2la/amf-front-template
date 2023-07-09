// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
	LoginOutlined,
	ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
	id: 'authentication',
	title: '인증',
	type: 'group',
	children: [
		{
			id: 'login',
			title: 'Login',
			type: 'item',
			url: '/auth/login',
			icon: icons.LoginOutlined,
			target: true
		},
		{
			id: 'register',
			title: 'Register',
			type: 'item',
			url: '/auth/sign-up',
			icon: icons.ProfileOutlined,
			target: true
		}
	]
};

export default pages;
