import {default as axios} from 'utils/axiosHandler';

/*로컬*/
// const BOOKING_URL = 'http://localhost:8081/booking';

/*웹서버*/
const BOOKING_URL = '/booking';

export const getBookingList = async (params) =>
	axios.get(`${BOOKING_URL}/getList`, params, {
		withCredentials: true,
	});

export const getBooking = async ({bookingId}) =>
	axios.get(`${BOOKING_URL}/${bookingId}`);

// export const deletePost = async ({id}) => axios.delete(`${POST_URL}/${id}`);

export const createBooking = async (params) =>
	axios.post(`${BOOKING_URL}`, params);

// export const updatePost = async ({id}, params) =>
// 	axios.put(`${POST_URL}/${id}`, params);
