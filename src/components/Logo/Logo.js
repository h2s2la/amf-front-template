import React from 'react';
// material-ui
import {useTheme} from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
	const theme = useTheme();

	return (
		/**
		 * if you want to use image instead of svg uncomment following, and comment out <svg> element.
		 *
		 * <img src={logo} alt="Mantis" width="100" />
		 *
		 */
		<>
			<svg
				width='200'
				height='50'
				viewBox='0 0 200 50'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M155 15L180 45H130L155 15Z'
					fill={theme.palette.primary.dark}
				/>
				<text
					x='10'
					y='35'
					fill={theme.palette.primary.dark}
					fontSize='24'
					fontFamily='Arial, sans-serif'
					fontWeight='bold'
				>
					CampingGo
				</text>
			</svg>
		</>
	);
};

export default Logo;
