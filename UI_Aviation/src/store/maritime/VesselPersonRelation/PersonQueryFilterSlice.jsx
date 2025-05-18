import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person_name: "",
  person_surname: "",
  identification_number: null,
  imo: null,
  relation_type: "",
  start_date: null,
  end_date: null,
  gender: "",
  job: "",
  ship_name: "",
  country: "",
  age: null,
};

export const PersonQueryFilterSlice = createSlice({
  name: "person_query_filter",
  initialState,
  reducers: {
    personQueryFilterReset: (state) => {
      state.person_name = "";
      state.person_surname = "";
      state.identification_number = 0;
      state.imo = 0;
      state.relation_type = "";
      state.start_date = null;
      state.end_date = null;
      state.gender = "";
      state.job = "";
      state.ship_name = "";
      state.country = "";
      state.age = 0;
    },
    personQueryFilterAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { personQueryFilterReset, personQueryFilterAssign } =
  PersonQueryFilterSlice.actions;

export default PersonQueryFilterSlice.reducer;
