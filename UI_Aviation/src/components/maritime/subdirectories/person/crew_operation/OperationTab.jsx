import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Datepicker } from "flowbite-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  vesselPersonRelationAssign,
  vesselPersonRelationAddClicked,
} from "../../../../../store/maritime/VesselPersonRelation/VesselPersonRelationSlice";
import { VesselCrewRelationService } from "../../../../../api/services/maritime/vessel_crew_relation/VesselCrewRelationService";
import { Calendar } from "primereact/calendar";

function OperationTab() {
  const dispatch = useDispatch();

  const [s_date, setSDate] = useState(null);
  const [e_date, setEDate] = useState(null);

  const { access_token } = useSelector((state) => state.auth);
  const { identificationnumber, shipimo, start_date, end_date } = useSelector(
    (state) => state.vessel_person_relation
  );

  useEffect(() => {}, [identificationnumber]);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // Get full year
    return `${year}-${month}-${day}`;
  }

  const handleStartDate = (e) => {
    setSDate((prev) => e.value);
    dispatch(
      vesselPersonRelationAssign({
        start_date: (e.target.value !== null) ? formatDate(e.target.value) : null,
      })
    );
  };

  const handleEndDate = (e) => {
    setEDate((prev) => e.value);
    dispatch(
      vesselPersonRelationAssign({
        end_date: (e.target.value !== null) ? formatDate(e.target.value) : null,
      })
    );
  };

  const handleSubmit = async () => {

    try {
      const response = await VesselCrewRelationService.createVesselCrewRelation(
        access_token,
        {
          identificationnumber: identificationnumber,
          shipimo: shipimo,
          start_date: start_date,
          end_date: end_date,
        }
      );
      dispatch(vesselPersonRelationAddClicked());
    } catch (error) {
      console.error("Error creating vessel crew relation:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex justify-around">
        <form className="w-full h-full bg-blue-200 p-2 rounded-3xl mt-2 shadow-2xl">
          {/* First row */}
          <div className="flex flex-wrap justify-around mr-32 font-bold text-blue-900 text-xl">
            Add New Crew Record
          </div>
          <div className={`flex flex-wrap gap-3 ml-6`}>
            <div className={`w-full md:w-1/4`}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Identification Number
              </label>
              <input
                id="identificationnumber"
                name="identificationnumber"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={identificationnumber}
                onChange={(e) =>
                  dispatch(
                    vesselPersonRelationAssign({
                      identificationnumber: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className={`w-full md:w-1/4`}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                shipimo Number
              </label>
              <input
                id="shipimo"
                name="shipimo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={shipimo}
                onChange={(e) =>
                  dispatch(
                    vesselPersonRelationAssign({
                      shipimo: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="w-full md:w-1/6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Date
              </label>
              <div className="card flex justify-content-center">
                <Calendar
                  value={s_date}
                  onChange={handleStartDate}
                  showIcon
                  showButtonBar
                />
              </div>
            </div>
            <div className="w-full md:w-1/6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Date
              </label>
              <div className="card flex justify-content-center">
                <Calendar
                  value={e_date}
                  onChange={handleEndDate}
                  showIcon
                  showButtonBar
                />
              </div>
            </div>
            <div className="w-fit mt-1 flex items-stretch">
              <Button
                className={`h-fit ml-6 self-center shadow-lg bg-gradient-to-r 
            from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
              focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 
              rounded hover:scale-105`}
                type="button"
                onClick={handleSubmit}
              >
                <span className="mr-2">
                  <FaPlusCircle />
                </span>{" "}
                Submit
              </Button>
              {/* <Button
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
              </Button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const customTheme = {
  root: {
    base: "relative mt-3",
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block scale-95",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
    },
    header: {
      base: "",
      title:
        "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "flex justify-between mb-2",
        button: {
          base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    view: {
      base: "p-1",
    },
    footer: {
      base: "flex mt-2 space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300",
        today:
          "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "grid grid-cols-7 mb-1",
        title:
          "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
          selected: "bg-blue-700 text-white hover:bg-blue-600",
          disabled: "text-gray-500",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-blue-700 text-white hover:bg-blue-600",
          disabled: "text-gray-500",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-blue-700 text-white hover:bg-blue-600",
          disabled: "text-gray-500",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-blue-700 text-white hover:bg-blue-600",
          disabled: "text-gray-500",
        },
      },
    },
  },
};

export default OperationTab;
