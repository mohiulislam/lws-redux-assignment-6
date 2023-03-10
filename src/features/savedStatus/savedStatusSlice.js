import { fetchPost } from "../post/postSlice";
import { updateLikes, updateSaved } from "./savedStatusApi";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isSaved: null,
  isError: null,
  isLoading: null,
  error: null,
};

export const fetchSaved = createAsyncThunk(
  "savedStatus/fetchLikes",
  async (postId) => {
    return await updateSaved(postId);
  }
);

const savedStatusSlice = createSlice({
  name: "savedStatus",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaved.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchSaved.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSaved = action.payload;
      })
      .addCase(fetchSaved.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = action.payload.isSaved;
      });
  },
});

export default savedStatusSlice.reducer;
