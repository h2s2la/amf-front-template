import styled from 'styled-components';
//import {useState} from 'react';

// import ImageCard from './ImageCard';
// import ImageModal from './ImageModal';
// import Pagination from './Pagination';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import React, {useCallback} from 'react';

const Container = styled.div`
	max-width: 1830px;
	margin: 0px auto;
	padding-right: 8px;
	max-height: none;
`;

const ResultsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
`;

const ResultContainer = ({data, name, area}) => {
	const navigate = useNavigate();

	const rowClick = useCallback((e, row) => {
		const id = row.id;
		navigate(`/camps/${id}`);
	}, []);
	//	const [currentImageDetail, setCurrentImageDetail] = useState(null);
	console.log(
		'조회결과 : ' +
			JSON.stringify(data) +
			', name :' +
			name +
			', area : ' +
			area,
	);
	return (
		<Container>
			<DataTable
				columns={columns}
				rows={data}
				rowsPerPageOptions={[10, 20, 30]}
				rowClick={rowClick}
			/>
			{/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
			{/* {currentImageDetail && (
				// <ImageModal
				// 	currentImageDetail={currentImageDetail}
				// 	setCurrentImageDetail={setCurrentImageDetail}
				// />
			)} */}
			{/* {data.hits?.length > 0 && (
				<Pagination
					page={page}
					setPage={setPage}
					numOfPages={numOfPages}
				/>
			)} */}
			<ResultsWrapper>
				{/* {data.hits?.length > 0 &&
					data.hits?.map((imgData, idx) => (
						// <ImageCard
						// 	key={`${imgData.id}${idx}`}
						// 	imgData={imgData}
						// 	onClick={() => setCurrentImageDetail(imgData)}
						// />
					))} */}
			</ResultsWrapper>
		</Container>
	);
};

const columns = [
	{
		id: 'camp',

		width: 600,
		align: 'center',
		render: (rowData) => (
			<>
				<img
					src={rowData.campThumImage}
					alt='campThumImage'
					height='200'
					//	width='150'
					style={{objectFit: 'cover'}}
				/>
				<div>
					<b>{rowData.name}</b>
				</div>
				<div>{rowData.address}</div>
			</>
		),
	},
	// {
	// 	id: 'campsiteName',
	// 	label: '사이트 이름',
	// 	width: 300,
	// 	align: 'left',
	// },
	// {
	// 	id: 'usageFee',
	// 	label: '이용 요금(원)',
	// 	width: 100,
	// 	align: 'left',
	// },
	// {
	// 	id: 'limitedNumber',
	// 	label: '제한 인원 수(명)',
	// 	width: 100,
	// 	align: 'left',
	// },
];

export default ResultContainer;
