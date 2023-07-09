import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {updatePost} from 'api/board';
import {
	Button,
	FormHelperText,
	Grid,
	Stack,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useLocation} from 'react-router';

const UpdatePost = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const id = location.state ? location.state.id : '';
	const title = location.state ? location.state.title : '';
	const content = location.state ? location.state.content : '';

	const {enqueueSnackbar} = useSnackbar();

	const goBack = () => {
		navigate(`/post/${id}`);
	};

	return (
		<>
			{title && (
				<Formik
					//초기값 셋팅
					initialValues={{
						title: title,
						content: content,
						submit: null,
					}}
					//객체 validation :title 필
					validationSchema={Yup.object().shape({
						title: Yup.string()
							.max(255)
							.required('제목은 필수입니다.'),
					})}
					onSubmit={async (values, {setSubmitting}) => {
						setSubmitting(true);

						await updatePost({id}, values);

						setSubmitting(false);

						enqueueSnackbar('게시글을 수정하였습니다.', {
							variant: 'success',
						});
						goBack();
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
								<Grid item xs={24} md={12}>
									<Stack spacing={1}>
										<TextField
											fullWidth
											error={Boolean(
												touched.title && errors.title,
											)}
											id='title'
											value={values.title}
											name='title'
											onChange={handleChange}
											placeholder='제목을 입력하세요'
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
										<TextareaAutosize
											id='content'
											name='content'
											minRows={5}
											aria-label='maximum height'
											placeholder='내용을 입력하세요'
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
											수정
										</Button>
									</Grid>
									<Grid item>
										<Button
											disableElevation
											size='large'
											variant='contained'
											onClick={goBack}
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
			)}
		</>
	);
};

export default UpdatePost;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
