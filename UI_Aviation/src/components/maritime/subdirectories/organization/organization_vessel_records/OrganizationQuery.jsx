import React, { useEffect } from "react";
import QueryTab from "./QueryTab";
import QueryTable from "./QueryTable";
import { useSelector, useDispatch } from "react-redux";
import { organizationVesselRelationReset } from "../../../../../store/maritime/OrganizationVesselRelation/OrganizationVesselRelationSlice";

function OrganizationQuery() {
  const { active } = useSelector((state) => state.organization_vessel_relation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(organizationVesselRelationReset());
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <QueryTab />
      {active && <QueryTable />}
      <div className="bg-blue-100 p-2">Query the vessel list for organization.</div>
    </div>
  );
}

export default OrganizationQuery;
