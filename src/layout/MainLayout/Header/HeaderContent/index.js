import React from 'react';
// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
	const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

	return (
		<>
			{!matchesXs && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />}

			{/*<IconButton*/}
			{/*    component={Link}*/}
			{/*    href="https://github.com/codedthemes/mantis-free-react-admin-template"*/}
			{/*    target="_blank"*/}
			{/*    disableRipple*/}
			{/*    color="secondary"*/}
			{/*    title="Download Free Version"*/}
			{/*    sx={{ color: 'text.primary', bgcolor: 'grey.100' }}*/}
			{/*>*/}
			{/*    <GithubOutlined />*/}
			{/*</IconButton>*/}

			{/*<Notification />*/}
			{!matchesXs && <Profile />}
			{matchesXs && <MobileSection />}
		</>
	);
};

export default HeaderContent;
