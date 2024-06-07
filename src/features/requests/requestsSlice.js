import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "../../utils";
import axios from "axios";
import { API_URL } from "../constants";
import axiosInstance from "../../services/AxiosInstance";

const { LOADING, IDLE, SUCCEEDED } = FETCH_STATUS;

const BOOKING_URL = "booking";
const BOOKING_URL_COMPLETE = `${API_URL}/${BOOKING_URL}`;

const initialState = {
  data: [],
  status: IDLE,
  error: null,
};

export const fetchRequests = createAsyncThunk(
  "booking/fetchRequests",
  async () => {
    try {
      const response = await axiosInstance(BOOKING_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addNewRequest = createAsyncThunk(
  "booking/addNewRequest",
  async (data) => {
    try {
      await axios.post(BOOKING_URL_COMPLETE, { ...data });
    } catch (error) {
      console.error(error);
    }
  }
);

export const handleRequest = createAsyncThunk(
  "booking/accept",
  async (data) => {
    try {
      await axiosInstance.put(`/${BOOKING_URL}/${data.id}`, {
        state: data.state,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteRequest = createAsyncThunk("booking/delete", async (id) => {
  try {
    await axiosInstance.delete(`/${BOOKING_URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
});

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRequests.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.data = action.payload.data;
      })
      .addCase(addNewRequest.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(addNewRequest.fulfilled, (state, action) => {
        state.status = IDLE;
      })
      .addCase(handleRequest.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(handleRequest.fulfilled, (state, action) => {
        state.status = IDLE;
      })
      .addCase(deleteRequest.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.status = IDLE;
      });
  },
});

export default requestsSlice.reducer;

export const selectAllRequests = (state) => state.requests.data;
