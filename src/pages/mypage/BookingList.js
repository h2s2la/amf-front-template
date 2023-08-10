//import React, {useCallback, useEffect, useState} from 'react';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Button, Grid} from '@mui/material';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import {getBookingList} from 'api/booking';
import {getCampsiteList} from 'api/camp';

const BookingList = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	// render 함수 정의
	const render = (rowData) => {
		const date = moment(rowData.createdAt);
		const formattedDate = date.format('YY.MM.DD');

		// rowData.startDate 값을 Date 객체로 변환
		const startDate = new Date(rowData.startDate);

		// Date 객체를 원하는 형식으로 변환
		const formattedStartDate = startDate.toLocaleDateString('ko-KR', {
			year: '2-digit', // 년도를 2자리로 표시
			month: '2-digit', // 월을 2자리로 표시
			day: '2-digit', // 일을 2자리로 표시
			weekday: 'short', // 요일을 짧게 표시
		});

		// rowData.startDate 값을 Date 객체로 변환
		const endDate = new Date(rowData.endDate);

		// Date 객체를 원하는 형식으로 변환
		const formattedEndDate = endDate.toLocaleDateString('ko-KR', {
			year: '2-digit', // 년도를 2자리로 표시
			month: '2-digit', // 월을 2자리로 표시
			day: '2-digit', // 일을 2자리로 표시
			weekday: 'short', // 요일을 짧게 표시
		});

		// Date 객체의 밀리초 값을 구함
		const endTime = endDate.getTime();
		const startTime = startDate.getTime();

		// 밀리초 값을 일 단위로 변환
		const diffTime = endTime - startTime; // 두 날짜의 밀리초 차이
		const diffDay = diffTime / (1000 * 60 * 60 * 24); // 밀리초를 일 단위로 나눔
		// 버튼 클릭 시 실행할 함수 정의
		const handleClick = () => {
			// /review/{rowData.id}로 이동
			navigate(`/review/${rowData.id}`);
		};
		return (
			<>
				<div
					style={{
						display: 'inline-block', // 블록 요소를 인라인 요소처럼 표시
						border: '1px solid gray', // 회색 테두리 설정
						borderRadius: '10px', // 모서리 둥글게 설정
						padding: '5px', // 테두리와 글자 사이에 간격 주기
						boxShadow: '3px 3px 5px rgba(0,0,0,0.3)', // 그림자 효과 설정
						width: '400px', // 넓이를 100픽셀로 설정
					}}
				>
					<div
						style={{
							display: 'flex', // flexbox 레이아웃 사용
							alignItems: 'center', // 수직 정렬
							justifyContent: 'left', // 수평 정렬
							fontSize: '20px', // 글자 크기를 20픽셀로 설정
						}}
					>
						<b>{<div>{formattedDate}</div>}</b>
					</div>
					<br></br>
					<div
						style={{
							display: 'flex', // flexbox 레이아웃 사용
							alignItems: 'center', // 수직 정렬
							justifyContent: 'left', // 수평 정렬
						}}
					>
						<b>
							{/* switch 문 사용 */}
							{
								<div
									style={{
										display: 'inline-block', // 블록 요소를 인라인 요소처럼 표시
										border: '1px solid gray', // 회색 테두리 설정
										color: 'gray', // 회색 글자색 설정
										borderRadius: '10px', // 모서리 둥글게 설정
										padding: '5px', // 테두리와 글자 사이에 간격 주기
										margin: '7px', // div 사이에 10픽셀의 간격 주기
									}}
								>
									{(() => {
										switch (rowData.status) {
											case 'PAYMENT':
												return '결제완료';
											case 'BOOKING':
												return '예약';
											case 'DONE':
												return '사용완료';
											case 'CANCLED':
												return '취소';
											default:
												return '';
										}
									})()}
								</div>
							}
						</b>
					</div>
					<div
						style={{
							display: 'flex', // flexbox 레이아웃 사용
							alignItems: 'center', // 수직 정렬
							justifyContent: 'left', // 수평 정렬
							margin: '5px', // div 사이에 10픽셀의 간격 주기
						}}
					>
						<img
							src={rowData.campsiteThumImage}
							alt='campsite'
							height='90'
							width='90'
							style={{objectFit: 'cover', borderRadius: '10px'}}
						/>
						<div
							style={{
								display: 'block', // 블록 요소로 표시
								marginLeft: '10px',
								justifyContent: 'left',
							}}
						>
							{' '}
							<b>{rowData.site.campName}</b>
							<br></br>
							{rowData.site.siteName}
							<br></br>
							<br></br>
							예약번호 {rowData.id}
						</div>
					</div>

					<div
						style={{
							display: 'flex', // flexbox 레이아웃 사용
							alignItems: 'center', // 수직 정렬
							justifyContent: 'left', // 수평 정렬
						}}
					>
						<div
							style={{
								backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
								borderRadius: '5px', // 모서리 둥글게 설정
								margin: '5px', // div 사이에 10픽셀의 간격 주기
								justifyContent: 'left',
								width: '120px', // 넓이를 100픽셀로 설정
							}}
						>
							{' '}
							체크인
							<br></br>
							<b>{formattedStartDate}</b>
						</div>
						<div
							style={{
								backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
								borderRadius: '5px', // 모서리 둥글게 설정
								mamargin: '5px', // div 사이에 10픽셀의 간격 주기
								justifyContent: 'left',
								width: '120px', // 넓이를 100픽셀로 설정
							}}
						>
							{' '}
							체크아웃
							<br></br>
							<b>{formattedEndDate}</b>
						</div>
						<div
							style={{
								backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
								borderRadius: '5px', // 모서리 둥글게 설정
								margin: '5px', // div 사이에 10픽셀의 간격 주기
								justifyContent: 'left',
								width: '60px', // 넓이를 100픽셀로 설정
							}}
						>
							{' '}
							박<br></br>
							<b>{diffDay}</b>
						</div>
						<div
							style={{
								backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
								borderRadius: '5px', // 모서리 둥글게 설정
								margin: '5px', // div 사이에 10픽셀의 간격 주기
								justifyContent: 'left',
								width: '60px', // 넓이를 100픽셀로 설정
							}}
						>
							{' '}
							인원<br></br>
							<b>{diffDay + 1}</b>
						</div>
					</div>

					<Button
						disableElevation
						//		disabled={isSubmitting}
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						color='primary'
						margin='7px' // div 사이에 10픽셀의 간격 주기
						onClick={handleClick} // onClick 속성에 함수 할당
					>
						후기작성하기
					</Button>
					<div>{rowData.address}</div>
				</div>
			</>
		);
	};

	const columns = [
		{
			id: 'booking',
			width: 600,
			align: 'center',
			render: render, // render 함수를 할당
		},
	];

	useEffect(() => {
		findBookingList();
	}, []);

	const findBookingList = async () => {
		setLoading(true);
		const response = await getBookingList();
		//setData(response);
		const campsiteResult = await getCampsiteList();
		const campsiteMap = {};
		for (let campsite of campsiteResult) {
			campsiteMap[campsite.id] = campsite.campsiteThumImage;
		}
		const data = response.map((item) => ({
			...item,
			campsiteThumImage: campsiteMap[item.site.siteId],
		}));

		setData(data);
		setLoading(false);
	};

	const moveRegistCampsite = () => {
		navigate(`/campsite/regist`);
	};

	// const rowClick = useCallback((e, row) => {
	// 	const campsiteId = row.id;
	// 	navigate(`/campsite/${campsiteId}`);
	// }, []);

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
				//		rowClick={rowClick}
			/>
		</>
	);
};
export default BookingList;
