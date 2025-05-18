import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: {
    id: 0,
    source_name: "",
    company_imo: 0,
    deatiningauthority: "",
    placeofinspectionport: "",
    vesselImo: 0,
    number_of_deficiencies: 0,
    ground_for_detention: 0,
    agreed_repair_yard: "",
    detention_reason: "",
    date_of_detention: "",
    date_of_release: "",
    typeofinspection: "",
    vessel_flag: "",
  },
  isEditVisible: false,
  isDeleteVisible: false,
};

export const MouActionSlice = createSlice({
  name: "mou_action",
  initialState,
  reducers: {
    closeMouEdit(state) {
      state.isEditVisible = false;
    },
    openMouEdit(state, action) {
      state.isEditVisible = true;
    },
    closeMouDelete(state) {
      state.isDeleteVisible = false;
    },
    openMouDelete(state, action) {
      state.isDeleteVisible = true;
    },
    setFormData(state, action) {
      const { payload } = action;
      return {
        ...state,
        rowData: {
          ...state.rowData,
          id: payload.id || 0,
          source_name: payload.source_name || "",
          company_imo: payload.company_imo || 0,
          deatiningauthority: payload.deatiningauthority || "",
          placeofinspectionport: payload.placeofinspectionport || "",
          vesselImo: payload.vesselImo || 0,
          number_of_deficiencies: payload.number_of_deficiencies || 0,
          ground_for_detention: payload.ground_for_detention || 0,
          agreed_repair_yard: payload.agreed_repair_yard || "",
          detention_reason: payload.detention_reason || "",
          date_of_detention: payload.date_of_detention || "",
          date_of_release: payload.date_of_release || "",
          typeofinspection: payload.typeofinspection || "",
          vessel_flag: payload.vessel_flag || "",
        },
      };
    },
    resetFormData(state) {
      return {
        ...state,
        rowData: {
          id: 0,
          source_name: "",
          company_imo: 0,
          deatiningauthority: "",
          placeofinspectionport: "",
          vesselImo: 0,
          number_of_deficiencies: 0,
          ground_for_detention: 0,
          agreed_repair_yard: "",
          detention_reason: "",
          date_of_detention: "",
          date_of_release: "",
          typeofinspection: "",
          vessel_flag: "",
        },
      };
    },
    mouFormDataAssign: (state, action) => {
      Object.assign(state.rowData, action.payload);
    },
  },
});

export const {
  closeMouEdit,
  openMouEdit,
  closeMouDelete,
  openMouDelete,
  setFormData,
  resetFormData,
  mouFormDataAssign,
} = MouActionSlice.actions;

export default MouActionSlice.reducer;
