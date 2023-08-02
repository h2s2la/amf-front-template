import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
//import {deletePost, getCampground} from 'api/camp';
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
	//const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		findCampground();
	}, [id]);

	const findCampground = async () => {
		const result = await getCampground({id});
		setCampground(result);
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
					{campground ? (
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

export default Campgounrd;
