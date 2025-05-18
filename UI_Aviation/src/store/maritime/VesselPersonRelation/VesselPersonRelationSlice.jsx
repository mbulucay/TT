import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identificationnumber: null,
  shipimo: null,
  start_date: null,
  end_date: null,
  active: false,
  add_clicked: false,
  remove_clicked: false,
  update_clicked: false,
  delete_dialog_open: false,
  update_dialog_open: false,
  action_id: null,
};

export const VesselPersonRelationSlice = createSlice({
  name: "vessel_person_relation",
  initialState,
  reducers: {
    vesselPersonRelationReset: (state) => {
      state.identificationnumber = 0;
      state.shipimo = 0;
      state.start_date = null;
      state.end_date = null;
      state.active = false;
      state.add_clicked = false;
      state.remove_clicked = false;
      state.update_clicked = false;
      state.action_id = null;
    },
    vesselPersonRelationAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
    vesselPersonRelationActivate: (state) => {
      state.active = true;
    },
    vesselPersonRelationDeactivate: (state) => {
      state.active = false;
    },
    vesselPersonRelationAddClicked: (state) => {
      state.add_clicked = true;
    },
    vesselPersonRelationRemoveClicked: (state) => {
      state.remove_clicked = true;
    },
    vesselPersonRelationUpdateClicked: (state) => {
      state.update_clicked = true;
    },
    vesselPersonRelationDisableAddClicked: (state) => {
      state.add_clicked = false;
    },
    vesselPersonRelationDisableRemoveClicked: (state) => {
      state.remove_clicked = false;
    },
    vesselPersonRelationDisableUpdateClicked: (state) => {
      state.update_clicked = false;
    },
    vesselPersonRelationOpenDeleteDialog: (state) => {
      state.delete_dialog_open = true;
    },
    vesselPersonRelationCloseDeleteDialog: (state) => {
      state.delete_dialog_open = false;
    },
    vesselPersonRelationOpenUpdateDialog: (state) => {
      state.update_dialog_open = true;
    },
    vesselPersonRelationCloseUpdateDialog: (state) => {
      state.update_dialog_open = false;
    },
  },
});

export const {
  vesselPersonRelationReset,
  vesselPersonRelationAssign,
  vesselPersonRelationActivate,
  vesselPersonRelationDeactivate,
  vesselPersonRelationAddClicked,
  vesselPersonRelationRemoveClicked,
  vesselPersonRelationUpdateClicked,
  vesselPersonRelationDisableAddClicked,
  vesselPersonRelationDisableRemoveClicked,
  vesselPersonRelationDisableUpdateClicked,
  vesselPersonRelationOpenDeleteDialog,
  vesselPersonRelationCloseDeleteDialog,
  vesselPersonRelationOpenUpdateDialog,
  vesselPersonRelationCloseUpdateDialog,
} = VesselPersonRelationSlice.actions;

export default VesselPersonRelationSlice.reducer;
