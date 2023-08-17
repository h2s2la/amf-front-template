import {default as axios} from 'utils/axiosHandler';

/*로컬*/
// const BOOKING_URL = 'http://localhost:8081/booking';

// export const getBookingList = async ({memberId}) =>
// 	axios.get(`${BOOKING_URL}/getList?user_id=${memberId}`);

// export const getBooking = async ({bookingId}) =>
// 	axios.get(`${BOOKING_URL}/${bookingId}`);

// export const createBooking = async (params) =>
// 	axios.post(`${BOOKING_URL}`, params);

/*웹서버*/
const BOOKING_URL = '/booking';

export const getBooking = async ({bookingId}) =>
	axios.get(`${BOOKING_URL}/${bookingId}`);

export const createBooking = async (params) =>
	axios.post(`${BOOKING_URL}`, params);

export const getBookingList = async ({memberId}) =>
	axios.get(`${BOOKING_URL}/getList?userId=${memberId}`, {
		withCredentials: true,
	});

// export const deletePost = async ({id}) => axios.delete(`${POST_URL}/${id}`);
