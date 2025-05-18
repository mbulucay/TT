import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: {
    id: 0,
    portname: "",
    countryname: "",
    address: "",
    port_type: "",
    port_size: "",
    countrycode: "",
    telephone: "",
    terminal: "",
    email: "",
    port_auth: "",
    coordinates: "",
    latitude: 0.0,
    longitude: 0.0,
    unlocode: "",
    region: "",
  },
  isEditVisible: false,
  isDeleteVisible: false,
};

export const PortActionSlice = createSlice({
  name: "port_action",
  initialState,
  reducers: {
    closePortEdit(state) {
      state.isEditVisible = false;
    },
    openPortEdit(state, action) {
      state.isEditVisible = true;
    },
    closePortDelete(state) {
      state.isDeleteVisible = false;
    },
    openPortDelete(state, action) {
      state.isDeleteVisible = true;
    },
    setFormData(state, action) {
      const { payload } = action;
      return {
        ...state,
        rowData: {
          ...state.rowData,

          id: payload.id || 0,
          portname: payload.portname || "",
          countryname: payload.countryname || "",
          address: payload.address || "",
          port_type: payload.port_type || "",
          port_size: payload.port_size || "",
          countrycode: payload.countrycode || "",
          telephone: payload.telephone || "",
          terminal: payload.terminal || "",
          email: payload.email || "",
          port_auth: payload.port_auth || "",
          coordinates: payload.coordinates || "",
          latitude: payload.latitude || 0.0,
          longitude: payload.longitude || 0.0,
          unlocode: payload.unlocode || "",
          region: payload.region || "",
        },
      };
    },
    resetFormData(state) {
      return {
        ...state,
        rowData: {
          id: 0,
          portname: "",
          countryname: "",
          address: "",
          port_type: "",
          port_size: "",
          countrycode: "",
          telephone: "",
          terminal: "",
          email: "",
          port_auth: "",
          coordinates: "",
          latitude: 0.0,
          longitude: 0.0,
          unlocode: "",
          region: "",
        },
      };
    },
    portFormDataAssign: (state, action) => {
      Object.assign(state.rowData, action.payload);
    },
  },
});

export const {
  closePortEdit,
  openPortEdit,
  closePortDelete,
  openPortDelete,
  setFormData,
  resetFormData,
  portFormDataAssign,
} = PortActionSlice.actions;

export default PortActionSlice.reducer;
