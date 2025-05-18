import React, { useMemo, useState } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import {
//   locationFilterAssign,
//   locationFilterReset,
// } from "../../../store/tt/locations/LocationFilterSlice";

function HeaderComponent() {
  const dispatch = useDispatch();
//   const filter = useSelector((state) => state.locations_filter);

    const [filter, setFilter] = useState({
        name: "",
        country: "",
        type: "",
        code: "",
    }); 

  const filter_topic = useMemo(() => {
    return {
      Name: { id: "name_filter", topic: "Name" },
      Country: { id: "country_filter", topic: "Country" },
      Type: { id: "type_filter", topic: "Type" },
      Code: { id: "code_filter", topic: "Code" },
    };
  }, []);

  return (
    <div className="flex justify-around gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2">
      <div id="filterArea" className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl">
        <InputArea
          filter={filter_topic["Name"]}
          value={filter.name}
          onChange={(e) => {
            // dispatch(
            //   locationFilterAssign({
            //     name: e.target.value,
            //   })
            // );
          }}
        />
        <InputArea
          filter={filter_topic["Country"]}
          value={filter.country}
          onChange={(e) => {
            // dispatch(
            //   locationFilterAssign({
            //     country: e.target.value,
            //   })
            // );
          }}
        />
        <InputArea
          filter={filter_topic["Type"]}
          value={filter.type}
          onChange={(e) => {
            // dispatch(
            //   locationFilterAssign({
            //     type: e.target.value,
            //   })
            // );
          }}
        />
        <InputArea
          filter={filter_topic["Code"]}
          value={filter.code}
          onChange={(e) => {
            // dispatch(
            //   locationFilterAssign({
            //     code: e.target.value,
            //   })
            // );
          }}
        />
        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-800 hover:bg-blue-600/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            // dispatch(locationFilterReset());
          }}
        >
          <BiReset fontSize={18} color="blue" className="bg-white rounded" />
        </button>
      </div>

      <div className="mr-32 place-items-center grid mt-4">
        <TopBar className="" />
      </div>
    </div>
  );
}

function InputArea({ filter, value, onChange }) {
  const { id, topic } = filter;
  return (
    <div id={id} className="flex-1">
      <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
        {topic}
      </label>
      <input
        id={id}
        name={topic}
        className="appearance-none block w-36 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
        type="text"
        placeholder={`${topic} Filter`}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default HeaderComponent; 