import React from "react";
import TopBar from "./TopBar";
import PortList from "./PortList";
import HeaderComponent from "./HeaderComponent";

function Ports() {
  return (
    <div className="">
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <PortList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">
        The World Port Index contains a tabular listing of thousands of ports
        throughout the world (approximately 64,000 entries) describing their
        location, characteristics, known facilities, and available services. The
        table is arranged geographically, with an alphabetical index
      </div>
    </div>
  );
}

export default Ports;
