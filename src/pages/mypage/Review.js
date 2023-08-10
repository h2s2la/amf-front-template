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
import {createPost} from '../../api/board';

import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import {getBooking} from 'api/booking';
import {getCampsite} from 'api/camp';
import Rating from '@mui/material/Rating';
const Review = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const {id, name} = user;
	const [data, setData] = useState([]);
	//const [isLoading, setLoading] = useState(false);
	const [value, setValue] = React.useState(5);
	const {bookingId} = useParams();

	const goBackList = () => {
		navigate(`/board`);
	};
	useEffect(() => {
		findBooking();
	}, [bookingId]);

	const findBooking = async () => {
		//	setLoading(true);

		const response = await getBooking({bookingId});
		console.log(response.site);
		const campsiteResult = await getCampsite({id: response.site.siteId});

		//	console.log('@@@@@@@' + JSON.stringify(campsiteResult));
		const bookingData = {
			...response,
			campsiteThumImage: campsiteResult.campsiteThumImage,
		};

		setData(bookingData);
		//	setLoading(false);
	};
	const moment = require('moment');
	// data.startDate와 data.endDate를 Date 객체로 변환
	const startDate = new Date(data.startDate);
	const endDate = new Date(data.endDate);

	// 원하는 형식으로 변환
	const formattedStartDate = moment(startDate).format('YYYY.MM.DD');
	const formattedEndDate = moment(endDate).format('YYYY.MM.DD');
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
					{data.site && <b>{data.site.campName}</b>}
					<br></br>
					{data.site && <>{data.site.siteName}</>}
					<br></br>
					<br></br>
					{formattedStartDate} ~ {formattedEndDate}
				</div>
			</div>

			<Formik
				initialValues={{
					title: '',
					content: '',
					author: {
						authorId: id,
						authorName: name,
					},
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().max(255).required('제목은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					setSubmitting(true);

					await createPost(values);

					setSubmitting(false);

					enqueueSnackbar('게시글을 등록하였습니다.', {
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
					touched,
					values,
				}) => (
					<form noValidate onSubmit={handleSubmit}>
						<br></br>
						<Grid container spacing={3}>
							<Grid item xs={24} md={12}>
								<Stack spacing={1}>
									<b>청결도</b>

									<Rating
										name='cleanliness' // name 속성에 고유한 값을 지정
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='title'
										value={values.title}
										name='title'
										onChange={handleChange}
										placeholder='청결도에 대한 한출평을 남겨주세요. (선택)'
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
										name='cleanliness' // name 속성에 고유한 값을 지정
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='title'
										value={values.title}
										name='title'
										onChange={handleChange}
										placeholder='전망/뷰에 대한 한출평을 남겨주세요. (선택)'
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
										name='cleanliness' // name 속성에 고유한 값을 지정
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='title'
										value={values.title}
										name='title'
										onChange={handleChange}
										placeholder='캠지기의 친절도에 대한 한출평을 남겨주세요. (선택)'
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
										name='cleanliness' // name 속성에 고유한 값을 지정
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										precision={0.5} // 반개 단위로 선택 가능하게 함
									/>

									<TextField
										fullWidth
										error={Boolean(
											touched.title && errors.title,
										)}
										id='title'
										value={values.title}
										name='title'
										onChange={handleChange}
										placeholder='부대/편의 시설에 대한 한출평을 남겨주세요. (선택)'
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
										id='content'
										name='content'
										minRows={5}
										aria-label='maximum height'
										placeholder='다른 캠퍼들을 위해 캠핑장에 대한 경험을 솔직하게 공유해주세요:) (선택)'
										value={values.content}
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
