import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
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
import {createCampground} from '../../api/camp';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';

const CreateCampground = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const {id, name} = user;

	const goBackList = () => {
		navigate(`/campground`);
	};

	const [startPickDate, setStartPickDate] = useState(new Date());
	const [endPickDate, setEndPickDate] = useState(new Date());
	const [startQPickDate, setStartQPickDate] = useState(new Date());
	const [endQPickDate, setEndQPickDate] = useState(new Date());
	return (
		<>
			<Formik
				initialValues={{
					campgroundName: '',
					des: '',
					author: {
						authorId: id,
						authorName: name,
					},
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					campgroundName: Yup.string()
						.max(255)
						.required('캠핑장 이름은 필수입니다.'),
				})}
				onSubmit={async (values, {setSubmitting}) => {
					setSubmitting(true);

					await createCampground(values);

					setSubmitting(false);

					enqueueSnackbar('캠핑장을 등록하였습니다.', {
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
									htmlFor='campgroundName-signup'
									required
								>
									{' '}
									캠핑장 이름
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.campgroundName &&
												errors.campgroundName,
										)}
										id='campgroundName'
										value={values.campgroundName}
										name='campgroundName'
										onChange={handleChange}
										placeholder='캠핑장 이름을 입력하세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.campgroundName &&
										errors.campgroundName && (
											<FormHelperText
												error
												id='helper-text-campgroundName-signup'
											>
												{errors.campgroundName}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='name-signup' required>
									{' '}
									대표자 이름
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.name && errors.name,
										)}
										id='name'
										value={values.name}
										name='name'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.name && errors.name && (
										<FormHelperText
											error
											id='helper-text-name-signup'
										>
											{errors.name}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='bizNumber-signup' required>
									{' '}
									사업자 번호
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.bizNumber &&
												errors.bizNumber,
										)}
										id='bizNumber'
										value={values.bizNumber}
										name='bizNumber'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.bizNumber && errors.bizNumber && (
										<FormHelperText
											error
											id='helper-text-bizNumber-signup'
										>
											{errors.bizNumber}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='region-signup' required>
									{' '}
									지역
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.region && errors.region,
										)}
										id='region'
										value={values.region}
										name='region'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.region && errors.region && (
										<FormHelperText
											error
											id='helper-text-region-signup'
										>
											{errors.region}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='cellNumber-signup'
									required
								>
									{' '}
									연락처
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.cellNumber &&
												errors.cellNumber,
										)}
										id='cellNumber'
										value={values.cellNumber}
										name='cellNumber'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.cellNumber && errors.cellNumber && (
										<FormHelperText
											error
											id='helper-text-cellNumber-signup'
										>
											{errors.cellNumber}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='address-signup' required>
									{' '}
									주소
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.address &&
												errors.tiaddresstle,
										)}
										id='address'
										value={values.address}
										name='address'
										onChange={handleChange}
										placeholder='캠핑장 주소를 입력하세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.address && errors.address && (
										<FormHelperText
											error
											id='helper-text-address-signup'
										>
											{errors.address}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='startPickDate-signup'
									required
								>
									{' '}
									성수기 시작일
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<DatePicker
										locale={ko}
										dateFormat='yyyy년 MM월 dd일'
										selected={startPickDate}
										onChange={(date: Date) =>
											setStartPickDate(date)
										}
										selectsStart
										startDate={startPickDate}
										endDate={endPickDate}
									/>
									{}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='endPickDate-signup'
									required
								>
									{' '}
									성수기 종료일
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<DatePicker
										locale={ko}
										dateFormat='yyyy년 MM월 dd일'
										selected={endPickDate}
										onChange={(date: Date) =>
											setEndPickDate(date)
										}
										selectsEnd
										startDate={startPickDate}
										endDate={endPickDate}
										minDate={startPickDate}
									/>
									{}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='startQPickDate-signup'
									required
								>
									{' '}
									준성수기 시작일
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<DatePicker
										locale={ko}
										dateFormat='yyyy년 MM월 dd일'
										selected={startQPickDate}
										onChange={(date: Date) =>
											setStartQPickDate(date)
										}
										selectsStart
										startDate={startQPickDate}
										endDate={endQPickDate}
									/>
									{}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='endQPickDate-signup'
									required
								>
									{' '}
									준성수기 종료일
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<DatePicker
										locale={ko}
										dateFormat='yyyy년 MM월 dd일'
										selected={endQPickDate}
										onChange={(date: Date) =>
											setEndQPickDate(date)
										}
										selectsEnd
										startDate={startQPickDate}
										endDate={endQPickDate}
										minDate={startQPickDate}
									/>
									{}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='checkInTime-signup'
									required
								>
									{' '}
									입실시간
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.checkInTime &&
												errors.checkInTime,
										)}
										id='checkInTime'
										value={values.checkInTime}
										name='checkInTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.checkInTime && errors.checkInTime && (
										<FormHelperText
											error
											id='helper-text-checkInTime-signup'
										>
											{errors.checkInTime}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='checkOutTime-signup'
									required
								>
									{' '}
									퇴실시간
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.checkOutTime &&
												errors.checkOutTime,
										)}
										id='checkOutTime'
										value={values.checkOutTime}
										name='checkOutTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.checkOutTime &&
										errors.checkOutTime && (
											<FormHelperText
												error
												id='helper-text-checkOutTime-signup'
											>
												{errors.checkOutTime}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='startMannerTime-signup'
									required
								>
									{' '}
									매너타임 시작
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.startMannerTime &&
												errors.startMannerTime,
										)}
										id='startMannerTime'
										value={values.startMannerTime}
										name='startMannerTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.startMannerTime &&
										errors.startMannerTime && (
											<FormHelperText
												error
												id='helper-text-startMannerTime-signup'
											>
												{errors.startMannerTime}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='endMannerTime-signup'
									required
								>
									{' '}
									매너타임 종료
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.endMannerTime &&
												errors.endMannerTime,
										)}
										id='endMannerTime'
										value={values.endMannerTime}
										name='endMannerTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.endMannerTime &&
										errors.endMannerTime && (
											<FormHelperText
												error
												id='helper-text-endMannerTime-signup'
											>
												{errors.endMannerTime}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='bank-signup' required>
									{' '}
									은행
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.bank && errors.bank,
										)}
										id='bank'
										value={values.bank}
										name='bank'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.bank && errors.bank && (
										<FormHelperText
											error
											id='helper-text-bank-signup'
										>
											{errors.bank}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='accountHolder-signup'
									required
								>
									{' '}
									예금주
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.accountHolder &&
												errors.accountHolder,
										)}
										id='accountHolder'
										value={values.accountHolder}
										name='accountHolder'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.accountHolder &&
										errors.accountHolder && (
											<FormHelperText
												error
												id='helper-text-accountHolder-signup'
											>
												{errors.accountHolder}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='accountNumber-signup'
									required
								>
									{' '}
									계좌번호
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.accountNumber &&
												errors.accountNumber,
										)}
										id='accountNumber'
										value={values.accountNumber}
										name='accountNumber'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.accountNumber &&
										errors.accountNumber && (
											<FormHelperText
												error
												id='helper-text-accountNumber-signup'
											>
												{errors.accountNumber}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='ReservationMemberGrade-signup'
									required
								>
									{' '}
									예약 고객 등급
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.ReservationMemberGrade &&
												errors.ReservationMemberGrade,
										)}
										id='ReservationMemberGrade'
										value={values.ReservationMemberGrade}
										name='ReservationMemberGrade'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.ReservationMemberGrade &&
										errors.ReservationMemberGrade && (
											<FormHelperText
												error
												id='helper-text-ReservationMemberGrade-signup'
											>
												{errors.ReservationMemberGrade}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='introduction-signup'
									required
								>
									{' '}
									캠핑장 소개
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='introduction'
										name='introduction'
										minRows={5}
										aria-label='maximum height'
										placeholder='캠핑장 소개를 입력하세요'
										value={values.introduction}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='amenities-signup' required>
									{' '}
									부대시설
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.amenities &&
												errors.amenities,
										)}
										id='amenities'
										value={values.amenities}
										name='amenities'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.amenities && errors.amenities && (
										<FormHelperText
											error
											id='helper-text-amenities-signup'
										>
											{errors.amenities}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='layout-signup' required>
									{' '}
									배치도
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.layout && errors.layout,
										)}
										id='layout'
										value={values.layout}
										name='layout'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.layout && errors.layout && (
										<FormHelperText
											error
											id='helper-text-layout-signup'
										>
											{errors.layout}
										</FormHelperText>
									)}
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
									htmlFor='detailImage-signup'
									required
								>
									{' '}
									상세 이미지
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='detailImage'
										name='detailImage'
										minRows={5}
										aria-label='maximum height'
										placeholder='이미지 URL을 입력해주세요'
										value={values.detailImage}
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

export default CreateCampground;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
