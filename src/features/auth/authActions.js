import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../services/AxiosInstance";
import { API_URL } from "../constants";

const AUTH_API_COMPLETE = `${API_URL}/users`;
const AUTH_API = "/users";
const SIGNUP = "signup";
const LOGIN = "login";
const USER = "user";

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(`${AUTH_API_COMPLETE}/${SIGNUP}`, { ...user }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/user",
  async ({ token }, { rejectWithValue }) => {
    try {
      const getToken = localStorage.getItem("userToken");
      if (!token && !getToken) return;
      const response = await axiosInstance.get(`${AUTH_API}/${USER}`);

      if (response.status === 200) {
        const data = JSON.stringify(response?.data?.data);
        localStorage.setItem("userData", data);
      }

      return response.data;
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
  async (user, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
      // const { data } = await axios.post(
      //   `${AUTH_API_COMPLETE}/${LOGIN}`,
      //   { ...user },
      //   config
      // );
      // localStorage.setItem("userToken", data.loginUser.token);
      // return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk("auth/update", async (user) => {
  try {
    const { data } = await axiosInstance.put(`${AUTH_API}/update`, user);
    const { data: responseUser } = await axiosInstance.get(
      `${AUTH_API}/${USER}`
    );

    if (responseUser.status === 200) {
      const dataJSON = JSON.stringify(responseUser?.data);
      localStorage.setItem("userData", dataJSON);
    }

    return [data, responseUser.data];
  } catch (error) {
    console.error(error);
  }
});

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
