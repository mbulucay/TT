import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  country: "",
  postcode: "",
  imo: "",
};

export const OrganizationFilterSlice = createSlice({
  name: "organizations_filter",
  initialState,
  reducers: {
    organizationFilterReset: (state) => {
      state.name = "";
      state.country = "";
      state.postcode = "";
      state.imo = "";
    },

    organizationFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { organizationFilterReset, organizationFilterAssign } =
  OrganizationFilterSlice.actions;

export default OrganizationFilterSlice.reducer;
