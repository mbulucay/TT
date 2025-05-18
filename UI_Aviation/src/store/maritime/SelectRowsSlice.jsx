import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedRows: [] };

const SelectRowsSlice = createSlice({
  name: "select_rows",
  initialState,
  reducers: {
    updateSelectRows(state, action) {
      state.selectedRows = action.payload;
    },
    resetSelectRows(state) {
      return initialState;
    },
  },
});

export const { updateSelectRows, resetSelectRows } = SelectRowsSlice.actions;

export default SelectRowsSlice.reducer;
