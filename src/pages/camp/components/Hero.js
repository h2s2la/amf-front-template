import styled from 'styled-components';
import React from 'react';
import Search from './Search';

const Container = styled.div`
	position: relative;
	width: 100%;
	background-color: var(--secondary);
`;

const HeroTitle = styled.h1`
	margin: 8px 0px;
`;

const HeroTitleLink = styled.a`
	text-decoration: none;
	color: var(--text);
	&:hover {
		color: var(--highlight);
	}
`;

const HeroSubtitle = styled.p`
	margin: 0px;
	color: var(--highlight);
	font: 24px;
`;

const Content = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	padding: 0px 32px 1px 2px;
`;

const Hero = ({setName, setArea}) => {
	return (
		<Container>
			<Content>
				<HeroTitle>
					<HeroTitleLink href='./'>캠핑장 조회</HeroTitleLink>
				</HeroTitle>
				<HeroSubtitle>
					원하는 지역이나, 캠핑장 명으로 검색하세요{' '}
				</HeroSubtitle>
				<Search setName={setName} setArea={setArea} />
			</Content>
		</Container>
	);
};

export default Hero;
