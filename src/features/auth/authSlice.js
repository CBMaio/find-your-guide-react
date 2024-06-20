import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getUserData,
  updateUser,
} from "./authActions";
import { user } from "../../utils/mockData";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userInfo = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  isAuthenticated: !!userToken,
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      state.isAuthenticated = false;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.userToken;
        state.isAuthenticated = true;
        state.success = true;
        state.userInfo = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //user data
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.userInfo = { ...state.userInfo, ...payload };
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const user = payload[1];
        state.userInfo = user;
        state.success = true;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state, { payload }) => {
        state.loading = true;
        state.success = false;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserInfo = (state) => state.auth.userInfo;
export const isGuide = (state) => state.auth.userInfo.type === "guide";
export const isTourist = (state) => state.auth.userInfo.type === "tourist";
export const selectUserToken = (state) => state.auth.userToken;
