import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "../../utils";
import axiosInstance from "../../services/AxiosInstance";

const { IDLE, LOADING, SUCCEEDED } = FETCH_STATUS;

const initialState = {
  status: IDLE,
  data: [],
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "catogories/fetchCategories",
  async (state, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/category");
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const cateogoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.status = SUCCEEDED;
      state.data = state.data.concat(payload.data);
    });
  },
});

export default cateogoriesSlice.reducer;

export const getCategories = (state) => state.category.data;
