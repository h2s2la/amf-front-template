import React from 'react';
import mainImage from '../assets/images/background_comp.jpg';
import './Main.css';
const DefaultPage = () => {
	// return <></>;
	return (
		<div className='main-container'>
			<img className='main-image' src={mainImage} alt='메인 이미지' />
		</div>
	);
};

export default DefaultPage;
