import { getPost } from "./postApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  post: null,
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchPost = createAsyncThunk("post/fetchPost", async (postId) => {
  return await getPost(postId);
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default postSlice.reducer;
