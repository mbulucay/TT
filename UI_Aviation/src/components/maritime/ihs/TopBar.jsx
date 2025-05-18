import React from "react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const buttonClasses = `flex place-items-center gap-2 
bg-blue-100 hover:bg-blue-600
transition duration-200 text-blue-900 hover:text-blue-100 
py-1 px-3 border-1 border-blue-500
hover:border-transparent rounded`;

function TopBar() {
  return (
    <div className="flex gap-3">
      {/* <Link to={"add"} className={`${buttonClasses}`}> */}
      <button className={`${buttonClasses}`}>
        <span>
          <TiTick fontSize={18} />
        </span>
        <span className={`hidden md:flex no-underline`}>Check Correct</span>
      {/* </Link> */}
      </button>
    </div>
  );
}

export default TopBar;
