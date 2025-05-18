import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  rowData: {
    person_name: "",
    gender: "",
    age: 0,
    country_name: "",
    person_surname: "",
    identification_number: 0,
    job: "",
  },
  isEditVisible: false,
  isDeleteVisible: false,
};

export const PersonActionSlice = createSlice({
  name: "person_action",
  initialState,
  reducers: {
    closePersonEdit(state) {
      state.isEditVisible = false;
    },
    openPersonEdit(state, action) {
      state.isEditVisible = true;
    },
    closePersonDelete(state) {
      state.isDeleteVisible = false;
    },
    openPersonDelete(state, action) {
      state.isDeleteVisible = true;
    },
    setFormData(state, action) {
      const { payload } = action;
      return {
        ...state,
        rowData: {
          ...state.rowData,
          person_name: payload.person_name || "",
          gender: payload.gender || "",
          age: payload.age || 0,
          country_name: payload.country_name || "",
          person_surname: payload.person_surname || "",
          identification_number: payload.identification_number || 0,
          job: payload.job || "",
        },
      };
    },
    resetFormData(state) {
      return {
        ...state,
        rowData: {
          person_name: "",
          gender: "",
          age: 0,
          country_name: "",
          person_surname: "",
          identification_number: 0,
          job: "",
        },
      };
    },
    personFormDataAssign: (state, action) => {
      Object.assign(state.rowData, action.payload);
    },
  },
});

export const {
  closePersonEdit,
  openPersonEdit,
  closePersonDelete,
  openPersonDelete,
  setFormData,
  resetFormData,
  personFormDataAssign,
} = PersonActionSlice.actions;

export default PersonActionSlice.reducer;
