// assets
import {LogoutOutlined} from '@ant-design/icons';
// icons
const icons = {
	LogoutOutlined,
};
// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const logout = {
	id: 'logout',
	title: '인증',
	type: 'group',
	children: [
		{
			id: 'logout',
			title: 'Logout',
			type: 'item',
			url: '/logout',
			icon: icons.LogOutlined,
			//		target: true,
		},
	],
};
export default logout;
