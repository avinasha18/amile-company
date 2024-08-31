// src/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    userDetails: JSON.parse(Cookies.get('userDetails') || null),
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token ,userDetails} = action.payload;
      state.token = token;
      state.userDetails = userDetails;
      Cookies.set('token', token, { expires: action.payload.cookieExpires || 1});
      Cookies.set('userDetails', JSON.stringify(userDetails), { expires: action.payload.cookieExpires || 1}); 

    },
    logout: (state) => {
      state.token = null;
      state.userDetails = null;
      Cookies.remove('token');
      Cookies.remove('userDetails');
    },
    setUserData: (state, action) => {
      state.userDetails = action.payload;
      Cookies.set('userDetails',JSON.stringify(action.payload), { expires: action.payload?.cookieExpires || 7}); 

    },
  },
});

export const { loginSuccess, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
