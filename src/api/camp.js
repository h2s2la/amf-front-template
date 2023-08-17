import {default as axios} from 'utils/axiosHandler';
// import request from './request';

/*로컬*/
// const CAMPGROUND_URL = 'http://localhost:8080/campsite/ground';
// const CAMPSITE_URL = 'http://localhost:8080/campsite/site';

// export const getCampgroundList = async (params) =>
// 	axios.get(CAMPGROUND_URL, params);

// export const getCampground = async ({id}) =>
// 	axios.get(`${CAMPGROUND_URL}/detail/${id}`);

// export const deleteCampground = async ({id}) =>
// 	axios.delete(`${CAMPGROUND_URL}/${id}`);

// export const createCampground = async (params) =>
// 	axios.post(`${CAMPGROUND_URL}`, params);

// export const updateCampground = async ({id}, params) =>
// 	axios.put(`${CAMPGROUND_URL}/${id}`, params);

// export const getCampsiteList = async () => axios.get(`${CAMPSITE_URL}`);

// export const getCampsiteListFindByGround = async ({id}) =>
// 	axios.get(`${CAMPSITE_URL}/${id}`);

// export const getCampsiteListFindByName = async (requireGrade, name) =>
// 	axios.get(`${CAMPGROUND_URL}/${requireGrade}/${name}`);

// export const getCampsiteListFindByRequireGrade = async (requireGrade) =>
// 	axios.get(`${CAMPGROUND_URL}/${requireGrade}`);

// export const createCampsite = async (params) =>
// 	axios.post(`${CAMPSITE_URL}`, params);

// export const getCampsite = async ({id}) =>
// 	axios.get(`${CAMPSITE_URL}/detail/${id}`);

/*웹서버*/
const CAMPGROUND_URL = '/campsite/ground';
const CAMPSITE_URL = '/campsite/site';

export const getCampgroundList = async (params) =>
	axios.get(CAMPGROUND_URL, params);

export const getCampground = async ({id}) =>
	axios.get(`${CAMPGROUND_URL}/detail/${id}`);

export const deleteCampground = async ({id}) =>
	axios.delete(`${CAMPGROUND_URL}/${id}`);

export const createCampground = async (params) =>
	axios.post(`${CAMPGROUND_URL}`, params);

export const updateCampground = async ({id}, params) =>
	axios.put(`${CAMPGROUND_URL}/${id}`, params);

export const getCampsiteList = async () => axios.get(`${CAMPSITE_URL}`);

export const getCampsiteListFindByGround = async ({id}) =>
	axios.get(`${CAMPSITE_URL}/${id}`);

export const getCampsiteListFindByName = async (requireGrade, name) =>
	axios.get(`${CAMPGROUND_URL}/${requireGrade}/${name}`);

export const getCampsiteListFindByRequireGrade = async (requireGrade) =>
	axios.get(`${CAMPGROUND_URL}/${requireGrade}`, {
		withCredentials: true,
	});

export const createCampsite = async (params) =>
	axios.post(`${CAMPSITE_URL}`, params);

export const getCampsite = async ({id}) =>
	axios.get(`${CAMPSITE_URL}/detail/${id}`);
