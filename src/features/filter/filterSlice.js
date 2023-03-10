import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterBy: "all",
  sortBy: "default",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filterBy = action.payload;
    },
    sort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { filter, sort } = filterSlice.actions;

export default filterSlice.reducer;
