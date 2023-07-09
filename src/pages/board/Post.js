import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deletePost, getPost} from 'api/board';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	Grid,
	InputLabel,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useSnackbar} from 'notistack';

const Post = () => {
	const navigate = useNavigate();
	const {enqueueSnackbar} = useSnackbar();

	const {id} = useParams();

	const [post, setPost] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		findPost();
	}, [id]);

	const findPost = async () => {
		const result = await getPost({id});
		setPost(result);
	};

	const goBackList = () => {
		navigate(`/board`);
	};

	const deleteClick = async () => {
		try {
			setDeleteLoading(true);
			await deletePost({id});
			enqueueSnackbar('게시글이 삭제되었습니다.', {variant: 'success'});
			setDeleteLoading(false);

			goBackList();
		} catch (err) {
			enqueueSnackbar(err, {variant: 'error'});
			setDeleteLoading(false);
		}
	};

	const updatePost = async () => {
		navigate(`/post/update`, {
			state: {
				id: id,
				title: post.title,
				content: post.content,
			},
		});
	};

	return (
		<>
			<Stack direction='row' spacing={2}>
				<Grid container>
					<Grid item>
						<Button variant='contained' onClick={goBackList}>
							목록
						</Button>
					</Grid>
				</Grid>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<Button
							variant='outlined'
							onClick={updatePost}
							style={{marginRight: 10}}
						>
							수정
						</Button>
					</Grid>
					<Grid item>
						<LoadingButton
							variant='contained'
							onClick={deleteClick}
							color='error'
							loading={deleteLoading}
						>
							삭제
						</LoadingButton>
					</Grid>
				</Grid>
			</Stack>
			<Card sx={{p: 2}} style={{borderRadius: '8px', marginTop: 15}}>
				<Toolbar>
					<Typography
						sx={{flex: '1 1 100%'}}
						variant='h4'
						id='tableTitle'
						component='div'
					>
						{post?.title ? post.title : ''}
					</Typography>
				</Toolbar>
				<Divider />
				<CardContent>
					{post ? (
						<Grid item xs={12}>
							<Stack spacing={1}>
								<Grid container justifyContent='flex-end'>
									<InputLabel htmlFor='desc-signup'>
										{'작성자 : '}
										{post.author}
									</InputLabel>
								</Grid>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='내용'
								>
									{post.content}
								</Typography>
							</Stack>
						</Grid>
					) : (
						<Box
							sx={{py: 3, minHeight: 560}}
							style={{textAlign: 'center'}}
						>
							<CircularProgress />
						</Box>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default Post;
