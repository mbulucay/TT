import { configureStore } from "@reduxjs/toolkit";
import PortFilterReducer from "./maritime/ports/PortFilterSlice";
import MscFilterReducer from "./maritime/msc/MscFilterSlice";
import MouFilterReducer from "./maritime/mou/MouFilterSlice";
import OrganizationFilterReducer from "./maritime/organizations/OrganizationFilterSlice";
import PersonFilterReducer from "./maritime/person/PersonFilterSlice";
import PortActionReducer from "./maritime/ports/PortActionSlice";
import OrganizationActionReducer from "./maritime/organizations/OrganizationActionSlice";
import MouActionReducer from "./maritime/mou/MouActionSlice";
import MscActionReducer from "./maritime/msc/MscActionSlice";
import PersonActionReducer from "./maritime/person/PersonActionSlice";
import ShippingRouteReducer from "./maritime/shipping/ShippingRouteSlice";
import SelectRowsReducer from "./maritime/SelectRowsSlice";
import IhsActiveReducer from "./maritime/ihs/IhsActiveSlice";
import PersonQueryFilterReducer from "./maritime/VesselPersonRelation/PersonQueryFilterSlice";
import PersonQueryReducer from "./maritime/VesselPersonRelation/VesselPersonRelationSlice";
import OrganizationVesselRelationReducer from "./maritime/OrganizationVesselRelation/OrganizationVesselRelationSlice";
import authReducer from "./user/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    select_rows: SelectRowsReducer,

    port_filter: PortFilterReducer,
    msc_filter: MscFilterReducer,
    organizations_filter: OrganizationFilterReducer,
    mou_filter: MouFilterReducer,
    person_filter: PersonFilterReducer,

    port_action: PortActionReducer,
    organization_action: OrganizationActionReducer,
    mou_action: MouActionReducer,
    msc_action: MscActionReducer,
    person_action: PersonActionReducer,

    ihs_active: IhsActiveReducer,

    vessel_person_relation: PersonQueryReducer,
    person_query_filter: PersonQueryFilterReducer,

    organization_vessel_relation: OrganizationVesselRelationReducer,

    shipping_route: ShippingRouteReducer,
  },
});

export default store;
