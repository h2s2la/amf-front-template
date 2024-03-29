import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';
import {
	Button,
	FormHelperText,
	Grid,
	Stack,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import {Formik} from 'formik';
import {createReview} from 'api/review';

import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import {getBooking} from 'api/booking';
import {getCampground} from 'api/camp';
import {getCampsite} from 'api/camp';
import Rating from '@mui/material/Rating';
const Review = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	console.log('User object:', user);
	const {memberId, memberName, memberNickName} = user;
	const [data, setData] = useState([]);
	//const [isLoading, setLoading] = useState(false);
	//const [clean_score, setCleanScore] = React.useState(5);
	// const [punctual_score, setPunctualScore] = React.useState(5);
	// const [manner_score, setMannerScore] = React.useState(5);
	// const [flex_score, setFlexScore] = React.useState(5);
	const {bookingId} = useParams();

	const goBackList = () => {
		navigate(`/bookingList`);
	};
	useEffect(() => {
		findBooking();
	}, [bookingId]);

	const findBooking = async () => {
		//	setLoading(true);

		const response = await getBooking({bookingId});
		console.log(response);
		const campgroundResult = await getCampground({id: response.campId});
		const campsiteResult = await getCampsite({id: response.siteId});

		//	console.log('@@@@@@@' + JSON.stringify(campsiteResult));
		const bookingData = {
			...response,
			campId: response.campId,
			campRegUser: campgroundResult.regUser,
			campsiteThumImage: campsiteResult.campsiteThumImage,
		};

		setData(bookingData);
		console.log('데이터 data.campId: ' + data.campId);
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
					{data && <b>{data.campName}</b>}
					<br></br>
					{data && <>{data.siteName}</>}
					<br></br>
					<br></br>
					{formattedStartDate} ~ {formattedEndDate}
				</div>
			</div>

			<Formik
				key={data.campId}
				initialValues={{
					//	id: 0,
					user_id: memberId,
					user_name: memberName,
					user_nickname: memberNickName,
					booking_no: parseInt(bookingId),
					camp_id: data.campId,
					camper_id: memberId,
					camjigi_id: data.campRegUser,
					type: 'camjigi',
					contents: {
						landscape_score: 5,
						landscape_comment: '',
						clean_score: 5,
						clean_comment: '',
						kindness_score: 5,
						kindness_comment: '',
						convenience_score: 5,
						convenience_comment: '',
						total_comment: '',
					},
					target_info: {
						camp_name: data.campName,
						site_id: data.siteId,
						site_name: data.siteName,
					},
					photo1: '',
					photo2: '',
					photo3: '',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					// total_comment: Yup.string()
					// 	.max(255)
					// 	.required('총평은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					values.camp_id = data.campId;
					console.log('후기 등록  values: ' + JSON.stringify(values));
					setSubmitting(true);

					await createReview(values);

					setSubmitting(false);

					enqueueSnackbar('리뷰를 등록하였습니다.', {
						variant: 'success',
					});
					goBackList();
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					setFieldValue,
					touched,
					values,
				}) => (
					<form noValidate onSubmit={handleSubmit}>
						<br></br>
						<Grid container spacing={3}>
							<Grid item xs={24} md={12}>
								<Stack spacing={1}>
									<b>사진첨부</b>
									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='photo1'
										value={values.photo1}
										name='photo1'
										onChange={handleChange}
										placeholder='첨부할 첫번째 사진의 URL을 등록해주세요 (선택)'
										style={{backgroundColor: 'white'}}
									/>
									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='photo2'
										value={values.photo2}
										name='photo2'
										onChange={handleChange}
										placeholder='첨부할 두번째 사진의 URL을 등록해주세요 (선택)'
										style={{backgroundColor: 'white'}}
									/>
									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='photo3'
										value={values.photo3}
										name='photo3'
										onChange={handleChange}
										placeholder='첨부할 세번째 사진의 URL을 등록해주세요 (선택)'
										style={{backgroundColor: 'white'}}
									/>
								</Stack>
								<br></br>
								<Stack spacing={1}>
									<b>청결도</b>

									<Rating
										name='cleanliness' // name 속성에 고유한 값을 지정
										value={values.contents.clean_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.clean_score',
												newValue,
											);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='clean_comment'
										value={values.contents.clean_comment}
										name='contents.clean_comment'
										onChange={handleChange}
										placeholder='청결도에 대한 한줄평을 남겨주세요. (선택)'
										style={{backgroundColor: 'white'}}
									/>
									{touched.title && errors.title && (
										<FormHelperText
											error
											id='helper-text-title-signup'
										>
											{errors.title}
										</FormHelperText>
									)}
								</Stack>
								<br></br>
								<Stack spacing={1}>
									<b>전망/뷰</b>

									<Rating
										name='landscape' // name 속성에 고유한 값을 지정
										value={values.contents.landscape_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.landscape_score',
												newValue,
											);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='landscape_comment'
										value={
											values.contents.landscape_comment
										}
										name='contents.landscape_comment'
										onChange={handleChange}
										placeholder='전망/뷰에 대한 한줄평을 남겨주세요. (선택)'
										style={{backgroundColor: 'white'}}
									/>
									{touched.title && errors.title && (
										<FormHelperText
											error
											id='helper-text-title-signup'
										>
											{errors.title}
										</FormHelperText>
									)}
								</Stack>
								<br></br>
								<Stack spacing={1}>
									<b>친절</b>

									<Rating
										name='kindness' // name 속성에 고유한 값을 지정
										value={values.contents.kindness_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.kindness_score',
												newValue,
											);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='kindness_comment'
										value={values.contents.kindness_comment}
										name='contents.kindness_comment'
										onChange={handleChange}
										placeholder='캠지기의 친절도에 대한 한줄평을 남겨주세요. (선택)'
										style={{backgroundColor: 'white'}}
									/>
									{touched.title && errors.title && (
										<FormHelperText
											error
											id='helper-text-title-signup'
										>
											{errors.title}
										</FormHelperText>
									)}
								</Stack>
								<br></br>
								<Stack spacing={1}>
									<b>부대/편의시설</b>

									<Rating
										name='convenience' // name 속성에 고유한 값을 지정
										value={
											values.contents.convenience_score
										}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.convenience_score',
												newValue,
											);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='convenience_comment'
										value={
											values.contents.convenience_comment
										}
										name='contents.convenience_comment'
										onChange={handleChange}
										placeholder='부대/편의 시설에 대한 한줄평을 남겨주세요. (선택)'
										style={{backgroundColor: 'white'}}
									/>
									{touched.title && errors.title && (
										<FormHelperText
											error
											id='helper-text-title-signup'
										>
											{errors.title}
										</FormHelperText>
									)}
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
										value={values.contents.total_comment}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>
										{errors.submit}
									</FormHelperText>
								</Grid>
							)}
							<Grid
								container
								justifyContent='flex-end'
								style={{marginTop: 10}}
								spacing={2}
							>
								<Grid item>
									<Button
										disableElevation
										disabled={isSubmitting}
										size='large'
										type='submit'
										variant='contained'
										color='primary'
									>
										등록
									</Button>
								</Grid>
								<Grid item>
									<Button
										disableElevation
										size='large'
										variant='contained'
										onClick={goBackList}
										color='error'
									>
										취소
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
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
