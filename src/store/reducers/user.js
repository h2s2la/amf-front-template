// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    id: '',
    name: '',
    email: ''
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },

        logout(state) {
            state.id = '';
            state.name = '';
            state.email = '';
        }
    }
});

export default user.reducer;

export const { login, logout } = user.actions;
