import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: {
    id: 0,
    companyName: "",
    country_name: "",
    companyImo: 0,
    headquarters: "",
    number_of_employees: 0,
    postal_code: "",
    mail: "",
    website: "",
    telephone: "",
    address: "",
    typeof_organization: "",
    activity_areas: "",
  },
  isEditVisible: false,
  isDeleteVisible: false,
};

export const OrganizationActionSlice = createSlice({
  name: "organization_action",
  initialState,
  reducers: {
    closeOrganizationEdit(state) {
      state.isEditVisible = false;
    },
    openOrganizationEdit(state, action) {
      state.isEditVisible = true;
    },
    closeOrganizationDelete(state) {
      state.isDeleteVisible = false;
    },
    openOrganizationDelete(state, action) {
      state.isDeleteVisible = true;
    },
    setFormData(state, action) {
      const { payload } = action;
      return {
        ...state,
        rowData: {
          id: payload.id || 0,
          companyName: payload.companyName || "",
          country_name: payload.country_name || "",
          companyImo: payload.companyImo || 0,
          headquarters: payload.headquarters || "",
          number_of_employees: payload.number_of_employees || 0,
          postal_code: payload.postal_code || "",
          mail: payload.mail || "",
          website: payload.website || "",
          telephone: payload.telephone || "",
          address: payload.address || "",
          typeof_organization: payload.typeof_organization || "",
          activity_areas: payload.activity_areas || "",
        },
      };
    },
    resetFormData(state) {
      return {
        ...state,
        rowData: {
          id: 0,
          name: "",
          country_name: "",
          companyImo: 0,
          headquarters: "",
          number_of_employees: 0,
          postal_code: "",
          mail: "",
          website: "",
          telephone: "",
          address: "",
          typeof_organization: "",
          activity_areas: "",
        },
      };
    },
    organizationFormDataAssign: (state, action) => {
      Object.assign(state.rowData, action.payload);
    },
  },
});

export const {
  closeOrganizationEdit,
  openOrganizationEdit,
  closeOrganizationDelete,
  openOrganizationDelete,
  setFormData,
  resetFormData,
  organizationFormDataAssign,
} = OrganizationActionSlice.actions;

export default OrganizationActionSlice.reducer;
