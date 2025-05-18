import React from "react";
import RelationList from "./RelationList";
import HeaderComponent from "./HeaderComponent";

function RelationTable() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <RelationList />
      </div>
    </div>
  );
}

export default RelationTable;
