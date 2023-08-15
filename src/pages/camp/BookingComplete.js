import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import landscapeImage from '../../assets/images/landscape.png';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어를 import
//import {deletePost, getCampground} from 'api/camp';
import {getBooking} from 'api/booking';
import {getCampground} from 'api/camp';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	//Toolbar,
	Typography,
} from '@mui/material';
//import {LoadingButton} from '@mui/lab';
//import {useSnackbar} from 'notistack';

const BokingComplete = () => {
	const navigate = useNavigate();
	//const {enqueueSnackbar} = useSnackbar();

	const {bookingId} = useParams();

	const [booking, setBooking] = useState(null);
	//	const bookingRef = useRef(null); // booking을 useRef로 선언
	const [campground, setCampground] = useState(null);
	//const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		findBooking();
	}, [bookingId]);

	const findBooking = async () => {
		const result = await getBooking({bookingId});
		console.log(result.site);
		const campgroundResult = await getCampground({id: result.site.campId});
		console.log('campgroundResult : ' + JSON.stringify(campgroundResult));
		setBooking(result);
		setCampground(campgroundResult);
	};

	// useEffect(() => {
	// 	// booking이 null이 아닐 때만 findCamp 함수 호출
	// 	findCamp();
	// }, [bookingRef.current]);

	// const findCamp = async () => {
	// 	console.log(JSON.stringify(bookingRef));
	// 	const campgroundResult = await getCampground(bookingRef.campId);
	// 	setCampground(campgroundResult);
	// };

	const goHome = () => {
		navigate(`/`);
	};

	return (
		<>
			<Stack direction='row' spacing={2}>
				{/* <Grid container>
					<Grid item>
						<Button variant='contained' onClick={goBackList}>
							목록
						</Button>
					</Grid>
				</Grid> */}
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
				{/* <Toolbar>
					<Typography
						sx={{flex: '1 1 100%'}}
						variant='h4'
						id='tableTitle'
						component='div'
					>
						{booking?.name ? booking.name : ''}
					</Typography>
				</Toolbar> */}
				<Divider />
				<CardContent>
					{booking && campground ? (
						<Grid item xs={12}>
							<Stack spacing={1}>
								{/* <img
									src={campground.campThumImage}
									alt='campThumImage'
									style={{
										objectFit: 'contain',
										maxHeight: '300px',
									}}
								/> */}
								<Typography
									variant='h4'
									fontWeight='normal' // 볼드 스타일 제거
									aria-label='maximum height'
									placeholder='이름'
									align='center' // 가운데 정렬
								>
									<b>{booking.booker.memberName}</b>님 예약
									신청이 완료되었습니다.<br></br>
									<br></br>예약신청 후 6시간 내 입금이
									확인되지 않으면<br></br>예약 신청이 취소될
									수 있습니다.<br></br>
									<br></br>고캠프를 이용해주셔서 감사합니다.
								</Typography>
								<br></br>
								<br></br>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<img
										className='main-image'
										src={landscapeImage}
										alt='이미지'
										style={{
											maxWidth: '100%',
											width: '30%', // 너비를 80%로 설정
										}}
									/>
								</div>
								<br></br>
								<br></br>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											display: 'flex', // 내부 요소들을 flex로 배치
											flexDirection: 'row', // 내부 요소들을 가로 방향으로 배치
											border: '1px solid gray', // 회색 테두리 설정
											borderRadius: '10px', // 모서리 둥글게 설정
											padding: '20px', // 테두리와 글자 사이에 간격 주기
											// boxShadow:
											// 	'3px 3px 5px rgba(0,0,0,0.3)', // 그림자 효과 설정
											width: '600px', // 넓이를 100픽셀로 설정
										}}
									>
										<img
											src={campground.campThumImage}
											alt='campsite'
											height='170'
											width='170'
											style={{
												objectFit: 'cover',
												borderRadius: '10px',
											}}
										/>

										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												margin: '10px',
											}}
										>
											<Typography
												variant='h4'
												aria-label='maximum height'
												placeholder='캠핑장명'
											>
												{booking.site.campName}
											</Typography>
											<br></br>
											<Typography
												variant='body1'
												aria-label='maximum height'
												placeholder='이용일'
											>
												이용일 :{' '}
												{`${moment(
													booking.startDate,
												).format('YYYY.MM.DD (ddd)')}`}
												-{' '}
												{`${moment(
													booking.endDate,
												).format('YYYY.MM.DD (ddd)')}`}
											</Typography>

											<Typography
												variant='body1'
												aria-label='maximum height'
												placeholder='사이트'
											>
												사이트 : {booking.site.siteName}
											</Typography>

											<Typography
												variant='body1'
												aria-label='maximum height'
												placeholder='사이트'
											>
												은행 : {campground.bank}
											</Typography>
											<Typography
												variant='body1'
												aria-label='maximum height'
												placeholder='사이트'
											>
												예금주 :{' '}
												{campground.accountOwner}
											</Typography>
											<Typography
												variant='body1'
												aria-label='maximum height'
												placeholder='사이트'
											>
												계좌번호 : {campground.account}
											</Typography>
										</div>
									</div>
								</div>
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
						<Button variant='contained' onClick={goHome}>
							메인으로 이동
						</Button>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default BokingComplete;
