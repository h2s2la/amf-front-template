import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

// project import패

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

//============ test ============

import { login  } from 'api/authentication';
import {useDispatch} from "react-redux";
import {login as successLogin} from 'store/reducers/user'

const AuthLogin = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);
	const dispatch = useDispatch();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const memberLogin = async (values) => {
		const result = await login(values);
		if(!result.login){
			enqueueSnackbar('로그인에 실패하였습니다.', { variant: 'error' });
			return;
		}
		enqueueSnackbar('로그인에 성공하였습니다.', { variant: 'success' });

		dispatch(successLogin({
			id: result.id,
			name: result.name,
			email: result.email
		}));
		navigate('/');
	};

	const accessSuccess = async (values) => {
		await memberLogin(values);
	};

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
					submit: null
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
					password: Yup.string().max(255).required('Password is required')
				})}
				onSubmit={async (values, { setErrors, setSubmitting }) => {
					try {
						setSubmitting(true);
						await accessSuccess(values);
					} catch (err) {
						setErrors({ submit: err.message });
						setSubmitting(false);
					}
				}}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor="email-login">이메일</InputLabel>
									<OutlinedInput
										id="email-login"
										type="email"
										value={values.email}
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="이메일을 입력하세요"
										fullWidth
										error={Boolean(touched.email && errors.email)}
									/>
									{touched.email && errors.email && (
										<FormHelperText error id="standard-weight-helper-text-email-login">
											{errors.email}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor="password-login">비밀번호</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(touched.password && errors.password)}
										id="-password-login"
										type={showPassword ? 'text' : 'password'}
										value={values.password}
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
													size="large"
												>
													{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
												</IconButton>
											</InputAdornment>
										}
										placeholder="비밀번호를 입력하세요"
									/>
									{touched.password && errors.password && (
										<FormHelperText error id="standard-weight-helper-text-password-login">
											{errors.password}
										</FormHelperText>
									)}
								</Stack>
							</Grid>

							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>{errors.submit}</FormHelperText>
								</Grid>
							)}
							<Grid item xs={12}>
								<Button
									disableElevation
									disabled={isSubmitting}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									color="primary"
								>
									로그인
								</Button>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default AuthLogin;