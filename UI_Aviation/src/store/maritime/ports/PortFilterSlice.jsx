import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  country: "",
  region: "",
  type: "",
  size: "",
};

export const PortFilterSlice = createSlice({
  name: "port_filter",
  initialState,
  reducers: {
    portFilterReset: (state) => {
      state.name = "";
      state.country = "";
      state.region = "";
      state.type = "";
      state.size = "";
    },

    portFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
    // dispatch(PortFilterSlice.actions.portFilterAssign({ name: 'NewName' }));
  },
});


export const {portFilterReset, portFilterAssign} = PortFilterSlice.actions

export default PortFilterSlice.reducer