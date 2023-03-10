import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRelatedPosts } from "./relatedPostsApi";
const initialState = {
  relatedPosts: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchRelatedPosts = createAsyncThunk(
  "relatedPost/fetchRelatedPosts",
  async ({ postId, tags }) => {
    return await getRelatedPosts({ postId, tags });
  }
);

const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedPosts = action.payload;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedPosts = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default relatedPostsSlice.reducer;
