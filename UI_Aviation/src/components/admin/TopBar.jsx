import React, { Fragment } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";

const buttonClasses = `flex place-items-center gap-2 
bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900
hover:bg-gradient-to-br focus:shadow-outline focus:outline-none
py-2 transition duration-200
px-3 border-1 border-blue-500
hover:border-transparent rounded-xl`;

function TopBar({ setContent }) {
  return (
    <div className="flex justify-between w-full h-20 bg-blue-900 rounded-t-3xl">
      <div className="flex gap-4 items-center ml-12">
        {/* <MdDashboard /> */}
        <button
          onClick={() => setContent("dashboard")}
          className={`${buttonClasses}`}
        >
          <span className="text-2xl text-white font-bold ">
            <MdDashboard />
          </span>
          <span className="text-2xl text-white font-bold ">Dashboard</span>
        </button>

        <button
          onClick={() => setContent("analysis")}
          className={`${buttonClasses}`}
        >
          <span className="text-2xl text-white font-bold ">
            <HiDocumentReport />
          </span>
          <span className="text-2xl text-white font-bold ">Analysis</span>
        </button>

        <button
          onClick={() => setContent("users")}
          className={`${buttonClasses}`}
        >
          <span className="text-2xl text-white font-bold ">
            <FaUsers />
          </span>
          <span className="text-2xl text-white font-bold ">Users</span>
        </button>
      </div>
      <div className="flex place-self-center mr-24">
        <span className="text-2xl text-white  font-bold ">
          Blue Book System Dashboard Panel
        </span>
      </div>
    </div>
  );
}

export default TopBar;
