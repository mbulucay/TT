import React, { useState, useMemo, useEffect } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import { Datepicker } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  mouFilterAssign,
  mouFilterReset,
} from "../../../store/maritime/mou/MouFilterSlice";
import { Calendar } from "primereact/calendar";

function HeaderComponent({ handleFilter }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.mou_filter);
  const [s_date, setSDate] = useState(null);
  const [e_date, setEDate] = useState(null);

  const filter_topic = useMemo(() => {
    return {
      Imo: { id: "imo_filter", topic: "Imo" },
      Flag: { id: "flag_filter", topic: "Flag" },
      StartDate: { id: "start_date", topic: "StartDate" },
      EndDate: { id: "end_date", topic: "EndDate" },
    };
  }, []);

  useEffect(() => {
  }, [filter]);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // Get full year
    return `${year}-${month}-${day}`;
  }

  const handleStartDate = (e) => {
    setSDate((prev) => e.value);
    dispatch(
      mouFilterAssign({
        start_date: e.target.value !== null ? formatDate(e.target.value) : null,
      })
    );
  };
  const handleEndDate = (e) => {
    setEDate((prev) => e.value);
    dispatch(
      mouFilterAssign({
        end_date: e.target.value !== null ? formatDate(e.target.value) : null,
      })
    );
  };

  return (
    // <div className="md:flex absolute -translate-y-full gap-2 w-full mt-12 p-1 bg-gradient-to-r from-transparent via-blue-100 to-white z-2">
    <div
      className="flex justify-around gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl"
    >
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      >
        <InputArea
          filter={filter_topic["Imo"]}
          value={filter.imo}
          onChange={(e) => {
            dispatch(
              mouFilterAssign({
                imo: e.target.value,
              })
            );
          }}
        />

        <InputArea
          filter={filter_topic["Flag"]}
          value={filter.flag}
          onChange={(e) => {
            dispatch(
              mouFilterAssign({
                flag: e.target.value,
              })
            );
          }}
        />

        <div className="md:flex gap-2 scale-90 -translate-x-10">
          <div className="md:w-3/6">
            <label className="block tracking-wide text-white text-xs font-semibold">
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
          <div className="bg-white mt-3 h-11 w-1 rotate-12"></div>
          <div className="md:w-3/6">
            <label className="block tracking-wide text-white text-xs font-semibold">
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
        </div>

        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-800/100 hover:bg-blue-600/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            setSDate(null);
            setEDate(null);
            dispatch(mouFilterReset());
          }}
        >
          <BiReset fontSize={18} color="blue" className="bg-white rounded" />
        </button>
      </div>
      <div className="mt-72 md:mt-4 mr-24 place-items-center grid">
        <TopBar className="" />
      </div>
    </div>
  );
}

function InputArea({ filter, value, onChange }) {
  const { id, topic } = filter; // Destructure filter object here
  return (
    <div id={id} className="flex-1">
      <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
        {topic}
      </label>
      <input
        id={id}
        name={topic}
        className="appearance-none block w-full md:w-36 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
        type="text"
        placeholder={`${topic} Filter`}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

const customTheme = {
  root: {
    base: "relative mt-1",
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

export default HeaderComponent;
