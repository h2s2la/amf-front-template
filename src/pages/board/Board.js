import React, {useCallback, useEffect, useState} from 'react';
import {Button, Grid} from '@mui/material';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import {getPostList} from 'api/board';

const Board = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		findPostList();
	}, []);

	const findPostList = async () => {
		setLoading(true);
		const response = await getPostList();
		setData(response);
		setLoading(false);
	};

	const moveCreatePostPage = () => {
		navigate(`/post/write`);
	};

	const rowClick = useCallback((e, row) => {
		const postId = row.id;
		navigate(`/post/${postId}`);
	}, []);

	return (
		<>
			<Grid
				container
				direction='row'
				justifyContent='flex-end'
				spacing={2}
			>
				<Grid item>
					<Button variant='contained' onClick={moveCreatePostPage}>
						글쓰기
					</Button>
				</Grid>
			</Grid>
			<DataTable
				columns={columns}
				rows={data}
				rowsPerPageOptions={[10, 20, 30]}
				isLoading={isLoading}
				rowClick={rowClick}
			/>
		</>
	);
};
export default Board;

const columns = [
	{
		id: 'title',
		label: '제목',
		width: 290,
		align: 'left',
	},
	{
		id: 'author',
		label: '작성자',
		width: 60,
		align: 'left',
	},
];
