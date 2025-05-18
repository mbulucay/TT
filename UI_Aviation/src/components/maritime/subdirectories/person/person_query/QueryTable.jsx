import React from "react";
import PersonQueryList from "./PersonQueryList";
import HeaderComponent from "./HeaderComponent";

function QueryTable() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <PersonQueryList />
      </div>
    </div>
  );
}

export default QueryTable;
