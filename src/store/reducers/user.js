// types
import {createSlice} from '@reduxjs/toolkit';

// initial state
const initialState = {
	memberId: '',
	memberName: '',
	memberNickName: '',
	memberType: '',
	memberGrade: '',
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			state.memberId = action.payload.memberId;
			state.memberName = action.payload.memberName;
			state.memberNickName = action.payload.memberNickName;
			state.memberType = action.payload.memberType;
			state.memberGrade = action.payload.memberGrade;
		},

		logout(state) {
			state.memberId = '';
			state.memberName = '';
			state.memberNickName = '';
			state.memberType = '';
			state.memberGrade = '';
		},
	},
});

export default user.reducer;

export const {login, logout} = user.actions;
