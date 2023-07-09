import { default as axios } from 'utils/axiosHandler';

const MEMBERS_URL = '/api/v1/members';
const LOGIN_URL = '/api/v1/login';

export const login = async (params) => axios.post(LOGIN_URL, params);

export const createMember = async (params) => axios.post(MEMBERS_URL, params);

