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
      const response = await axiosInstance.get(`${USER_PATH}/${type}`);
      const currentUser = response?.data?.find(({ email }) => email === user);

      if (response.status === 200) {
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

export const sendEmailForReset = createAsyncThunk(
  "auth/reset",
  async (email) => {
    try {
      await axios.post(`${AUTH_API_COMPLETE}/reset`, {
        email,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export const resetPassword = createAsyncThunk("users/resetPw", async (data) => {
  try {
    const config = {
      headers: {
        "x-access-token": data.token,
      },
    };

    const response = await axios.put(
      `${AUTH_API_COMPLETE}/update`,
      { password: data.password },
      config
    );
  } catch (error) {
    console.error(error);
  }
});

export const verifyUser = createAsyncThunk("user/verify", async (email) => {
  try {
    const response = await axios.get(
      `${AUTH_API_COMPLETE}/verify?email=${email}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};
