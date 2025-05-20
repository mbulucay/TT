import React from "react";
import {
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const buttonClasses = `flex place-items-center gap-2 
  bg-blue-100 hover:bg-blue-600
  transition duration-200 text-blue-900 hover:text-blue-100 
  py-1 px-3 border-1 border-blue-500
  hover:border-transparent rounded `;

function TopBar() {

  return (
    <div className="flex justify-end gap-3">
        <Link to={"add"} className={`${buttonClasses} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
          <span>
            <FaPlusCircle fontSize={18} />
          </span>
          <span className={`hidden md:flex no-underline text-white font-bold`}>Add</span>
        </Link>
    </div>
  );
}

export default TopBar; 