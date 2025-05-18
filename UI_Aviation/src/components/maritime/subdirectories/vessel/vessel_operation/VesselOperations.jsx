import React from "react";
import OperationTab from "./OperationTab";
import RelationTable from "./RelationTable";
import { useSelector } from "react-redux";

function VesselOperations() {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-2">
      {role === "ADMIN" && (<OperationTab />)}
      <RelationTable />
      <div className="bg-blue-100 p-2">Table of vessels that companies own.</div>
    </div>
  );
}

export default VesselOperations;
