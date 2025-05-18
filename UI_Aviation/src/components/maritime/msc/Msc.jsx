import React from "react";
import MscList from "./MscList";
import HeaderComponent from "./HeaderComponent";

function Msc() {
  return (
    <div className="">
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <MscList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">
        The Merchant Ships Characteristics (MSC) Application
      </div>
    </div>
  );
}

export default Msc;
