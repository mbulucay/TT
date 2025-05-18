import React from "react";

function HeaderComponent() {

  return (
    <div
      className="flex justify-start gap-2 w-full p-1 h-12
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2"
    >
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      ></div>
    </div>
  );
}

export default HeaderComponent;
