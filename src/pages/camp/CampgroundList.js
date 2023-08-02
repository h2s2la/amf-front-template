import styled from 'styled-components';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
//import ToggleThemeButton from './components/ToggleThemeButton';
import Hero from './components/Hero';
import ResultContainer from './components/ResultContainer';
//import Footer from './components/Footer';
import {getCampgroundList} from 'api/camp';
import {getCampsiteListFindByName} from 'api/camp';

import './App.css';
import EmptyResult from './components/EmptyResult';

const Container = styled.div`
	position: relative;
	background-color: var(--primary);
	min-height: 100vh;
	max-height: none;
`;
// .css-41abqd-MuiTableContainer-root{
// 	width:100%;
// 	overflow-x:auto;
// 	max-height:none;
//   }
function CampgroundList() {
	//const [data, setData] = useState({total: 0, totalHits: 0, hits: []});
	const [data, setData] = useState();
	const [name, setName] = useState('');
	const [area, setArea] = useState('all');
	// const [orientation, setOrientation] = useState('all');
	//	const [page, setPage] = useState(1);
	//	const [perPage, setPerPage] = useState(20);
	const target = useRef(null);
	//	const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

	// useEffect(() => {
	// 	const fetch = async () => {
	// 		// const data = await getCampgroundList({
	// 		// 	// q: query,
	// 		// 	// orientation: orientation,
	// 		// 	// order: order,
	// 		// 	// page: page,
	// 		// 	// per_page: perPage,
	// 		// });
	// 		if (page === 1) {
	// 			setData(data);
	// 		} else {
	// 			setData((prevData) => ({
	// 				...prevData,
	// 				hits: [...prevData.hits, ...data.hits],
	// 			}));
	// 		}
	// 	};
	// 	fetch();
	// }, [query, orientation, order, page, perPage]);

	useEffect(() => {
		console.log('검색조건 없음');
		findCampgroundList();
	}, []);

	useEffect(() => {
		console.log('검색조건 있음');
		const fetch = async () => {
			const data = await getCampsiteListFindByName(name);
			setData(data);
		};
		fetch();
	}, [name]);

	const findCampgroundList = async () => {
		//	setLoading(true);
		const response = await getCampgroundList();
		setData(response);
		//	setLoading(false);
	};

	// const callback = ([entries]) => {
	// 	if (entries.isIntersecting) {
	// 		setPage((prev) => prev + 1);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!target.current) return;
	// 	const observer = new IntersectionObserver(callback, {
	// 		threshold: 1,
	// 	});
	// 	observer.observe(target.current);
	// }, []);

	// useEffect(() => {
	// 	setPage(1);
	// }, [query, orientation, order, perPage]);

	return (
		<>
			<Container>
				<Hero
					setName={setName}
					setArea={setArea}
					//	setOrientation={setOrientation}
					//	setPerPage={setPerPage}
				/>
				<ResultContainer
					data={data}
					name={name}
					area={area}
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
