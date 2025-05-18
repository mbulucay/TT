import React from "react";
import MouList from "./MouList";
import HeaderComponent from "./HeaderComponent";

function Mou() {
  return (
    <div className="">
      <div className="relative z-20">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <MouList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">
        The Memorandum of Understanding (MOU) Detention Lists Application
        enables operators to access, process and manage current and historical
        information about banned and detained vessels
      </div>
    </div>
  );
}

export default Mou;
