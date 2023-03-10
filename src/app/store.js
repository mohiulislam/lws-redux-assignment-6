import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";

import postReducer from "../features/post/postSlice";
import postsReducer from "../features/posts/postsSlice";
import likesStatusReducer from "../features/likesStatus/likesStatusSlice";
import relatedPostsReducer from "../features/relatedPosts/relatedPostsSlice";
import savedStatusReducer from "../features/savedStatus/savedStatusSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    relatedPosts: relatedPostsReducer,
    filter: filterReducer,
    likes: likesStatusReducer,
    saved: savedStatusReducer,
  },
});
