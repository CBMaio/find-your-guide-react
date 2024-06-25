import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../services/AxiosInstance";

const AUTH_API_COMPLETE = `${process.env.REACT_APP_JAVA_BACK_URL}/auth`;
const USER_PATH = `api/v1/user`;
const AUTH_API = "/users";
const SIGNUP = "register";
const LOGIN = "login";
const USER = "user";

export const registerUser = createAsyncThunk(
  "auth/signup",
  async ({ user, type }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${AUTH_API_COMPLETE}/${SIGNUP}`,
        { ...user, role: type },
        config
      );
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/user",
  async ({ user, type }, { rejectWithValue }) => {
    try {
      const getToken = localStorage.getItem("userToken");
      if (!getToken) return;
      const { data } = await axiosInstance.get(
        `${USER_PATH}/getBy/parameter/jwt`
      );

      const currentUser = data.data;

      if (data.statusCode === "OK") {
        const data = JSON.stringify({ ...currentUser, type });
        localStorage.setItem("userData", data);
      }

      return currentUser;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ user, type }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        `${AUTH_API_COMPLETE}/${LOGIN}`,
        { ...user },
        config
      );

      const [, token] = response?.headers?.authorization.split("Bearer ");
      localStorage.setItem("userToken", token);
      return { email: user.email, type };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async ({ user, type }) => {
    try {
      const response = await axiosInstance.patch(`${USER_PATH}/${type}`, user);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};
