import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: {
    id: 0,
    ship_type: "",
    flag_name: "",
    alpha_twocode: "",
    source_name: "",
    imo: 0,
    mmsi: 0,
    callsign: "",
    ship_name: "",
    years_of_build: 0,
    width: 0.0,
    length: 0.0,
    deadweight: 0.0,
    gross_tonnage: 0,
    images: "",
  },
  isEditVisible: false,
  isDeleteVisible: false,
};

export const MscActionSlice = createSlice({
  name: "msc_action",
  initialState,
  reducers: {
    closeMscEdit(state) {
      state.isEditVisible = false;
    },
    openMscEdit(state, action) {
      state.isEditVisible = true;
    },
    closeMscDelete(state) {
      state.isDeleteVisible = false;
    },
    openMscDelete(state, action) {
      state.isDeleteVisible = true;
    },
    setFormData(state, action) {
      const { payload } = action;
      return {
        ...state,
        rowData: {
          ...state.rowData,
          id: payload.id || 0,
          ship_type: payload.ship_type || "",
          flag_name: payload.flag_name || "",
          alpha_twocode: payload.alpha_twocode || "",
          source_name: payload.source_name || "",
          imo: payload.imo || 0,
          mmsi: payload.mmsi || 0,
          callsign: payload.callsign || "",
          ship_name: payload.ship_name || "",
          years_of_build: payload.years_of_build || 0,
          width: payload.width || 0.0,
          length: payload.length || 0.0,
          deadweight: payload.deadweight || 0.0,
          gross_tonnage: payload.gross_tonnage || 0,
          images: payload.images || "",
        },
      };
    },
    resetFormData(state) {
      return {
        ...state,
        rowData: {
          id: 0,
          ship_type: "",
          flag_name: "",
          alpha_twocode: "",
          source_name: "",
          imo: 0,
          mmsi: 0,
          callsign: "",
          ship_name: "",
          years_of_build: 0,
          width: 0.0,
          length: 0.0,
          deadweight: 0.0,
          gross_tonnage: 0,
          images: "",
        },
      };
    },
    mscFormDataAssign: (state, action) => {
      Object.assign(state.rowData, action.payload);
    },
  },
});

export const {
  closeMscEdit,
  openMscEdit,
  closeMscDelete,
  openMscDelete,
  setFormData,
  resetFormData,
  mscFormDataAssign,
} = MscActionSlice.actions;

export default MscActionSlice.reducer;
