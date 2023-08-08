import {useRoutes} from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import CampRoutes from './CampRoutes';
import MypageRoutes from './MypageRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([MainRoutes, LoginRoutes, CampRoutes, MypageRoutes]);
}
