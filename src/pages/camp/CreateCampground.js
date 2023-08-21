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
	const {memberId} = user;

	const goBackList = () => {
		navigate(`/campsite`);
	};

	const [startPickDate, setStartPickDate] = useState(new Date());
	const [endPickDate, setEndPickDate] = useState(new Date());
	const [startQPickDate, setStartQPickDate] = useState(new Date());
	const [endQPickDate, setEndQPickDate] = useState(new Date());
	return (
		<>
			<Formik
				initialValues={{
					name: '',
					ownerName: '',
					bizNumber: '',
					contactNumber: '',
					area: '',
					areaDetail: '',
					address: '',
					facility: '',
					campInfo: '',
					grade: '',
					requireGrade: '',
					useYn: '',
					bank: '',
					account: '',
					accountOwner: '',
					checkInTime: '',
					checkOutTime: '',
					mannerStartTime: '',
					mannerEndTime: '',
					peakSeasonStartDate: '',
					peakSeasonEndDate: '',
					semiPeakSeasonStartDate: '',
					semiPeakSeasonEndDate: '',
					campThumImage: '',
					layoutImage: '',
					regUser: memberId,
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string()
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
											touched.name && errors.name,
										)}
										id='name'
										value={values.name}
										name='name'
										onChange={handleChange}
										placeholder='캠핑장 이름을 입력하세요'
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
								<InputLabel htmlFor='ownerName-signup' required>
									{' '}
									대표자 이름
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.ownerName &&
												errors.ownerName,
										)}
										id='ownerName'
										value={values.ownerName}
										name='ownerName'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.ownerName && errors.ownerName && (
										<FormHelperText
											error
											id='helper-text-ownerName-signup'
										>
											{errors.ownerName}
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
								<InputLabel htmlFor='area-signup' required>
									{' '}
									지역
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.area && errors.area,
										)}
										id='area'
										value={values.area}
										name='area'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.area && errors.area && (
										<FormHelperText
											error
											id='helper-text-area-signup'
										>
											{errors.area}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='contactNumber-signup'
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
											touched.contactNumber &&
												errors.contactNumber,
										)}
										id='contactNumber'
										value={values.contactNumber}
										name='contactNumber'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.contactNumber &&
										errors.contactNumber && (
											<FormHelperText
												error
												id='helper-text-contactNumber-signup'
											>
												{errors.contactNumber}
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
									htmlFor='peakSeasonStartDate-signup'
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
									htmlFor='peakSeasonEndDate-signup'
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
									htmlFor='semiPeakSeasonStartDate-signup'
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
									htmlFor='semiPeakSeasonEndDate-signup'
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
									htmlFor='mannerStartTime-signup'
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
											touched.mannerStartTime &&
												errors.mannerStartTime,
										)}
										id='mannerStartTime'
										value={values.mannerStartTime}
										name='mannerStartTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.mannerStartTime &&
										errors.mannerStartTime && (
											<FormHelperText
												error
												id='helper-text-mannerStartTime-signup'
											>
												{errors.mannerStartTime}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='mannerEndTime-signup'
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
											touched.mannerEndTime &&
												errors.mannerEndTime,
										)}
										id='mannerEndTime'
										value={values.mannerEndTime}
										name='mannerEndTime'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.mannerEndTime &&
										errors.mannerEndTime && (
											<FormHelperText
												error
												id='helper-text-mannerEndTime-signup'
											>
												{errors.mannerEndTime}
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
									htmlFor='accountOwner-signup'
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
											touched.accountOwner &&
												errors.accountOwner,
										)}
										id='accountOwner'
										value={values.accountOwner}
										name='accountOwner'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.accountOwner &&
										errors.accountOwner && (
											<FormHelperText
												error
												id='helper-text-accountOwner-signup'
											>
												{errors.accountOwner}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='account-signup' required>
									{' '}
									계좌번호
								</InputLabel>
							</Grid>
							<Grid item xs={4}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.account && errors.account,
										)}
										id='account'
										value={values.account}
										name='account'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.account && errors.account && (
										<FormHelperText
											error
											id='helper-text-account-signup'
										>
											{errors.account}
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
											touched.requireGrade &&
												errors.requireGrade,
										)}
										id='requireGrade'
										value={values.requireGrade}
										name='requireGrade'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.requireGrade &&
										errors.requireGrade && (
											<FormHelperText
												error
												id='helper-text-requireGrade-signup'
											>
												{errors.requireGrade}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='campInfo-signup' required>
									{' '}
									캠핑장 소개
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextareaAutosize
										id='campInfo'
										name='campInfo'
										minRows={5}
										aria-label='maximum height'
										placeholder='캠핑장 소개를 입력하세요'
										value={values.campInfo}
										style={customStyle}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel htmlFor='facility-signup' required>
									{' '}
									부대시설
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.facility && errors.facility,
										)}
										id='facility'
										value={values.facility}
										name='facility'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.facility && errors.facility && (
										<FormHelperText
											error
											id='helper-text-facility-signup'
										>
											{errors.facility}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='layoutImage-signup'
									required
								>
									{' '}
									배치도
								</InputLabel>
							</Grid>
							<Grid item xs={10}>
								<Stack spacing={1}>
									<TextField
										fullWidth
										error={Boolean(
											touched.layoutImage &&
												errors.layoutImage,
										)}
										id='layoutImage'
										value={values.layoutImage}
										name='layoutImage'
										onChange={handleChange}
										placeholder=''
										style={{backgroundColor: 'white'}}
									/>
									{touched.layoutImage && errors.layoutImage && (
										<FormHelperText
											error
											id='helper-text-layoutImage-signup'
										>
											{errors.layoutImage}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={2}>
								<InputLabel
									htmlFor='campThumImage-signup'
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
											touched.campThumImage &&
												errors.campThumImage,
										)}
										id='campThumImage'
										value={values.campThumImage}
										name='campThumImage'
										onChange={handleChange}
										placeholder='이미지 URL을 입력해주세요'
										style={{backgroundColor: 'white'}}
									/>
									{touched.campThumImage &&
										errors.campThumImage && (
											<FormHelperText
												error
												id='helper-text-campThumImage-signup'
											>
												{errors.campThumImage}
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
