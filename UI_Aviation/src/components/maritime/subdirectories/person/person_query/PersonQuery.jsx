import React, { useEffect } from "react";
import QueryTab from "./QueryTab";
import QueryTable from "./QueryTable";
import { useSelector } from "react-redux";
import { vesselPersonRelationReset } from "../../../../../store/maritime/VesselPersonRelation/VesselPersonRelationSlice";
import { useDispatch } from "react-redux";

function PersonQuery() {
  const { identification_number, start_date, end_date, active } = useSelector(
    (state) => state.vessel_person_relation
  );
  const dispatch = useDispatch();

  useEffect(() => {}, [identification_number, start_date, end_date]);

  useEffect(() => {
    return () => {
      dispatch(vesselPersonRelationReset());
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <QueryTab />
      {active && <QueryTable />}
      <div className="bg-blue-100 p-2">Query the person maritime records.</div>
    </div>
  );
}

export default PersonQuery;
