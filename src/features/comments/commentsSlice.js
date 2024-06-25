import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_STATUS } from "../../utils";
import axios from "axios";
import axiosInstance from "../../services/AxiosInstance";
import { da } from "date-fns/locale";

const { LOADING, SUCCEEDED, FAILED, IDLE } = FETCH_STATUS;
const COMMENT_URL = `${process.env.REACT_APP_JAVA_BACK_URL}/api/v1/reviews`;

const initialState = {
  data: [],
  status: IDLE,
  statusComment: IDLE,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    try {
      const response = await axiosInstance.get(`${COMMENT_URL}/user/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ comment, id }) => {
    try {
      const response = await axiosInstance.post(
        `${COMMENT_URL}/${id}`,
        comment
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (data) => {
    try {
      const response = await axiosInstance.put(`/comment/${data.id}`, {
        state: data.state,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteComment = createAsyncThunk("comment/delete", async (id) => {
  try {
    await axiosInstance.delete(`/comment/${id}`);
  } catch (error) {
    console.error(error);
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, { payload = {} }) => {
        if (payload.statusCode === "OK") {
          state.status = SUCCEEDED;
          state.data = payload.data;
        }
      })
      .addCase(addComment.pending, (state, action) => {
        state.statusComment = LOADING;
      })
      .addCase(addComment.fulfilled, (state, { payload = {} }) => {
        if (!payload) {
          state.statusComment = FAILED;
          return;
        }
        state.statusComment = SUCCEEDED;
        state.status = IDLE;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.statusComment = FAILED;
      })
      .addCase(updateComment.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.status = IDLE;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = IDLE;
      });
  },
});

export default commentsSlice.reducer;

export const getCommentsStatus = (state) => state.comments.statusComment;
export const selectAllComments = (state) => state.comments.data;
