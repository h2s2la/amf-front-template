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
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true); // Introduce a loading state
	const [name, setName] = useState('');
	//	const [area, setArea] = useState('all');

	const target = useRef(null);

	const user = useSelector((state) => state.user);
	const {memberId, memberName, memberType, memberGrade} = user;
	useEffect(() => {
		console.log('검색조건 없음');
		findCampgroundList();
	}, []);
	const findCampgroundList = async () => {
		setLoading(true);
		try {
			const response = await getCampsiteListFindByRequireGrade(
				memberGrade,
			);
			console.log('검색조건 없음 : ' + JSON.stringify(response));
			setData(response);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};
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

		const fetchData = async () => {
			setLoading(true); // Start loading
			try {
				let fetchedData;
				if (name === null || name === '') {
					fetchedData = await getCampsiteListFindByRequireGrade(
						memberGrade,
					);
					console.log('네임 널' + JSON.stringify(fetchedData));
				} else {
					fetchedData = await getCampsiteListFindByName(
						memberGrade,
						name,
					);
					console.log('네임 널아님' + JSON.stringify(fetchedData));
				}
				setData(fetchedData);
				setLoading(false); // Finished loading
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [name, memberGrade]);

	console.log('Data:', data); // Check the fetched data in the console
	return (
		<>
			<Container>
				<Hero
					setName={setName}
					//setArea={setArea}
					//	setOrientation={setOrientation}
					//	setPerPage={setPerPage}
				/>
				{!loading ? (
					<ResultContainer data={data} name={name} />
				) : (
					<div ref={target}>
						<EmptyResult isLoading={false} />
					</div>
				)}
			</Container>
		</>
	);
}

export default CampgroundList;
