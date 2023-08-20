import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
//import {deletePost, getCampground} from 'api/camp';
import {getCampground} from 'api/camp';
import {getCampReviewList} from 'api/review';
import DataTable from 'components/@extended/DataTable';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
//import {LoadingButton} from '@mui/lab';
//import {useSnackbar} from 'notistack';

const Campgounrd = () => {
	const navigate = useNavigate();
	//const {enqueueSnackbar} = useSnackbar();

	const {id} = useParams();

	const [campground, setCampground] = useState(null);
	const [campReview, setCampReview] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		findCampground();
	}, [id]);

	const findCampground = async () => {
		setLoading(true);
		const result = await getCampground({id});
		setCampground(result);
		const response = await getCampReviewList({id});
		setCampReview(response);
		setLoading(false);
	};

	const goBackList = () => {
		navigate(`/campground`);
	};
	const goBooking = () => {
		navigate(`/booking/${id}`);
	};
	// const deleteClick = async () => {
	// 	try {
	// 		setDeleteLoading(true);
	// 		await deletePost({id});
	// 		enqueueSnackbar('게시글이 삭제되었습니다.', {variant: 'success'});
	// 		setDeleteLoading(false);

	// 		goBackList();
	// 	} catch (err) {
	// 		enqueueSnackbar(err, {variant: 'error'});
	// 		setDeleteLoading(false);
	// 	}
	// };

	// const updatePost = async () => {
	// 	navigate(`/post/update`, {
	// 		state: {
	// 			id: id,
	// 			title: campground.title,
	// 			content: campground.content,
	// 		},
	// 	});
	// };

	return (
		<>
			<Stack direction='row' spacing={2}>
				<Grid container>
					<Grid item>
						<Button variant='contained' onClick={goBackList}>
							목록
						</Button>
					</Grid>
				</Grid>
				<Grid container justifyContent='flex-end'>
					{/* <Grid item>
						<Button
							variant='outlined'
							onClick={updatePost}
							style={{marginRight: 10}}
						>
							수정
						</Button>
					</Grid>
					<Grid item>
						<LoadingButton
							variant='contained'
							onClick={deleteClick}
							color='error'
							loading={deleteLoading}
						>
							삭제
						</LoadingButton>
					</Grid> */}
				</Grid>
			</Stack>
			<Card sx={{p: 2}} style={{borderRadius: '8px', marginTop: 15}}>
				<Toolbar>
					<Typography
						sx={{flex: '1 1 100%'}}
						variant='h4'
						id='tableTitle'
						component='div'
					>
						{campground?.name ? campground.name : ''}
					</Typography>
				</Toolbar>
				<Divider />
				<CardContent>
					{campground && campReview ? (
						<Grid item xs={12}>
							<Stack spacing={1}>
								<img
									src={campground.campThumImage}
									alt='campThumImage'
									style={{
										objectFit: 'contain',
										maxHeight: '300px',
									}}
								/>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='이름'
								>
									{campground.name}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='주소'
								>
									{campground.address}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='연락처'
								>
									{campground.contactNumber}
								</Typography>
								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='캠핑장 소개'
								>
									{'캠핑장 소개'}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='소개'
								>
									{campground.campInfo}
								</Typography>
								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='운영 정책'
								>
									{'운영 정책'}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='이용시간'
								>
									<b>이용시간</b> 입실{' '}
									{campground.checkInTime.slice(0, 2)}:
									{campground.checkInTime.slice(2)} | 퇴실{' '}
									{campground.checkOutTime.slice(0, 2)}:
									{campground.checkOutTime.slice(2)}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='이용시간'
								>
									<b>매너타임</b> 시작{' '}
									{campground.mannerStartTime.slice(0, 2)}:
									{campground.mannerStartTime.slice(2)} | 종료{' '}
									{campground.mannerEndTime.slice(0, 2)}:
									{campground.mannerEndTime.slice(2)}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='성수기'
								>
									<b>성수기</b>{' '}
									{`${new Date(
										campground.peakSeasonStartDate,
									).getFullYear()}.${
										new Date(
											campground.peakSeasonStartDate,
										).getMonth() + 1
									}.${new Date(
										campground.peakSeasonStartDate,
									).getDate()}`}
									-{' '}
									{`${new Date(
										campground.peakSeasonEndDate,
									).getFullYear()}.${
										new Date(
											campground.peakSeasonEndDate,
										).getMonth() + 1
									}.${new Date(
										campground.peakSeasonEndDate,
									).getDate()}`}
								</Typography>
								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='부대시설'
								>
									{'부대시설'}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='facility'
								>
									{campground.campInfo}
								</Typography>
								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='배치도'
								>
									{'배치도'}
								</Typography>
								<img
									src={campground.layoutImage}
									alt='layoutImage'
									style={{
										objectFit: 'contain',
										maxHeight: '300px',
									}}
								/>

								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='방문후기'
								>
									{'방문후기'}
								</Typography>

								<DataTable
									columns={columns}
									rows={campReview}
									rowsPerPageOptions={[3, 10, 20]}
									isLoading={isLoading}
									//rowClick={rowClick}
								/>
							</Stack>
						</Grid>
					) : (
						<Box
							sx={{py: 3, minHeight: 560}}
							style={{textAlign: 'center'}}
						>
							<CircularProgress />
						</Box>
					)}
				</CardContent>
				<br></br>
				<Grid container justifyContent='center'>
					<Grid item>
						<Button variant='contained' onClick={goBooking}>
							예약하기
						</Button>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

const columns = [
	{
		id: 'review',

		width: 1000,
		align: 'center',
		render: (rowData) => (
			<>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row', // Horizontal layout
						alignItems: 'flex-start', // Align items to the top
					}}
				>
					<div
						style={{
							display: 'inline-block', // 블록 요소를 인라인 요소처럼 표시
							//		border: '1px solid gray', // 회색 테두리 설정
							//		borderRadius: '10px', // 모서리 둥글게 설정
							padding: '5px', // 테두리와 글자 사이에 간격 주기
							//		boxShadow: '3px 3px 5px rgba(0,0,0,0.3)', // 그림자 효과 설정
							//		width: '400px', // 넓이를 100픽셀로 설정
							justifyContent: 'left',
						}}
					>
						<img
							className='main-image'
							src={
								require('../../assets/images/user_image.png')
									.default
							}
							alt='이미지'
							style={{
								//	maxWidth: '100%',
								width: '40px', // 너비를 80%로 설정
							}}
						/>
						<b>{rowData.user_nickname}</b>
						<br></br>
						{new Date(rowData.create_dt)
							.toLocaleDateString('ko-KR', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							})
							.replace(/\./g, '.')}
						{'(작성일자)'}
					</div>
					<div
						style={{
							display: 'inline-block',
							padding: '5px',
						}}
					>
						<div
							style={{
								display: 'flex', // flexbox 레이아웃 사용
								alignItems: 'center', // 수직 정렬
								justifyContent: 'left', // 수평 정렬
							}}
						>
							<div
								style={{
									//backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
									borderRadius: '5px', // 모서리 둥글게 설정
									margin: '5px', // div 사이에 10픽셀의 간격 주기
									justifyContent: 'left',
									width: '250px', // 넓이를 100픽셀로 설정
								}}
							>
								{' '}
								<b>청결도</b>
								<br></br>
								<b>{rowData.contents.clean_score}</b>
								<br></br>
								{rowData.contents.clean_comment}
							</div>
							<div
								style={{
									//	backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
									borderRadius: '5px', // 모서리 둥글게 설정
									mamargin: '5px', // div 사이에 10픽셀의 간격 주기
									justifyContent: 'left',
									width: '250px', // 넓이를 100픽셀로 설정
								}}
							>
								{' '}
								<b>전망/뷰</b>
								<br></br>
								<b>{rowData.contents.landscape_score}</b>
								<br></br>
								{rowData.contents.landscape_comment}
							</div>
							<div
								style={{
									//	backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
									borderRadius: '5px', // 모서리 둥글게 설정
									margin: '5px', // div 사이에 10픽셀의 간격 주기
									justifyContent: 'left',
									width: '250px', // 넓이를 100픽셀로 설정
								}}
							>
								{' '}
								<b>친절도</b>
								<br></br>
								<b>{rowData.contents.kindness_score}</b>
								<br></br>
								{rowData.contents.kindness_comment}
							</div>
							<div
								style={{
									//	backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
									borderRadius: '5px', // 모서리 둥글게 설정
									margin: '5px', // div 사이에 10픽셀의 간격 주기
									justifyContent: 'left',
									width: '250px', // 넓이를 100픽셀로 설정
								}}
							>
								{' '}
								<b>부대/편의시설</b>
								<br></br>
								<b>{rowData.contents.convenience_score}</b>
								<br></br>
								{rowData.contents.convenience_comment}
							</div>
						</div>
						<div
							style={{
								//	backgroundColor: 'lightgray', // 배경색을 연한 회색으로 설정
								borderRadius: '5px', // 모서리 둥글게 설정
								margin: '0 100px', // div 사이에 10픽셀의 간격 주기
								justifyContent: 'left',
								width: '1000px', // 넓이를 100픽셀로 설정
								textAlign: 'left', // Set text alignment to left
							}}
						>
							{' '}
							<b>총평</b>
							<br></br>
							{rowData.contents.total_comment}
						</div>
					</div>
				</div>
			</>
		),
	},
];

export default Campgounrd;
