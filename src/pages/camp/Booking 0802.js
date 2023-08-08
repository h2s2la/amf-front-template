import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
//import {deletePost, getCampground} from 'api/camp';
import DataTable from 'components/@extended/DataTable';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useSelector} from 'react-redux';
import {getCampground} from 'api/camp';
import {getCampsiteList} from 'api/camp';
import {createBooking} from 'api/booking';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import {DateRangePicker} from 'react-date-range';
import {addDays} from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Booking = () => {
	const navigate = useNavigate();
	//const {enqueueSnackbar} = useSnackbar();

	const user = useSelector((state) => state.user);
	const {memberId, memberName, memberType} = user;

	const {id} = useParams();
	const [data, setData] = useState([]);
	const [campground, setCampground] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 1),
			key: 'selection',
		},
	]);

	useEffect(() => {
		findCampsiteList();
	}, [id]);

	const findCampsiteList = async () => {
		setLoading(true);
		const result = await getCampground({id});
		setCampground(result);
		const response = await getCampsiteList({id});
		setData(response);
		setLoading(false);
	};
	const rowClick = useCallback((e, row) => {
		const campsiteId = row.id;
		console.log(
			'사이트 예약 선택 : row.id : ' +
				row.id +
				',  memberId : ' +
				memberId +
				', memberName : ' +
				memberName +
				', memberType : ' +
				memberType,
		);

		navigate(`/booked/${campsiteId}`);
	}, []);

	const goBackList = () => {
		navigate(`/camps/${id}`);
	};

	return (
		<>
			<Stack direction='row' spacing={2}>
				<Grid container>
					<Grid item>
						<Button variant='contained' onClick={goBackList}>
							뒤로가기
						</Button>
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
						{campground?.name ? campground.name : ''}
					</Typography>
				</Toolbar>
				<Divider />
				<CardContent>
					{campground ? (
						<Grid item xs={12}>
							<Stack spacing={1}>
								<Typography
									variant='h4'
									aria-label='maximum height'
									placeholder='예약안내'
								>
									{'예약안내'}
								</Typography>
								<Typography
									variant='body1'
									aria-label='maximum height'
									placeholder='소개'
								>
									{campground.campInfo}
								</Typography>
								<br></br>
								<DateRangePicker
									ranges={state}
									editableDateInputs={true}
									onChange={(item) =>
										setState([item.selection])
									}
									moveRangeOnFirstSelection={false}
									months={2}
									direction='horizontal'
								/>
								<br></br>

								<img
									src={campground.layoutImage}
									alt='layoutImage'
									style={{
										objectFit: 'contain',
										maxHeight: '300px',
									}}
								/>
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
				<br></br>

				<Typography
					variant='h4'
					aria-label='maximum height'
					placeholder='사이트 선택'
				>
					{'사이트(객실)을 선택해주세요'}
				</Typography>
				<DataTable
					columns={columns}
					rows={data}
					rowsPerPageOptions={[10, 20, 30]}
					isLoading={isLoading}
					rowClick={rowClick}
				/>
			</Card>
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
		</>
	);
};

export default Booking;
const columns = [
	{
		id: 'image',
		label: '대표이미지',
		width: 60,
		align: 'left',
		render: (rowData) => (
			<img
				src={rowData.campsiteThumImage}
				alt='campsite'
				height='150'
				//	width='150'
				style={{objectFit: 'cover'}}
			/>
		),
	},
	{
		id: 'campsiteName',
		label: '사이트 이름',
		width: 300,
		align: 'left',
	},
	{
		id: 'price',
		label: '이용 요금(원)',
		width: 100,
		align: 'left',
	},
];
