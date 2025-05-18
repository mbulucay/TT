import React, { useEffect } from "react";
import {
  FaPlusCircle,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { exportJsonData } from "../../../../lib/file_operations/file_operations";

const buttonClasses = `flex place-items-center gap-2 
bg-blue-100 hover:bg-blue-600
transition duration-200 text-blue-900 hover:text-blue-100 
py-1 px-3 border-1 border-blue-500
hover:border-transparent rounded`;

function TopBar() {
  const { selectedRows } = useSelector((state) => state.select_rows);

  useEffect(() => {}, [selectedRows]);

  return (
    <div className="flex gap-3">
      <Link to={"add"} className={`${buttonClasses}`}>
        <span>
          <FaPlusCircle fontSize={18} />
        </span>
        <span className={`hidden md:flex no-underline`}>Add</span>
      </Link>

      <button
        className={`${buttonClasses}`}
        onClick={() =>
          exportJsonData("person_vessel_relation.json", selectedRows)
        }
      >
        <FaArrowAltCircleDown fontSize={18} />
        <span className="hidden md:flex">Export</span>
      </button>

      <button className={`${buttonClasses}`}>
        <FaArrowAltCircleUp fontSize={18} />
        <span className="hidden md:flex">Import</span>
      </button>
    </div>
  );
}

export default TopBar;
