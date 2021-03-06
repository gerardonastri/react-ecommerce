import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'cart',
    initialState: {
       currentUser: null,
       isFetching: null,
       error: false
    },
    reducers: {
       loginStart: (state) => {
           state.isFetching = true;
       },
       loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
       },
       loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
       }

    }
})

export const {loginStart, loginFailure, loginSuccess} = userSlice.actions;
export default userSlice.reducer;