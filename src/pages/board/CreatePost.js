import React from 'react';
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
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useSelector} from 'react-redux';

const CreatePost = () => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const {id, name} = user;

	const goBackList = () => {
		navigate(`/board`);
	};

	return (
		<>
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

export default CreatePost;

const customStyle = {
	padding: '10.5px 14px 10.5px 12px',
	font: 'inherit',
	borderRadius: '4px',
	borderColor: '#d9d9d9',
};
