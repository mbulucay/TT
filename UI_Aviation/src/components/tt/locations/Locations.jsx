import React from "react";
import LocationList from "./LocationList";
import HeaderComponent from "./HeaderComponent";

function Locations() {
  return (
    <div className="">
      {/* <div className="relative z-10">
        <HeaderComponent />
      </div> */}
      <div className="relative z-10">
        <LocationList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">
        The Aviation Locations Application enables operators to access
        information about aviation locations and routes to support enhanced
        Aviation Situational Awareness.
      </div>
    </div>
  );
}

export default Locations;
