import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  imo: "",
  mmsi: "",
  callsign: "",
  type: "",
  flag: "",
};

export const MscFilterSlice = createSlice({
  name: "msc_filter",
  initialState,
  reducers: {
    mscFilterReset: (state) => {
      state.name = "";
      state.imo = "";
      state.mmsi = "";
      state.callsign = "";
      state.type = "";
      state.flag = "";
    },

    mscFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
    // dispatch(MscFilterSlice.actions.mscFilterAssign({ name: 'NewName' }));
  },
});

export const { mscFilterReset, mscFilterAssign } = MscFilterSlice.actions;

export default MscFilterSlice.reducer;
