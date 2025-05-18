import React from "react";
import CrewQueryList from "./CrewQueryList";
import HeaderComponent from "./HeaderComponent";

function QueryTable() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <CrewQueryList />
      </div>
    </div>
  );
}

export default QueryTable;
