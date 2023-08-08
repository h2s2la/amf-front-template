import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import landscapeImage from '../../assets/images/landscape.png';
//import {deletePost, getCampground} from 'api/camp';
import {getBooking} from 'api/booking';
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
	//const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		findBooking();
	}, [bookingId]);

	const findBooking = async () => {
		const result = await getBooking({bookingId});
		setBooking(result);
	};

	const goHome = () => {
		navigate(`/`);
	};
	// const goBooking = () => {
	// 	navigate(`/booking/${id}`);
	// };
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
					{booking ? (
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
									aria-label='maximum height'
									placeholder='이름'
								>
									{booking.booker.memberName}님 예약 신청이
									완료되었습니다.<br></br>예약신청 후 6시간 내
									입금이 확인되지 않으면<br></br>예약 신청이
									취소될 수 있습니다.<br></br>고캠프를
									이용해주셔서 감사합니다.
								</Typography>
								<br></br>
								<div className='main-container'>
									<img
										className='main-image'
										src={landscapeImage}
										alt='이미지'
										style={{
											maxWidth: '100%',
											height: 'auto',
										}}
									/>
								</div>
								<br></br>
								<br></br>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='캠핑장명'
								>
									{booking.site.campName}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='이용일'
								>
									이용일 : {booking.startDate} ~{' '}
									{booking.endDate}
								</Typography>

								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='사이트'
								>
									사이트 : {booking.site.siteName}
								</Typography>
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
