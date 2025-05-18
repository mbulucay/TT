import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route_record_state: false,
  route: [],
};

export const ShippingRouteSlice = createSlice({
  name: "shipping_route",
  initialState,
  reducers: {
    startRecord(state) {
      state.route_record_state = true;
    },
    stopRecord(state, action) {
      state.route_record_state = false;
    },
    addNewCoordinate(state, action) {
      const { payload } = action;
      return {
        ...state,
        route: [...state.route, payload],
      };
    },
    resetRoute(state) {
      return {
        ...state,
        route: [],
      };
    },
  },
});

export const { startRecord, stopRecord, addNewCoordinate, resetRoute } =
  ShippingRouteSlice.actions;

export default ShippingRouteSlice.reducer;
