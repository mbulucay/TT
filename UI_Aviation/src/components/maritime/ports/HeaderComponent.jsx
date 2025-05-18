import React, { useState, useMemo, useEffect } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import {
  portFilterAssign,
  portFilterReset,
} from "../../../store/maritime/ports/PortFilterSlice";
import { useDispatch, useSelector } from "react-redux";

function HeaderComponent() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.port_filter);

  const filter_topic = useMemo(() => {
    return {
      Name: { id: "name_filter", topic: "Name" },
      Country: { id: "country_filter", topic: "Country" },
      Region: { id: "region_filter", topic: "Region" },
      Type: { id: "type_filter", topic: "Type" },
      Size: { id: "size_filter", topic: "Size" },
    };
  }, []);

  return (
    // <div className="flex justify-between absolute -translate-y-full gap-2 w-full mt-12 p-1 bg-gradient-to-r from-transparent via-blue-100 to-white z-2">
    <div className="flex justify-around gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2">
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      >
        <InputArea
          filter={filter_topic["Name"]}
          value={filter.name}
          onChange={(e) => {
            dispatch(
              portFilterAssign({
                name: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Country"]}
          value={filter.country}
          onChange={(e) => {
            dispatch(
              portFilterAssign({
                country: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Region"]}
          value={filter.region}
          onChange={(e) => {
            dispatch(
              portFilterAssign({
                region: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Type"]}
          value={filter.type}
          onChange={(e) => {
            dispatch(
              portFilterAssign({
                type: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Size"]}
          value={filter.size}
          onChange={(e) => {
            dispatch(
              portFilterAssign({
                size: e.target.value,
              })
            );
          }}
        />
        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-700/100 hover:bg-blue-500/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            dispatch(portFilterReset());
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
  const { id, topic } = filter; // Destructure filter object here
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
