import { fetchPost } from "../post/postSlice";
import { updateLikes } from "./likesStatusApi";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  likes: null,
  isError: null,
  isLoading: null,
  error: null,
};

export const fetchLikes = createAsyncThunk(
  "likesStatus/fetchLikes",
  async (postId) => {
    return await updateLikes(postId);
  }
);

const likesStatusSlice = createSlice({
  name: "likesStatus",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes = action.payload;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes = action.payload.likes;
      });
  },
});

export default likesStatusSlice.reducer;
