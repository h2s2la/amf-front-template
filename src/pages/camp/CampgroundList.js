import styled from 'styled-components';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import ToggleThemeButton from './components/ToggleThemeButton';
import Hero from './components/Hero';
import ResultContainer from './components/ResultContainer';
import Footer from './components/Footer';
//import getCampgroundList from 'api/camp';
import './App.css';
import EmptyResult from './components/EmptyResult';

const Container = styled.div`
	position: relative;
	background-color: var(--primary);
	min-height: 100vh;
`;

function CampgroundList() {
	const [data, setData] = useState({total: 0, totalHits: 0, hits: []});
	const [query, setQuery] = useState('');
	const [order, setOrder] = useState('popular');
	const [orientation, setOrientation] = useState('all');
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const target = useRef(null);
	const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

	useEffect(() => {
		const fetch = async () => {
			// const data = await getCampgroundList({
			// 	// q: query,
			// 	// orientation: orientation,
			// 	// order: order,
			// 	// page: page,
			// 	// per_page: perPage,
			// });
			if (page === 1) {
				setData(data);
			} else {
				setData((prevData) => ({
					...prevData,
					hits: [...prevData.hits, ...data.hits],
				}));
			}
		};
		fetch();
	}, [query, orientation, order, page, perPage]);

	const callback = ([entries]) => {
		if (entries.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		if (!target.current) return;
		const observer = new IntersectionObserver(callback, {
			threshold: 1,
		});
		observer.observe(target.current);
	}, []);

	useEffect(() => {
		setPage(1);
	}, [query, orientation, order, perPage]);

	return (
		<>
			<Container>
				<Hero
					setQuery={setQuery}
					setOrder={setOrder}
					setOrientation={setOrientation}
					setPerPage={setPerPage}
				/>
				<ResultContainer
					data={data}
					page={page}
					setPage={setPage}
					numOfPages={numOfPages}
				/>
				{page !== numOfPages && (
					<div ref={target}>
						<EmptyResult isLoading={data.totalHits} />
					</div>
				)}
				<Footer />
				<ToggleThemeButton />
			</Container>
		</>
	);
}

export default CampgroundList;
