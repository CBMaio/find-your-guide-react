import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "../../utils";
import axiosInstance from "../../services/AxiosInstance";

const { IDLE, LOADING, SUCCEEDED } = FETCH_STATUS;
const TROPHIES_URL = `${process.env.REACT_APP_JAVA_BACK_URL}/api/v1/trophies`;

const initialState = {
  status: IDLE,
  data: [],
  error: null,
};

export const fetchTrophies = createAsyncThunk(
  "trophies/fetchTrophies",
  async (state, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${TROPHIES_URL}/user`);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const trophiesSlice = createSlice({
  name: "trophies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrophies.fulfilled, (state, { payload = {} }) => {
      if (!payload) {
        return;
      }
      state.status = SUCCEEDED;
      state.data = payload.data.concat(payload.data);
    });
  },
});

export default trophiesSlice.reducer;

export const getAllTrophies = (state) => state.trophy.data;
export const getTrophiesStatus = (state) => state.trophy.status;
