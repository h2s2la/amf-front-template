import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
//import {Button, Grid} from '@mui/material';
import {Grid} from '@mui/material';
import DataTable from 'components/@extended/DataTable';
import {useNavigate} from 'react-router-dom';
import {getReviewList} from 'api/review';
import {getBookingList} from 'api/booking';

const ReviewList = () => {
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	const {memberId} = user;

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		findReviewList();
	}, [memberId]);

	const findReviewList = async () => {
		setLoading(true);
		const reviewResponse = await getReviewList({memberId});
		const bookingResponse = await getBookingList({memberId});

		console.log('리뷰 응답 : ' + JSON.stringify(reviewResponse));
		console.log('부킹 응답 : ' + JSON.stringify(bookingResponse));

		const bookingMap = {};
		for (let booking of bookingResponse) {
			bookingMap[booking.bookingId] = {
				campName: booking.campName,
				siteName: booking.siteName,
				startDate: booking.startDate,
				endDate: booking.endDate,
			};
			// bookingMap[booking.bookingId] = booking.campName;
		}
		const data = reviewResponse.map((item) => ({
			...item,
			...bookingMap[item.booking_id],
			//campName: bookingMap[item.booking_id],
			//campName: bookingMap[item.booking_id].campName,
			// siteName: bookingMap[item.booking_id].siteName,
			// startDate: bookingMap[item.booking_id].startDate,
			// endDate: bookingMap[item.booking_id].endDate,
		}));

		setData(data);
		setLoading(false);
	};

	const rowClick = useCallback((e, row) => {
		const review_id = row.review_id;
		navigate(`/review/${review_id}`);
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
					{/* <Button variant='contained' onClick={moveCreatePostPage}>
						글쓰기
					</Button> */}
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
export default ReviewList;

const columns = [
	{
		id: 'campName',
		label: '캠핑장',
		width: 80,
		align: 'left',
	},
	{
		id: 'siteName',
		label: '사이트 정보',
		width: 90,
		align: 'left',
	},
	{
		id: 'startDate',
		label: '방문일자(시작일)',
		width: 60,
		align: 'left',
	},
	{
		id: 'endDate',
		label: '방문일자(종료일)',
		width: 60,
		align: 'left',
	},
	{
		id: 'create_dt',
		label: '작성일',
		width: 60,
		align: 'left',
	},
];
