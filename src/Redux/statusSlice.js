import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
  },
});

export const { toggleStatus } = statusSlice.actions;

export default statusSlice.reducer;
