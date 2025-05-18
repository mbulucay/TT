import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { ihsSetActive } from "../../../store/maritime/ihs/IhsActiveSlice";

const activeButtonClasses = `flex place-items-center gap-2 mt-3 justify-center
bg-blue-200 transition duration-100 text-blue-600 
py-1 px-3 border-1 border-blue-500 font-semibold
border-transparent rounded-t-3xl rounded-b`;

const deactiveButtonClasses = `flex place-items-center gap-2 mt-4 justify-center
bg-blue-400 transition duration-200 text-blue-100  
py-1 px-3 border-1 border-blue-500 font-semibold
rounded-t-3xl rounded-b`;

function HeaderComponent() {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.ihs_active);

  useEffect(() => {
    dispatch(ihsSetActive("data"));
  }, []);

  return (
    // <div className="flex justify-between absolute -translate-y-full gap-2 w-full mt-12 p-1 bg-gradient-to-r from-transparent via-blue-100 to-white z-2">
    <div
      className="flex justify-end gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2"
    >
      <div className="ml-5 flex flex-1">
        <button
          className={`${active === "data" ? activeButtonClasses : deactiveButtonClasses}`}
          onClick={() => dispatch(ihsSetActive("data"))}
        >
          <span className={`hidden md:flex no-underline`}>Data</span>
        </button>
        <button
          className={`${active === "person" ? activeButtonClasses : deactiveButtonClasses}`}
          onClick={() => dispatch(ihsSetActive("person"))}
        >
          <span>{/* <TiTick fontSize={18} /> */}</span>
          <span className={`hidden md:flex no-underline`}>
            Owner/Manager/Crew
          </span>
        </button>
        <button
          className={`${active === "company" ? activeButtonClasses : deactiveButtonClasses}`}
          onClick={() => dispatch(ihsSetActive("company"))}
        >
          <span>{/* <TiTick fontSize={18} /> */}</span>
          <span className={`hidden md:flex no-underline`}>Company</span>
        </button>
        <button
          className={`${active === "vessel" ? activeButtonClasses : deactiveButtonClasses}`}
          onClick={() => dispatch(ihsSetActive("vessel"))}
        >
          <span>{/* <TiTick fontSize={18} /> */}</span>
          <span className={`hidden md:flex no-underline`}>Vessels</span>
        </button>
        <button
          className={`${active === "port" ? activeButtonClasses : deactiveButtonClasses}`}
          onClick={() => dispatch(ihsSetActive("port"))}
        >
          <span>{/* <TiTick fontSize={18} /> */}</span>
          <span className={`hidden md:flex no-underline`}>Ports</span>
        </button>
      </div>

      {/* <div className="mr-32 place-items-center grid mt-4">
        <TopBar className="" />
      </div> */}
    </div>
  );
}

export default HeaderComponent;
