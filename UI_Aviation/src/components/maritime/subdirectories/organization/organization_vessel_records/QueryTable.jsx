import React from "react";
import VesselQueryList from "./VesselQueryList";
import HeaderComponent from "./HeaderComponent";

function QueryTable() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <VesselQueryList />
      </div>
    </div>
  );
}

export default QueryTable;
