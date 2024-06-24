import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "../../utils";
import axios from "axios";
import axiosInstance from "../../services/AxiosInstance";

const { LOADING, IDLE, SUCCEEDED, FAILED } = FETCH_STATUS;

const expectedCode = "OK";
const BUY_URL = "buys";
const BUY_URL_COMPLETE = `${process.env.REACT_APP_JAVA_BACK_URL}/api/v1/${BUY_URL}`;

const initialState = {
  data: [],
  status: IDLE,
  error: null,
  dataPurchase: [],
};

export const fetchRequests = createAsyncThunk(
  "booking/fetchRequests",
  async () => {
    try {
      const response = await axiosInstance(BUY_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addNewRequest = createAsyncThunk(
  "booking/addNewRequest",
  async (id) => {
    try {
      const response = await axiosInstance.post(`${BUY_URL_COMPLETE}/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const handleRequest = createAsyncThunk(
  "booking/accept",
  async (data) => {
    try {
      await axiosInstance.put(`/${BUY_URL}/${data.id}`, {
        state: data.state,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteRequest = createAsyncThunk("booking/delete", async (id) => {
  try {
    await axiosInstance.delete(`${BUY_URL_COMPLETE}/${id}`);
  } catch (error) {
    console.error(error);
  }
});

export const getAllMyPurchases = createAsyncThunk(
  "courses/myPurchase",
  async (touristId) => {
    try {
      const response = await axiosInstance.get(
        `${BUY_URL_COMPLETE}/tourist/${touristId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting all my purchase", error);
    }
  }
);

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
        state.status = SUCCEEDED;
      })
      .addCase(getAllMyPurchases.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(getAllMyPurchases.fulfilled, (state, { payload = {} }) => {
        if (payload.statusCode === expectedCode) {
          state.status = SUCCEEDED;
          state.dataPurchase = payload.data;
        }
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

export const selectRequestStatus = (state) => state.requests.status;
export const selectAllRequests = (state) => state.requests.data;
export const selectAllTouristPurchase = (state) => state.requests.dataPurchase;
