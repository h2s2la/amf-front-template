import {default as axios} from 'utils/axiosHandler';
// import request from './request';

/*로컬*/
const REVIEW_URL = 'http://localhost:8000/review';

export const getReviewList = async ({memberId}) =>
	axios.get(`${REVIEW_URL}/myreview?user_id=${memberId}`);

export const getCampReviewList = async ({id}) =>
	axios.get(`${REVIEW_URL}/list?camp_id=${id}`);

export const createReview = async (params) =>
	axios.post(`${REVIEW_URL}`, params);

export const getCampReview = async ({review_id}) =>
	axios.get(
		`${REVIEW_URL}/detail?review_id=${review_id}&review_type=camjigi`,
	);

/*웹서버*/
// const REVIEW_URL = '/review';

// export const getReviewList = async ({memberId}) =>
// 	axios.get(`${REVIEW_URL}/myreview?user_id=${memberId}`, {
// 		withCredentials: true,
// 	});

// export const createReview = async (params) =>
// 	axios.post(`${REVIEW_URL}`, params, {
// 		withCredentials: true,
// 	});
// export const getCampReviewList = async ({id}) =>
// 	axios.get(`${REVIEW_URL}/list?camp_id=${id}`);

// export const getCampReview = async ({review_id}) =>
// 	axios.get(
// 		`${REVIEW_URL}/detail?review_id=${review_id}&review_type=camjigi`,
// 	);
