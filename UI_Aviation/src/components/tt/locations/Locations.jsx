import React from "react";
import LocationList from "./LocationList";
import TopBar from "./TopBar";

function Locations() {
  return (
    <div className="">
      <div className="relative z-10">
      <div className="flex justify-between items-center p-4 bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300 rounded-t-3xl z-2 shadow-blue-950 shadow-md z-2">
        <div className="text-white text-2xl font-bold place-items-center">Locations</div>
        <div className="flex items-center gap-2">
          <TopBar />
        </div>
      </div>
      </div>
      <div className="relative">
        <LocationList />
      </div>
      <div className="mt-3 bg-blue-100 p-8 rounded-b-3xl z-1 shadow-blue-950 shadow-2xl z-16">
        The Aviation Locations Application enables operators to access
        information about aviation locations and routes to support enhanced
        Aviation Situational Awareness.
      </div>
    </div>
  );
}

export default Locations;
