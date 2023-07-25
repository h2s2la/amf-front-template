import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {getCampingData} from 'api/campground';

const Search = () => {
	const [region, setRegion] = useState('');
	const [name, setName] = useState('');
	const [data, setData] = useState(null);

	const handleRegionChange = (e) => {
		setRegion(e.target.value);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleSearch = async () => {
		try {
			const response = await getCampingData(region, name);
			setData(response.data);
		} catch (error) {
			//console.error(error);
		}
	};

	return (
		<div className='container'>
			<h1>캠핑장 조회</h1>
			<div className='form-group'>
				<label htmlFor='region'>지역선택</label>
				<select
					id='region'
					className='form-control'
					value={region}
					onChange={handleRegionChange}
				>
					<option value=''>전체</option>
					<option value='서울'>서울</option>
					<option value='경기'>경기</option>
					<option value='강원'>강원</option>
					{/* ... */}
				</select>
			</div>
			<div className='form-group'>
				<label htmlFor='name'>캠핑장 이름</label>
				<input
					id='name'
					className='form-control'
					type='text'
					value={name}
					onChange={handleNameChange}
				/>
			</div>
			<button className='btn btn-primary' onClick={handleSearch}>
				검색
			</button>
			{data && (
				<Link
					to={{
						pathname: '/result',
						state: {data},
					}}
				>
					결과 보기
				</Link>
			)}
		</div>
	);
};

export default Search;
