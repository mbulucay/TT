import { configureStore } from "@reduxjs/toolkit";
import PortFilterReducer from "./maritime/ports/PortFilterSlice";
import MscFilterReducer from "./maritime/msc/MscFilterSlice";
import MouFilterReducer from "./maritime/mou/MouFilterSlice";
import OrganizationFilterReducer from "./maritime/organizations/OrganizationFilterSlice";
import PersonFilterReducer from "./maritime/person/PersonFilterSlice";
import authReducer from "./user/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
