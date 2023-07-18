import {default as axios} from 'utils/axiosHandler';

const CAMP_URL = '/api/v1/campground';

export const getCampgrounds = async (params) => axios.get(CAMP_URL, params);

export const getPost = async ({id}) => axios.get(`${CAMP_URL}/${id}`);

export const deletePost = async ({id}) => axios.delete(`${CAMP_URL}/${id}`);

export const createPost = async (params) => axios.post(`${CAMP_URL}`, params);

export const updatePost = async ({id}, params) =>
	axios.put(`${CAMP_URL}/${id}`, params);
