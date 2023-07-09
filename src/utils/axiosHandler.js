import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_SERVER,
	paramsSerializer: (params) => qs.stringify(params),
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		// eslint-disable-next-line no-undef
		return Promise.reject(err);
	},
);

axiosInstance.interceptors.response.use(({data: response}) => {
	return response;
});
export default axiosInstance;

