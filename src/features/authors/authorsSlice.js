import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_STATUS } from "../../utils";
import { API_URL } from "../constants";

const { LOADING, IDLE, SUCCEEDED, FAILED } = FETCH_STATUS;

const initialState = {
  data: [],
  status: IDLE,
  error: null,
};

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/author`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.data = state.data.concat(action.payload.data);
      });
  },
});

export const selectAllAuthors = (state) => state.authors.data;

export const selectAuthorById = (state, authorId) => {
  return state.authors.data.find((authors) => authors._id === authorId);
};

export const selectedLoginAuthor = (state, authorId) => {
  return state.authors.data.find((authors) => authors._id === authorId);
};

export const selectAuthorStatus = (state) => state.authors.status;

export default authorsSlice.reducer;
