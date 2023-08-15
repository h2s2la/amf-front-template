import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
//import * as Yup from 'yup';
import {Formik} from 'formik';
//import {deletePost, getCampground} from 'api/camp';
import DataTable from 'components/@extended/DataTable';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useSelector} from 'react-redux';
import {getCampground} from 'api/camp';
import {getMember} from 'api/authentication';
import {getCampsiteListFindByGround} from 'api/camp';
import {useSnackbar} from 'notistack';
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
	const {enqueueSnackbar} = useSnackbar();
	const user = useSelector((state) => state.user);
	const {memberId, memberName, memberType, memberGrade} = user;

	const {id} = useParams();
	const [data, setData] = useState([]);
	const [campground, setCampground] = useState(null);
	const [member, setMember] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [campsite, setCampsite] = useState(null);
	const [campId] = useState(id);

	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 1),
			key: 'selection',
		},
	]);

	// Create a ref to hold the campsiteId value
	const campsiteRef = useRef(campsite);

	const campgroundRef = useRef(campground);

	const memberRef = useRef(member);

	useEffect(() => {
		findCampsiteList();
	}, [id]);

	const findCampsiteList = async () => {
		setLoading(true);

		console.log('member 정보 : ' + JSON.stringify(member));
		const result = await getCampground({id});
		setCampground(result);
		const response = await getCampsiteListFindByGround({id});
		setData(response);
		setLoading(false);
	};

	useEffect(() => {
		console.log('campsite updated:', JSON.stringify(campsite));
		// Update the ref value whenever campsiteId changes
		campsiteRef.current = campsite;
	}, [campsite]);

	useEffect(() => {
		console.log('campground updated:', JSON.stringify(campground));
		// Update the ref value whenever campground changes
		campgroundRef.current = campground;
	}, [campground]);

	useEffect(() => {
		findMember();
	}, [memberId]);

	const findMember = async () => {
		console.log('update member Id : ' + memberId);
		const resultMember = await getMember({memberId});
		console.log('멤버 조회 결과는? : ' + JSON.stringify(resultMember));
		setMember(resultMember);
		memberRef.current = resultMember;
	};

	const rowClick = useCallback((e, row) => {
		//const campsiteId = row.id;
		setCampsite(row);
		campsiteRef.current = row;
		console.log(
			'사이트 예약 선택 : row.id : ' +
				row.id +
				',  memberId : ' +
				memberId +
				', memberName : ' +
				memberName +
				', memberType : ' +
				memberType +
				', memberGrade : ' +
				memberGrade +
				', member정보 : ' +
				JSON.stringify(memberRef.current) +
				', campsite정보 : ' +
				JSON.stringify(campsiteRef.current), // Access the updated value from the ref,
			', campground정보 : ' + JSON.stringify(campgroundRef.current), // Access the updated value from the ref,
		);

		//navigate(`/booked/${campsiteId}`);
	}, []);
	// const goHome = () => {
	// 	navigate(`/`);
	// };
	const goBackList = () => {
		navigate(`/camps/${id}`);
	};

	const goComplete = (bookingId) => {
		console.log('예약완료 ID : ' + bookingId);
		navigate(`/bookingComplete/${bookingId}`);
	};
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	return (
		<>
			{' '}
			<Formik
				//초기값 셋팅
				initialValues={{
					startDate: new Date(state[0].startDate).toLocaleString(
						'ko-KR',
						{
							timeZone: 'Asia/Seoul',
						},
					), // Convert to Korean time
					endDate: new Date(state[0].endDate).toLocaleString(
						'ko-KR',
						{
							timeZone: 'Asia/Seoul',
						},
					), // Convert to Korean time
					//	campsiteId: campsiteId,
					price: '0',
					submit: null,
				}}
				//객체 validation :title 필
				// validationSchema={Yup.object().shape({
				// 	title: Yup.string().max(255).required('제목은 필수입니다.'),
				// })}
				onSubmit={async (values, {setSubmitting}) => {
					setSubmitting(true);
					console.log(
						'예약하기 : ' +
							JSON.stringify(values) +
							', 사이트 : ' +
							JSON.stringify(campsite) + // Access the updated value from the ref
							', 캠핑장 : ' +
							campId +
							', 맴버정보 : ' +
							JSON.stringify(member),
					);
					/////////////////////////
					// "memberId": "string",
					// "memberName": "string",
					// "memberCellNumber": "string",
					// "memberGrade": 0,
					// "campId": 0,
					// "campName": "string",
					// "siteId": 0,
					// "siteName": "string",
					// "address": "string",
					// "contactNumber": "string",
					// "price": 0,
					// "startDate": "string",
					// "endDate": "string"

					values.memberId = member.id; //
					values.memberName = member.name; //
					values.memberCellNumber = member.cellNumber; //
					values.memberGrade = member.grade; //
					values.campId = campground.id; //
					values.campName = campground.name; //
					values.siteId = campsite.id; //
					values.siteName = campsite.campsiteName; //
					values.address = campground.address; //
					values.contactNumber = campground.contactNumber; //
					values.price = campsite.price; //
					// values.startDate = state[0].startDate; //
					// values.endDate = state[0].endDate; //
					values.startDate = formatDate(new Date(state[0].startDate)); // Convert to Korean time and format as yyyy-mm-dd
					values.endDate = formatDate(new Date(state[0].endDate)); // Convert to Korean time and format as yyyy-mm-dd

					console.log('예약 values : ' + JSON.stringify(values));
					////////////////////////

					const response = await createBooking(values);

					setSubmitting(false);

					enqueueSnackbar('캠핑사이트 예약완료하였습니다.', {
						variant: 'success',
					});
					goComplete(response.id);
				}}
			>
				{({handleSubmit, isSubmitting}) => (
					<form noValidate onSubmit={handleSubmit}>
						<Stack direction='row' spacing={2}>
							<Grid container>
								<Grid item>
									<Button
										variant='contained'
										onClick={goBackList}
									>
										뒤로가기
									</Button>
								</Grid>
							</Grid>
						</Stack>
						<Card
							sx={{p: 2}}
							style={{borderRadius: '8px', marginTop: 15}}
						>
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
												moveRangeOnFirstSelection={
													false
												}
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
						<br></br>
						<Grid item xs={2} justifyContent='center'>
							<Button
								disableElevation
								disabled={isSubmitting}
								fullWidth
								size='large'
								type='submit'
								variant='contained'
								color='primary'
							>
								예약신청
							</Button>
						</Grid>
						<Grid item xs={4}></Grid>
					</form>
				)}
			</Formik>
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
