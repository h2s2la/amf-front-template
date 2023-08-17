import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

// material-ui
import {
	Box,
	Button,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import {Formik} from 'formik';

// project import
import {strengthColor, strengthIndicator} from 'utils/password-strength';

// assets
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {createMember} from 'api/authentication';
import {useSnackbar} from 'notistack';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
	const [level, setLevel] = useState();
	const [showPassword, setShowPassword] = useState(false);
	const [memberType, setMemberType] = useState('Camper');

	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const changePassword = (value) => {
		const temp = strengthIndicator(value);
		setLevel(strengthColor(temp));
	};

	useEffect(async () => {
		changePassword('');
	}, []);

	const handleMemberTypeChange = (event) => {
		const selectedMemberType = event.target.value;
		setMemberType(selectedMemberType);
		console.log('변경된 멤버타입 : ' + memberType);
	};

	// const [memberTypeCamper, setMemberTypeCamper] = useState('');
	// const [memberTypeCamjigi, setMemberTypeCamjigi] = useState('');

	// 라디오 버튼의 value가 바뀔 때마다 state를 업데이트하는 함수를 정의합니다.
	// const handleMemberTypeCamperChange = (event) => {
	// 	setMemberTypeCamper(event.target.value);

	// 	setMemberType('Camper');
	// };

	// const handleMemberTypeCamjigiChange = (event) => {
	// 	setMemberTypeCamjigi(event.target.value);

	// 	setMemberType('Camjigi');
	// };
	return (
		<>
			<Formik
				initialValues={{
					id: '',
					name: '',
					nickname: '',
					cellNumber: '',
					bizNumber: '',
					password: '',
					passwordCheck: '',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					id: Yup.string().max(10).required('ID는 필수입니다.'),
					name: Yup.string().max(10).required('이름은 필수입니다.'),
					nickname: Yup.string()
						.max(10)
						.required('닉네임은 필수입니다.'),
					// email: Yup.string()
					// 	.email('이메일 형식으로 입력해주세요.')
					// 	.max(255)
					// 	.required('이메일은 필수입니다.'),
					password: Yup.string()
						.min(8, '비밀번호는 최소 8자리이상 필요합니다.')
						.max(255)
						.required('비밀번호는 필수입니다.'),
					passwordCheck: Yup.string()
						.required('비밀번호 확인은 필수입니다.')
						.oneOf(
							[Yup.ref('password')],
							'비밀번호가 일치하지 않습니다.',
						),
				})}
				onSubmit={async (values, {setErrors, setSubmitting}) => {
					try {
						setSubmitting(true);
						values.memberType = memberType;

						const response = await createMember(values);

						if (response === -1) {
							enqueueSnackbar('중복된 ID입니다.', {
								variant: 'error',
							});
							setErrors({submit: '회원가입 실패'});
							return;
						} else if (response === -2) {
							enqueueSnackbar('이미가입된 전화번호입니다.', {
								variant: 'error',
							});
							setErrors({submit: '회원가입 실패'});
							return;
						} else if (response === -3) {
							enqueueSnackbar('이미가입된 사업자번호입니다.', {
								variant: 'error',
							});
							setErrors({submit: '회원가입 실패'});
							return;
						}

						setSubmitting(false);

						enqueueSnackbar('회원가입에 성공하였습니다.', {
							variant: 'success',
						});
						navigate('/login');
					} catch (err) {
						setErrors({submit: err.message});
						setSubmitting(false);
					}
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
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel
										htmlFor='memberType-signup'
										required
									>
										{' '}
										구분
									</InputLabel>

									<FormControl component='fieldset'>
										<RadioGroup
											name='memberType'
											value={memberType} // Set the value to the local state memberType
											onChange={handleMemberTypeChange}
										>
											<Grid item xs={6}>
												{/* 라디오 버튼에 서로 다른 name 속성을 부여하고, value와 onChange 속성을 state와 함수로 설정합니다. */}
												<FormControlLabel
													value='camper'
													control={<Radio />}
													label='캠퍼'
												/>
											</Grid>
											<Grid item xs={6}>
												<FormControlLabel
													value='camjigi'
													control={<Radio />}
													label='캠지기'
												/>
											</Grid>
										</RadioGroup>
									</FormControl>
									{touched.memberType && errors.memberType && (
										<FormHelperText
											error
											id='helper-text-memberType-signup'
										>
											{errors.memberType}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor='id-signup' required>
										{' '}
										ID
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(touched.id && errors.id)}
										id='id-signup'
										type='text'
										value={values.id}
										name='id'
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder='ID를 입력하세요'
									/>
									{touched.id && errors.id && (
										<FormHelperText
											error
											id='helper-text-id-signup'
										>
											{errors.id}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor='name-signup' required>
										{' '}
										이름
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(
											touched.name && errors.name,
										)}
										id='name-signup'
										type='text'
										value={values.name}
										name='name'
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder='이름을 입력하세요'
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
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel
										htmlFor='nickname-signup'
										required
									>
										닉네임
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(
											touched.nickname && errors.nickname,
										)}
										id='nickname-login'
										type='text'
										value={values.nickname}
										name='nickname'
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder='닉네임을 입력하세요.'
									/>
									{touched.nickname && errors.nickname && (
										<FormHelperText
											error
											id='helper-text-nickname-signup'
										>
											{errors.nickname}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							{memberType === 'camjigi' && (
								<Grid item xs={12}>
									<Stack spacing={1}>
										<>
											<InputLabel
												htmlFor='bizNumber-signup'
												required
											>
												사업자번호
											</InputLabel>
											<OutlinedInput
												fullWidth
												error={Boolean(
													touched.bizNumber &&
														errors.bizNumber,
												)}
												id='bizNumber-login'
												type='bizNumber'
												value={values.bizNumber}
												name='bizNumber'
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder='사업자번호를 입력하세요.'
											/>
											{touched.bizNumber &&
												errors.bizNumber && (
													<FormHelperText
														error
														id='helper-text-bizNumber-signup'
													>
														{errors.bizNum}
													</FormHelperText>
												)}
										</>
									</Stack>
								</Grid>
							)}
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel
										htmlFor='cellNumber-signup'
										required
									>
										전화번호
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(
											touched.cellNumber &&
												errors.cellNumber,
										)}
										id='cellNumber-login'
										type='cellNumber'
										value={values.cellNumber}
										name='cellNumber'
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder='전화번호를 입력하세요.'
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
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel
										htmlFor='password-signup'
										required
									>
										비밀번호
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(
											touched.password && errors.password,
										)}
										id='password-signup'
										type={
											showPassword ? 'text' : 'password'
										}
										value={values.password}
										name='password'
										onBlur={handleBlur}
										autoComplete={'off'}
										onChange={(e) => {
											handleChange(e);
											changePassword(e.target.value);
										}}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={
														handleClickShowPassword
													}
													onMouseDown={
														handleMouseDownPassword
													}
													edge='end'
													size='large'
												>
													{showPassword ? (
														<EyeOutlined />
													) : (
														<EyeInvisibleOutlined />
													)}
												</IconButton>
											</InputAdornment>
										}
										placeholder='8자 이상의 비밀번호를 입력하세요.'
									/>
									{touched.password && errors.password && (
										<FormHelperText
											error
											id='helper-text-password-signup'
										>
											{errors.password}
										</FormHelperText>
									)}
								</Stack>
								<FormControl fullWidth sx={{mt: 2}}>
									<Grid
										container
										spacing={2}
										alignItems='center'
									>
										<Grid item>
											<Box
												sx={{
													bgcolor: level?.color,
													width: 85,
													height: 8,
													borderRadius: '7px',
												}}
											/>
										</Grid>
										<Grid item>
											<Typography
												variant='subtitle1'
												fontSize='0.75rem'
											>
												{level?.label}
											</Typography>
										</Grid>
									</Grid>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel
										htmlFor='password-check-signup'
										required
									>
										비밀번호 확인
									</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(
											touched.passwordCheck &&
												errors.passwordCheck,
										)}
										// error={Boolean(values.password != values.passwordCheck)}
										id='password-check-signup'
										type={
											showPassword ? 'text' : 'password'
										}
										value={values.passwordCheck}
										name='passwordCheck'
										onBlur={handleBlur}
										onChange={handleChange}
										autoComplete={'off'}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password check visibility'
													onClick={
														handleClickShowPassword
													}
													onMouseDown={
														handleMouseDownPassword
													}
													edge='end'
													size='large'
												>
													{showPassword ? (
														<EyeOutlined />
													) : (
														<EyeInvisibleOutlined />
													)}
												</IconButton>
											</InputAdornment>
										}
										placeholder='비밀번호를 확인해주세요.'
									/>
									{touched.passwordCheck &&
										errors.passwordCheck && (
											<FormHelperText
												error
												id='helper-text-password-check-signup'
											>
												{errors.passwordCheck}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>
										{errors.submit}
									</FormHelperText>
								</Grid>
							)}
							<Grid item xs={12}>
								<Button
									disableElevation
									disabled={isSubmitting}
									fullWidth
									size='large'
									type='submit'
									variant='contained'
									color='primary'
								>
									가입
								</Button>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default AuthRegister;
