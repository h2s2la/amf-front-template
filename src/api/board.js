import {default as axios} from 'utils/axiosHandler';

const POST_URL = '/api/v1/posts';

export const getPostList = async (params) => axios.get(POST_URL, params);

export const getPost = async ({id}) => axios.get(`${POST_URL}/${id}`);

export const deletePost = async ({id}) => axios.delete(`${POST_URL}/${id}`);

export const createPost = async (params) => axios.post(`${POST_URL}`, params);

export const updatePost = async ({id}, params) =>
	axios.put(`${POST_URL}/${id}`, params);
