import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Datepicker } from "flowbite-react";
import { SiGooglebigquery } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import {
  vesselPersonRelationReset,
  vesselPersonRelationAssign,
  vesselPersonRelationActivate,
} from "../../../../../store/maritime/VesselPersonRelation/VesselPersonRelationSlice";
import { BiReset } from "react-icons/bi";

function QueryTab() {
  const dispatch = useDispatch();
  const { identification_number, active } = useSelector(
    (state) => state.vessel_person_relation
  );

  useEffect(() => {}, [identification_number]);

  const handleQuery = () => {
    dispatch(vesselPersonRelationActivate());
  };

  return (
    <div>
      <div className="flex justify-around">
        <form className="w-full h-full bg-blue-200 p-2 rounded-3xl mt-2 shadow-2xl">
          {/* First row */}
          <div
            className={`flex flex-wrap ${active ? "justify-center" : "justify-center"}`}
          >
            <div className={`${!active ? "" : "hidden"} w-full md:w-1/3`}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Identification Number
              </label>
              <input
                id="identification_number"
                name="identification_number"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={identification_number}
                onChange={(e) =>
                  dispatch(
                    vesselPersonRelationAssign({
                      identification_number: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="w-fit mt-1 flex items-stretch">
              <Button
                className={`h-fit ml-6 self-center shadow-lg bg-gradient-to-r 
                from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 
                  rounded hover:scale-105
                  ${!active ? "" : "hidden"}`}
                type="button"
                onClick={handleQuery}
              >
                <span className="mr-2">
                  <SiGooglebigquery />
                </span>{" "}
                Query
              </Button>
              <Button
                className={`h-fit ml-6 self-center shadow-lg 
                bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br 
            focus:shadow-outline focus:outline-none 
            text-white font-bold py-2 px-4 rounded hover:scale-105
            ${active ? "" : "hidden"}`}
                type="button"
                onClick={() => {
                  dispatch(vesselPersonRelationReset());
                }}
              >
                <span className="mr-2">
                  <BiReset />
                </span>{" "}
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QueryTab;
