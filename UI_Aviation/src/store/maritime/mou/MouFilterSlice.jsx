import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imo: "",
  flag: "",
  start_date: null,
  end_date: null,
};

export const MouFilterSlice = createSlice({
  name: "mou_filter",
  initialState,
  reducers: {
    mouFilterReset: (state) => {
      state.imo = "";
      state.flag = "";
      state.start_date = null;
      state.end_date = null;
    },

    mouFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { mouFilterReset, mouFilterAssign } = MouFilterSlice.actions;

export default MouFilterSlice.reducer;
