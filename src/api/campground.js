import {default as axios} from 'utils/axiosHandler';

const CAMP_URL = '/api/v1/campground';

export const getCampgrounds = async (params) => axios.get(CAMP_URL, params);

export const getPost = async ({id}) => axios.get(`${CAMP_URL}/${id}`);

export const deletePost = async ({id}) => axios.delete(`${CAMP_URL}/${id}`);

export const createPost = async (params) => axios.post(`${CAMP_URL}`, params);

export const updatePost = async ({id}, params) =>
	axios.put(`${CAMP_URL}/${id}`, params);

const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://api.data.go.kr/openapi/camping-info';

export const getCampingData = async (region, name) => {
	const params = {
		serviceKey: API_KEY,
		type: 'json',
		numOfRows: 100,
		pageNo: 1,
		sidoNm: region,
		campNm: name,
	};
	const response = await axios.get(API_URL, {params});
	return response;
};
