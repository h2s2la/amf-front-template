import React, {useCallback, useEffect, useState} from 'react';
import {/*Button,*/ Grid, Autocomplete, TextField} from '@mui/material';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import {getCampgrounds} from 'api/camp';

//import CampgroundItem from 'components/CampgroundItem';

const Campgrounds = () => {
	const navigate = useNavigate();
	const [campgrounds, setCampgrounds] = useState([]);
	//const [isLoading, setLoading] = useState(false);
	const [region, setRegion] = useState('');
	// const [name, setName] = useState('');
	// const [data, setData] = useState(null);

	const regions = [
		'지역선택',
		'수도권',
		'강원권',
		'충청권',
		'경상권',
		'전라권',
		'제주권',
	];

	useEffect(() => {
		findCampgroundList();
	}, []);

	const findCampgroundList = async () => {
		//		setLoading(true);
		const data = await getCampgrounds();
		setCampgrounds(data); // 캠핑장 데이터를 상태로 설정합니다.
		//		setLoading(false);
	};

	// const moveCreateCampgroundPage = () => {
	// 	navigate(`/campground/regist`);
	// };

	const rowClick = useCallback((e, row) => {
		const campgroundId = row.id;
		navigate(`/campground/${campgroundId}`);
	}, []);

	const handleRegionChange = (event, value) => {
		setRegion(value);
	};

	return (
		<div>
			<h1>캠핑장 조회</h1>
			<>
				{/* <Grid
					container
					direction='row'
					justifyContent='flex-end'
					spacing={2}
				>
					<Grid item>
						<Button
							variant='contained'
							onClick={moveCreateCampgroundPage}
						>
							등록하기
						</Button>
					</Grid>
				</Grid> */}
				<Grid
					container
					direction='row'
					justifyContent='center'
					spacing={200}
				>
					<Grid item>
						<Autocomplete
							id='region-select'
							value={region}
							onChange={handleRegionChange}
							options={regions}
							renderInput={(params) => (
								<TextField
									{...params}
									label='지역선택'
									variant='outlined'
									size='large'
								/>
							)}
						></Autocomplete>
					</Grid>
				</Grid>
				<DataTable
					columns={columns}
					rows={campgrounds}
					rowsPerPageOptions={[10, 20, 30]}
					//				isLoading={isLoading}
					rowClick={rowClick}
				/>
			</>
			{/* {campgrounds.map((campground) => (
				<CampgroundItem key={campground.id} campground={campground} />
			))} */}
		</div>
	);
};

export default Campgrounds;
const columns = [
	{
		id: 'CampGroundNm',
		label: '캠핑장 이름',
		width: 290,
		align: 'left',
	},
	{
		id: 'author',
		label: '작성자',
		width: 60,
		align: 'left',
	},
];
