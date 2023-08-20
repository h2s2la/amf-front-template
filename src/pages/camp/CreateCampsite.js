//import React from 'react';
import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {
	Button,
	FormHelperText,
	Grid,
	Stack,
	TextareaAutosize,
	TextField,
	InputLabel,
} from '@mui/material';
import {Formik} from 'formik';
import {createCampsite} from '../../api/camp';
import {getMyCampground} from '../../api/camp';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCampsite = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const {memberId} = user;
	const [campground, setCampground] = useState([]);
	const goBackList = () => {
		navigate(`/campsite`);
	};

	useEffect(() => {
		findMyCampground();
	}, [memberId]);

	const findMyCampground = async () => {
		//	setLoading(true);

		console.log('member 정보 : ' + JSON.stringify(memberId));
		const result = await getMyCampground({id: memberId});
		console.log('1캠핑장 Data : ' + JSON.stringify(result));
		setCampground(result);
		console.log('2캠핑장 Data : ' + JSON.stringify(campground));
	};

	return (
		<>
			<Formik
				initialValues={{
					campId: campground.id,
					campsiteName: '',
					campsiteInfo: '',
					peopleLimit: 10,
					price: 0,
					useYn: 'Y',
					weekendExtraCharge: 0,
					campsiteThumImage: '',
					regUser: memberId,
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					campsiteName: Yup.string()
						.max(255)
						.required('사이트 이름은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					setSubmitting(true);

					await createCampsite(values);

					setSubmitting(false);

					enqueueSnackbar('캠핑장 사이트를 등록하였습니다.', {
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
						<Grid container spacing={3}>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='campsiteName-signup'
									required
								>
									{' '}
									사이트 이름
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.campsiteName &&
												errors.campsiteName,
										)}
										id='campsiteName'
										value={values.campsiteName}
										name='campsiteName'
										onChange={handleChange}
										placeholder='사이트 이름을 입력하세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.campsiteName &&
										errors.campsiteName && (
											<FormHelperText
												error
												id='helper-text-campsiteName-signup'
											>
												{errors.campsiteName}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='price-signup' required>
									{' '}
									이용 요금
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.price && errors.price,
										)}
										id='price'
										value={values.price}
										name='price'
										onChange={handleChange}
										placeholder='숫자만 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.price && errors.price && (
										<FormHelperText
											error
											id='helper-text-price-signup'
										>
											{errors.price}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='weekendExtraCharge-signup'
									required
								>
									{' '}
									주말 및 공휴일 <br />
									할증률
								</InputLabel>
							</Grid>
							<Grid item xs={3}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.weekendExtraCharge &&
												errors.weekendExtraCharge,
										)}
										id='weekendExtraCharge'
										value={values.weekendExtraCharge}
										name='weekendExtraCharge'
										onChange={handleChange}
										placeholder='숫자만 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.weekendExtraCharge &&
										errors.weekendExtraCharge && (
											<FormHelperText
												error
												id='helper-text-weekendExtraCharge-signup'
											>
												{errors.weekendExtraCharge}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={1}>
								<InputLabel htmlFor='userId-signup'>
									{' '}
									%
								</InputLabel>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='peopleLimit-signup'
									required
								>
									{' '}
									제한 인원 수
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.peopleLimit &&
												errors.peopleLimit,
										)}
										id='peopleLimit'
										value={values.peopleLimit}
										name='peopleLimit'
										onChange={handleChange}
										placeholder='숫자만 입력해 주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.peopleLimit && errors.peopleLimit && (
										<FormHelperText
											error
											id='helper-text-peopleLimit-signup'
										>
											{errors.peopleLimit}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={6}></Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='campsiteInfo-signup'
									required
								>
									{' '}
									사이트 소개
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='campsiteInfo'
										name='campsiteInfo'
										minRows={5}
										aria-label='maximum height'
										placeholder='사이트 소개를 입력해주세요'
										value={values.campsiteInfo}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='campsiteThumImage-signup'
									required
								>
									{' '}
									대표 이미지
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.campsiteThumImage &&
												errors.campsiteThumImage,
										)}
										id='campsiteThumImage'
										value={values.campsiteThumImage}
										name='campsiteThumImage'
										onChange={handleChange}
										placeholder='이미지 URL을 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.campsiteThumImage &&
										errors.campsiteThumImage && (
											<FormHelperText
												error
												id='helper-text-campsiteThumImage-signup'
											>
												{errors.campsiteThumImage}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='detailedImage-signup'
									required
								>
									{' '}
									상세 이미지
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='detailedImage'
										name='detailedImage'
										minRows={5}
										aria-label='maximum height'
										placeholder='이미지 URL을 입력해주세요'
										value={values.detailedImage}
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

export default CreateCampsite;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
