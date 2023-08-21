import {default as axios} from 'utils/axiosHandler';

/*로컬*/
// const MEMBERS_URL = 'http://localhost:8082/members';
// const SIGNUP_URL = 'http://localhost:8082/signup';
// const LOGIN_URL = 'http://localhost:8082/login';

// export const login = async (params) => axios.post(LOGIN_URL, params);

// export const createMember = async (params) => axios.post(SIGNUP_URL, params);

// export const getMember = async ({memberId}) =>
// 	axios.get(`${MEMBERS_URL}/${memberId}`);

/*웹서버*/
const MEMBERS_URL = '/members';
const SIGNUP_URL = '/signup';
const LOGIN_URL = '/login';

export const login = async (params) => axios.post(LOGIN_URL, params);

export const createMember = async (params) => axios.post(SIGNUP_URL, params);

export const getMember = async ({memberId}) =>
	axios.get(`${MEMBERS_URL}/${memberId}`, {
		withCredentials: true,
	});
