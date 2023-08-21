import React, {useCallback, useEffect, useState} from 'react';
import {Button, Grid} from '@mui/material';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import {getCampsiteList} from 'api/camp';
import {getMyCampground} from 'api/camp';
import {useSelector} from 'react-redux';
const CampsiteList = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const {memberId} = user;
	useEffect(() => {
		findCampsiteList();
	}, [memberId]);

	const findCampsiteList = async () => {
		setLoading(true);
		const response = await getCampsiteList();

		const result = await getMyCampground({id: memberId});
		// response에서 result의 campId와 같은 것만 필터링
		const myCampsite = response.filter((item) => item.campId === result.id);
		setData(myCampsite);
		setLoading(false);
	};

	const moveRegistCampsite = () => {
		navigate(`/campsite/regist`);
	};

	const rowClick = useCallback((e, row) => {
		const campsiteId = row.id;
		navigate(`/campsite/${campsiteId}`);
	}, []);

	return (
		<>
			<Grid
				container
				direction='row'
				justifyContent='flex-end'
				spacing={2}
			>
				<Grid item>
					<Button variant='contained' onClick={moveRegistCampsite}>
						등록하기
					</Button>
				</Grid>
			</Grid>
			<DataTable
				columns={columns}
				rows={data}
				rowsPerPageOptions={[10, 20, 30]}
				isLoading={isLoading}
				rowClick={rowClick}
			/>
		</>
	);
};
export default CampsiteList;

{
	/* <div>
<img src={companyLogo} alt="BigCo Inc. logo"/>
</div> */
}

const columns = [
	{
		id: 'image',
		label: '대표이미지',
		width: 60,
		align: 'left',
		render: (rowData) => (
			<img
				src={rowData.campsiteThumImage}
				alt='campsite'
				height='150'
				//	width='150'
				style={{objectFit: 'cover'}}
			/>
		),
	},
	{
		id: 'campsiteName',
		label: '사이트 이름',
		width: 300,
		align: 'left',
	},
	{
		id: 'price',
		label: '이용 요금(원)',
		width: 100,
		align: 'left',
	},
];
