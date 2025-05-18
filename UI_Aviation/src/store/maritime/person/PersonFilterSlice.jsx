import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  gender: "",
  age: 0,
  country: "",
  surname: "",
  identification_number: 0,
  job: "",
};

export const PersonFilterSlice = createSlice({
  name: "person_filter",
  initialState,
  reducers: {
    personFilterReset: (state) => {
      state.name = "";
      state.gender = "";
      state.age = 0;
      state.country = "";
      state.surname = "";
      state.identification_number = 0;
      state.job = "";
    },

    personFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { personFilterReset, personFilterAssign } =
  PersonFilterSlice.actions;

export default PersonFilterSlice.reducer;
