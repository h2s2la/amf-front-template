// types
import {createSlice} from '@reduxjs/toolkit';

// initial state
const initialState = {
	id: '',
	name: '',
	memberType: '',
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.memberType = action.payload.memberType;
		},

		logout(state) {
			state.id = '';
			state.name = '';
			state.memberType = '';
		},
	},
});

export default user.reducer;

export const {login, logout} = user.actions;
