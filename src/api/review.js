import {default as axios} from 'utils/axiosHandler';
// import request from './request';

/*로컬*/
// const REVIEW_URL = 'http://localhost:8000/review';

// export const getReviewList = async ({id}) =>
// 	axios.get(`${REVIEW_URL}/myreivew?user_id=${id}`);

// export const createReview = async (params) =>
// 	axios.post(`${REVIEW_URL}`, params);

/*웹서버*/
const REVIEW_URL = '/review';

export const getReviewList = async ({id}) =>
	axios.get(`${REVIEW_URL}/myreivew?user_id=${id}`, {
		withCredentials: true,
	});

export const createReview = async (params) =>
	axios.post(`${REVIEW_URL}`, params, {
		withCredentials: true,
	});
