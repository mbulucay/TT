import React from "react";
import ShippingMap from "./ShippingMap";
import {
  FaPlusCircle,
} from "react-icons/fa";

function Shipping() {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="flex relative w-full h-14 ring-2 ring-white
      rounded-3xl bg-gradient-to-r from-blue-400 via-blue-900 to-blue-400 z-10"
      >
        <div className="flex justify-start items-center gap-5 w-full p-8 ring-2 bg-gradient-to-b from-blue-700 to-blue-200 rounded-lg">
          {/* <button
            className={`flex place-items-center gap-2 h-fit bg-blue-100 hover:bg-blue-600 transition duration-200 text-blue-900 hover:text-blue-100 py-1 px-3 border-1 border-blue-500 hover:border-transparent rounded`}
          >
            <FaPlusCircle fontSize={18} />
            <span className="hidden md:flex">Add Routes</span>
          </button> */}
          <span className="flex-grow"></span>
          <span className="block tracking-wide text-white text-xl font-bold mb-1 text-left ml-2">
            Routes
          </span>
        </div>
      </div>
      <div className="h-96 w-full md:h-192 md:w-full flex justify-center items-center mt-7 translate-y-8 translate-x-6">
        <ShippingMap />
      </div>

      {/* <div className="h-96 w-full md:h-96 md:w-11/12 ring-4 ring-blue-900 
      bg-gradient-to-r from-blue-400 via-blue-900 to-blue-400 rounded-3xl mt-4 flex justify-center items-center">
        <div className="grid h-7/8 w-7/8 mt-2 bg-white">
          <ShippingMap />
        </div>
      </div> */}
    </div>
  );
}

export default Shipping;
