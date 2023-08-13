import React from 'react';
import {useState, useRef} from 'react';
import styled from 'styled-components';
import {ReactComponent as SearchIcon} from 'assets/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';
import {useEffect} from 'react';
import {Grid} from '@mui/material';
//import {getCampsiteListFindByName} from 'api/camp';

const SearchTagContainer = styled.div`
	display: flex;
	width: 100%;
	overflow: auto;
	justify-content: center;
`;

const SearchBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 16px;
	padding: 4px 16px;
	width: 100%;
	align-items: center;
	border-radius: 8px;
	background-color: #ffffff;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

// const SearchBoxWrapper = styled.div`
// 	display: flex;
// 	align-items: center;
// `;

// const SearchBoxSelect = styled.select`
// 	margin: 16px;
// 	padding: 16px;
// 	border-radius: 8px;
// 	border-color: #ffffff;
// 	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
// 	font-size: 16px;
// 	flex-direction: row;
// 	width: 85%;
// 	color: #5e5e5e;
// 	height: fit-content;
// 	display: flex;
// 	align-items: center;

// 	& > option {
// 		background-color: white;
// 		color: black;
// 	}
// 	&:focus {
// 		outline-color: #5e5e5e;
// 	}
// `;

const SearchInputContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
`;

const SearchInput = styled.input`
	background: transparent;
	font-size: 16px;
	outline: none;
	color: #5e5e5e;
	border: none;
	flex: auto;
	margin-left: 8px;
`;

const SearchOptionButton = styled.p`
	cursor: pointer;
	font-size: 14px;
	text-decoration: underline;
	color: #5e5e5e;
`;

const Search = ({setName, setArea}) => {
	const savedSearchTags = localStorage.getItem('searchTags');
	const initialSearchTags = savedSearchTags
		? JSON.parse(savedSearchTags)
		: [];
	const [searchOption, setSearchOption] = useState(false);
	const [searchTags, setSearchTags] = useState(initialSearchTags);
	const inputRef = useRef(null);
	// const [region, setRegion] = React.useState('');

	// const handleRegionChange = (event) => {
	// 	setRegion(event.target.value);
	// };

	const updateSearchInput = (value) => {
		inputRef.current.value = value;
	};

	const toggleSearchOption = () => {
		setSearchOption((prev) => !prev);
	};
	//const [data, setData] = useState([]);
	const onSearch = async (e) => {
		if (e.key === 'Enter') {
			const name = e.target.value;
			setName(name);
			updateSearchInput('');
			// setSearchTags((prev) => [...prev, currentValue]);
			// const response = await getCampsiteListFindByName(name);
			// console.log(
			// 	name + '이름으로 조회결과 : ' + JSON.stringify(response),
			// );

			// setData(response);
		}
	};

	const searchTag = (tag) => {
		setName(tag);
		updateSearchInput(tag);
	};

	const deleteTag = (idx) => {
		const newSearchTags = [...searchTags];
		newSearchTags.splice(idx, 1);
		setSearchTags(newSearchTags);
	};

	useEffect(() => {
		localStorage.setItem('searchTags', JSON.stringify(searchTags));
	}, [searchTags]);

	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<SearchBoxContainer>
						<SearchInputContainer>
							<SearchIcon width='24' fill='#5e5e5e' />
							<SearchInput
								ref={inputRef}
								placeholder='검색어 입력 후 ENTER'
								onKeyDown={onSearch}
							/>
							<SearchOptionButton onClick={toggleSearchOption}>
								검색 옵션 {searchOption ? '닫기' : '열기'}
							</SearchOptionButton>
						</SearchInputContainer>

						<div hidden={!searchOption}>
							<SearchOption setName={setName} setArea={setArea} />
						</div>
					</SearchBoxContainer>
				</Grid>
			</Grid>
			<SearchTagContainer>
				{searchTags.map((tag, idx) => (
					<SearchTag
						key={tag + idx}
						tag={tag}
						searchTag={() => searchTag(tag)}
						deleteTag={() => deleteTag(idx)}
					/>
				))}
			</SearchTagContainer>
		</>
	);
};

export default Search;
