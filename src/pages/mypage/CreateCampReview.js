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
//import {getCampsite} from 'api/camp';
import {getMember} from 'api/authentication';
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
		navigate(`/campBookingList`);
	};
	useEffect(() => {
		findBooking();
	}, [bookingId]);

	const findBooking = async () => {
		//	setLoading(true);

		const response = await getBooking({bookingId});
		console.log(response);
		const memberResult = await getMember({memberId: response.memberId});

		//	console.log('@@@@@@@' + JSON.stringify(campsiteResult));
		const bookingData = {
			...response,
			campId: response.campId,
			camperNickname: memberResult.nickname,
		};

		setData(bookingData);
		console.log('데이터 data.memberNickname: ' + data.memberNickname);
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
					src={require('../../assets/images/user_image.png').default}
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
					{data && <b>{data.camperNickname}</b>}
					<br></br>
					{data && <>{data.siteName}</>}
					<br></br>
					<br></br>
					{formattedStartDate} ~ {formattedEndDate}
				</div>
			</div>

			<Formik
				key={data.memberNickname}
				initialValues={{
					//	id: 0,
					user_id: memberId,
					user_name: memberName,
					user_nickname: memberNickName,
					booking_no: parseInt(bookingId),
					camper_id: data.memberId,
					type: 'camper',
					contents: {
						punctual_score: 5,
						punctual_comment: '',
						clean_score: 5,
						clean_comment: '',
						manner_score: 5,
						manner_comment: '',
						flex_score: 5,
						flex_comment: '',
						total_comment: '',
					},
					target_info: {
						camper_name: data.memberName,
						camper_nickname: data.camperNickname,
					},
					// photo1: '',
					// photo2: '',
					// photo3: '',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					// total_comment: Yup.string()
					// 	.max(255)
					// 	.required('총평은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					values.camp_id = data.campId;
					values.camper_id = data.memberId;
					values.target_info.camper_name = data.memberName;
					values.target_info.camper_nickname = data.camperNickname;
					console.log('후기 등록  values: ' + JSON.stringify(values));
					setSubmitting(true);

					await createReview(values);

					setSubmitting(false);

					enqueueSnackbar('캠퍼의 리뷰를 등록하였습니다.', {
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
								<br></br>
								<Stack spacing={1}>
									<b>시간엄수</b>

									<Rating
										name='punctual' // name 속성에 고유한 값을 지정
										value={values.contents.punctual_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.punctual_score',
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
										id='punctual_comment'
										value={values.contents.punctual_comment}
										name='contents.punctual_comment'
										onChange={handleChange}
										placeholder='시간엄수에 대한 한줄평을 남겨주세요. (선택)'
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
									<b>정리정돈</b>

									<Rating
										name='clean' // name 속성에 고유한 값을 지정
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
										placeholder='정리정돈에 대한 한줄평을 남겨주세요. (선택)'
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
									<b>매너</b>

									<Rating
										name='manner' // name 속성에 고유한 값을 지정
										value={values.contents.manner_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.manner_score',
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
										id='manner_comment'
										value={values.contents.manner_comment}
										name='contents.manner_comment'
										onChange={handleChange}
										placeholder='매너에 대한 한출평을 남겨주세요. (선택)'
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
									<b>Flex</b>

									<Rating
										name='flex' // name 속성에 고유한 값을 지정
										value={values.contents.flex_score}
										onChange={(event, newValue) => {
											setFieldValue(
												'contents.flex_score',
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
										id='flex_comment'
										value={values.contents.flex_comment}
										name='contents.flex_comment'
										onChange={handleChange}
										placeholder='Flex에 대한 한줄평을 남겨주세요. (선택)'
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
										placeholder='다른 캠지기들에게 캠퍼에 대한 후기를 알려주세요:) (선택)'
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
