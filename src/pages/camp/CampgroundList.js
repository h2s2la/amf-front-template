import styled from 'styled-components';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
//import ToggleThemeButton from './components/ToggleThemeButton';
import Hero from './components/Hero';
import ResultContainer from './components/ResultContainer';
//import Footer from './components/Footer';
import {getCampsiteListFindByRequireGrade} from 'api/camp';
import {getCampsiteListFindByName} from 'api/camp';

import './App.css';
import EmptyResult from './components/EmptyResult';

const Container = styled.div`
	position: relative;
	background-color: var(--primary);
	min-height: 100vh;
	max-height: none;
`;

function CampgroundList() {
	const [data, setData] = useState();
	const [name, setName] = useState('');
	//	const [area, setArea] = useState('all');

	const target = useRef(null);

	const user = useSelector((state) => state.user);
	const {memberId, memberName, memberType, memberGrade} = user;
	useEffect(() => {
		console.log('검색조건 없음');
		findCampgroundList();
	}, []);

	useEffect(() => {
		console.log(
			'검색조건 있음 등급은 : ' +
				memberGrade +
				'ID : ' +
				memberId +
				', 이름 :' +
				memberName +
				', 타입 : ' +
				memberType,
		);

		const fetch = async () => {
			const data = await getCampsiteListFindByName(memberGrade, name);
			setData(data);
		};
		fetch();
	}, [name]);

	const findCampgroundList = async () => {
		//	setLoading(true);
		const response = await getCampsiteListFindByRequireGrade(memberGrade);
		setData(response);
		//	setLoading(false);
	};

	return (
		<>
			<Container>
				<Hero
					setName={setName}
					//setArea={setArea}
					//	setOrientation={setOrientation}
					//	setPerPage={setPerPage}
				/>
				<ResultContainer
					data={data}
					name={name}
					//	area={area}
					//	setPage={setPage}
					//	numOfPages={numOfPages}
				/>
				{data == null && (
					<div ref={target}>
						<EmptyResult isLoading={false} />
					</div>
				)}
			</Container>
		</>
	);
}

export default CampgroundList;
