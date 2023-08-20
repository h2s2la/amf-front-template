// assets
import {LoginOutlined, ProfileOutlined} from '@ant-design/icons';
// icons
const icons = {
	LoginOutlined,
	ProfileOutlined,
};
// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const login = {
	id: 'authentication',
	title: '인증',
	type: 'group',
	children: [
		{
			id: 'login',
			title: 'Login',
			type: 'item',
			url: '/login',
			icon: icons.LoginOutlined,
			//		target: true,
		},
		{
			id: 'register',
			title: 'Register',
			type: 'item',
			url: '/sign-up',
			icon: icons.ProfileOutlined,
			//		target: true,
		},
	],
};
export default login;
