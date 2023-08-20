import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
//import * as Yup from 'yup';
import {
	Button,
	//FormHelperText,
	Grid,
	Stack,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
// import {Formik} from 'formik';
// import {createReview} from 'api/review';

// import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import {getCampReview} from 'api/review';
import {getCampsite} from 'api/camp';
import {getBooking} from 'api/booking';
import Rating from '@mui/material/Rating';
const Review = () => {
	// const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	console.log('User object:', user);
	// const {memberId, memberName, memberNickName} = user;
	const [data, setData] = useState([]);
	//const [isLoading, setLoading] = useState(false);
	//const [clean_score, setCleanScore] = React.useState(5);
	// const [punctual_score, setPunctualScore] = React.useState(5);
	// const [manner_score, setMannerScore] = React.useState(5);
	// const [flex_score, setFlexScore] = React.useState(5);
	const {review_id} = useParams();

	const goBackList = () => {
		navigate(`/reviewList`);
	};
	useEffect(() => {
		console.log('리뷰 ID : ' + review_id);
		findReview();
	}, [review_id]);

	const findReview = async () => {
		//	setLoading(true);

		const response = await getCampReview({review_id});
		console.log(response);
		const campsiteResult = await getCampsite({
			id: response.target_info.site_id,
		});
		const bookingResult = await getBooking({
			bookingId: response.booking_id,
		});

		//	console.log('@@@@@@@' + JSON.stringify(campsiteResult));
		const reviewData = {
			...response,
			campId: response.campId,
			campsiteThumImage: campsiteResult.campsiteThumImage,
			startDate: bookingResult.startDate,
			endDate: bookingResult.endDate,
		};

		setData(reviewData);
		console.log('데이터 : ' + JSON.stringify(reviewData));
		//	setLoading(false);
	};
	const moment = require('moment');
	// data.startDate와 data.endDate를 Date 객체로 변환
	const startDate = new Date(data.startDate);
	const endDate = new Date(data.endDate);

	// 원하는 형식으로 변환
	const formattedStartDate = moment(startDate).format('YYYY.MM.DD');
	const formattedEndDate = moment(endDate).format('YYYY.MM.DD');
	useEffect(() => {
		console.log('데이터 data.campId: ' + data.campId);
	}, [data.campId]); // data.campId 값이 변경될 때마다 실행됩니다.
	return (
		<>
			<div
				style={{
					display: 'flex', // flexbox 레이아웃 사용
					alignItems: 'center', // 수직 정렬
					justifyContent: 'left', // 수평 정렬
					margin: '5px', // div 사이에 10픽셀의 간격 주기
				}}
			>
				<img
					src={data.campsiteThumImage}
					alt='campsite'
					height='120'
					width='120'
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
					{data.target_info && <b>{data.target_info.camp_name}</b>}
					<br></br>
					{data.target_info && <>{data.target_info.site_name}</>}
					<br></br>
					<br></br>
					{formattedStartDate} ~ {formattedEndDate}
				</div>
			</div>

			<br></br>
			{data.contents && (
				<Grid container spacing={3}>
					<Grid item xs={24} md={12}>
						<Stack spacing={1}>
							<b>청결도</b>

							<Rating
								name='cleanliness' // name 속성에 고유한 값을 지정
								value={data.contents.clean_score}
							/>
							<Typography
								variant='body1'
								aria-label='maximum height'
								placeholder='청결도에 대한 한출평을 남겨주세요. (선택)'
							>
								{data.contents.clean_comment}
							</Typography>

							<TextField
								fullWidth
								id='clean_comment'
								value={data.contents.clean_comment}
								name='contents.clean_comment'
								placeholder='청결도에 대한 한출평을 남겨주세요. (선택)'
								style={{backgroundColor: 'white'}}
							/>
						</Stack>

						<br></br>
						<Stack spacing={1}>
							<b>전망/뷰</b>
							<Rating
								name='landscape' // name 속성에 고유한 값을 지정
								value={data.contents.landscape_score}
								precision={0.5} // 반개 단위로 선택 가능하게 함
							/>

							<TextField
								fullWidth
								id='landscape_comment'
								value={data.contents.landscape_comment}
								name='contents.landscape_comment'
								placeholder='전망/뷰에 대한 한출평을 남겨주세요. (선택)'
								style={{backgroundColor: 'white'}}
							/>
						</Stack>
						<br></br>
						<Stack spacing={1}>
							<b>친절</b>
							<Rating
								name='kindness' // name 속성에 고유한 값을 지정
								value={data.contents.kindness_score}
								precision={0.5} // 반개 단위로 선택 가능하게 함
							/>

							<TextField
								fullWidth
								id='kindness_comment'
								value={data.contents.kindness_comment}
								name='contents.kindness_comment'
								placeholder='캠지기의 친절도에 대한 한출평을 남겨주세요. (선택)'
								style={{backgroundColor: 'white'}}
							/>
						</Stack>
						<br></br>
						<Stack spacing={1}>
							<b>부대/편의시설</b>
							<Rating
								name='convenience' // name 속성에 고유한 값을 지정
								value={data.contents.convenience_score}
								precision={0.5} // 반개 단위로 선택 가능하게 함
							/>
							<TextField
								fullWidth
								id='convenience_comment'
								value={data.contents.convenience_comment}
								name='contents.convenience_comment'
								placeholder='부대/편의 시설에 대한 한출평을 남겨주세요. (선택)'
								style={{backgroundColor: 'white'}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<b>총평</b>
							<TextareaAutosize
								id='cototal_commenttent'
								name='contents.total_comment'
								minRows={5}
								aria-label='maximum height'
								placeholder='다른 캠퍼들을 위해 캠핑장에 대한 경험을 솔직하게 공유해주세요:) (선택)'
								value={data.contents.total_comment}
								style={customStyle}
							/>
						</Stack>
					</Grid>
					<Grid
						container
						justifyContent='flex-end'
						style={{marginTop: 10}}
						spacing={2}
					>
						{/* <Grid item>
							<Button
								disableElevation
								//disabled={isSubmitting}
								size='large'
								type='submit'
								variant='contained'
								color='primary'
							>
								등록
							</Button>
						</Grid> */}
						<Grid item>
							<Button
								disableElevation
								size='large'
								variant='contained'
								onClick={goBackList}
								color='error'
							>
								뒤로
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default Review;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
