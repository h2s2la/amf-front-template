import {default as axios} from 'utils/axiosHandler';
// import request from './request';

const REVIEW_URL = 'http://localhost:8000/review';
//const CAMPSITE_URL = '/api/v1/campsites';

//export const getCampgroundList = async (params) => axios.get(CAMP_URL, params);

// export const getCampgroundList = async (params) =>
// 	axios.get(CAMPGROUND_URL, params);

export const getReviewList = async ({id}) =>
	axios.get(`${REVIEW_URL}/myreivew?user_id=${id}`);

// export const deleteCampground = async ({id}) =>
// 	axios.delete(`${CAMPGROUND_URL}/${id}`);

// export const createCampground = async (params) =>
// 	axios.post(`${CAMPGROUND_URL}`, params);

// export const updateCampground = async ({id}, params) =>
// 	axios.put(`${CAMPGROUND_URL}/${id}`, params);

// const API_KEY = 'YOUR_API_KEY';
// const API_URL = 'https://api.data.go.kr/openapi/camping-info';

// export const getCampingData = async (region, name) => {
// 	const params = {
// 		serviceKey: API_KEY,
// 		type: 'json',
// 		numOfRows: 100,
// 		pageNo: 1,
// 		sidoNm: region,
// 		campNm: name,
// 	};
// 	const response = await axios.get(API_URL, {params});
// 	return response;
// };

// const defaultParam = {
// 	key: process.env.REACT_APP_PIXABAY,
// 	safesearch: true,
// };
// const getCampgroundList = async (paramObj) => {
// 	const params = new URLSearchParams({
// 		...defaultParam,
// 		...paramObj,
// 	}).toString();
// 	const result = await request(`${CAMPGROUND_URL}/?${params}`);
// 	return result;
// };
// export default getCampgroundList;

// export const getCampsiteList = async (params) =>
// 	axios.get(CAMPSITE_URL, params);

// export const getCampsiteListFindByName = async (name) =>
// 	axios.get(`${CAMPGROUND_URL}/name/${name}`);

// export const createCampsite = async (params) =>
// 	axios.post(`${CAMPSITE_URL}`, params);
