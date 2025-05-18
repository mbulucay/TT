import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipimo: null,
  organizationimo: null,
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

export const OrganizationVesselRelationSlice = createSlice({
  name: "organization_vessel_relation",
  initialState,
  reducers: {
    organizationVesselRelationReset: (state) => {
      state.shipimo = 0;
      state.organizationimo = 0;
      state.start_date = null;
      state.end_date = null;
      state.active = false;
      state.add_clicked = false;
      state.remove_clicked = false;
      state.update_clicked = false;
      state.delete_dialog_open = false;
      state.update_dialog_open = false;
      state.action_id = null;
    },
    organizationVesselRealtionAssign: (state, action) => {
      Object.assign(state, action.payload);
    },
    organizationVesselRelationActive: (state) => {
      state.active = true;
    },
    organizationVesselRelationDeactive: (state) => {
      state.active = false;
    },
    organizationVesselRelationAddClicked: (state) => {
      state.add_clicked = true;
    },
    organizationVesselRelationRemoveClicked: (state) => {
      state.remove_clicked = true;
    },
    organizationVesselRelationUpdateClicked: (state) => {
      state.update_clicked = true;
    },
    organizationVesselRelationDisableAddClicked: (state) => {
      state.add_clicked = false;
    },
    organizationVesselRelationDisableRemoveClicked: (state) => {
      state.remove_clicked = false;
    },
    organizationVesselRelationDisableUpdateClicked: (state) => {
      state.update_clicked = false;
    },
    organizationVesselRelationOpenDeleteDialog: (state) => {
      state.delete_dialog_open = true;
    },
    organizationVesselRelationCloseDeleteDialog: (state) => {
      state.delete_dialog_open = false;
    },
    organizationVesselRelationOpenUpdateDialog: (state) => {
      state.update_dialog_open = true;
    },
    organizationVesselRelationCloseUpdateDialog: (state) => {
      state.update_dialog_open = false;
    },
  },
});

export const {
  organizationVesselRelationReset,
  organizationVesselRealtionAssign,
  organizationVesselRelationActive,
  organizationVesselRelationDeactive,
  organizationVesselRelationAddClicked,
  organizationVesselRelationRemoveClicked,
  organizationVesselRelationUpdateClicked,
  organizationVesselRelationDisableAddClicked,
  organizationVesselRelationDisableRemoveClicked,
  organizationVesselRelationDisableUpdateClicked,
  organizationVesselRelationOpenDeleteDialog,
  organizationVesselRelationCloseDeleteDialog,
  organizationVesselRelationOpenUpdateDialog,
  organizationVesselRelationCloseUpdateDialog,
} = OrganizationVesselRelationSlice.actions;

export default OrganizationVesselRelationSlice.reducer;
