import React from 'react';
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
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCampsite = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const {id, name} = user;

	const goBackList = () => {
		navigate(`/campsite`);
	};

	return (
		<>
			<Formik
				initialValues={{
					campsiteName: '',
					des: '',
					author: {
						authorId: id,
						authorName: name,
					},
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
								<InputLabel htmlFor='usageFee-signup' required>
									{' '}
									이용 요금
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.usageFee && errors.usageFee,
										)}
										id='usageFee'
										value={values.usageFee}
										name='usageFee'
										onChange={handleChange}
										placeholder='숫자만 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.usageFee && errors.usageFee && (
										<FormHelperText
											error
											id='helper-text-usageFee-signup'
										>
											{errors.usageFee}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='premiumRate-signup'
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
											touched.premiumRate &&
												errors.premiumRate,
										)}
										id='premiumRate'
										value={values.premiumRate}
										name='premiumRate'
										onChange={handleChange}
										placeholder='숫자만 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.premiumRate && errors.premiumRate && (
										<FormHelperText
											error
											id='helper-text-premiumRate-signup'
										>
											{errors.premiumRate}
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
									htmlFor='limitedNumber-signup'
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
											touched.limitedNumber &&
												errors.limitedNumber,
										)}
										id='limitedNumber'
										value={values.limitedNumber}
										name='limitedNumber'
										onChange={handleChange}
										placeholder='숫자만 입력해 주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.limitedNumber &&
										errors.limitedNumber && (
											<FormHelperText
												error
												id='helper-text-limitedNumber-signup'
											>
												{errors.limitedNumber}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={6}></Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='introduction-signup'
									required
								>
									{' '}
									사이트 소개
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='introduction'
										name='introduction'
										minRows={5}
										aria-label='maximum height'
										placeholder='사이트 소개를 입력해주세요'
										value={values.introduction}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='image-signup' required>
									{' '}
									대표 이미지
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.image && errors.image,
										)}
										id='image'
										value={values.image}
										name='image'
										onChange={handleChange}
										placeholder='이미지 URL을 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.image && errors.image && (
										<FormHelperText
											error
											id='helper-text-image-signup'
										>
											{errors.image}
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
