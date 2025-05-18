import React, { useMemo } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import {
  mscFilterAssign,
  mscFilterReset,
} from "../../../store/maritime/msc/MscFilterSlice";
import { useDispatch, useSelector } from "react-redux";

function HeaderComponent() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.msc_filter);

  const filter_topic = useMemo(() => {
    return {
      Name: { id: "name_filter", topic: "Name" },
      Imo: { id: "imo_filter", topic: "Imo" },
      Mmsi: { id: "mmsi_filter", topic: "Mmsi" },
      Callsign: { id: "callsign_filter", topic: "Callsign" },
      Type: { id: "type_filter", topic: "Type" },
      Flag: { id: "flag_filter", topic: "Flag" },
    };
  }, []);

  return (
    // <div className="flex justify-between absolute gap-2 w-full p-1 bg-gradient-to-r from-transparent via-blue-100 to-white z-2">
    <div
      className="flex justify-around gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2"
    >
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      >
        <div id={filter_topic["Name"].id} className="flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Name"].topic}
          </label>
          <input
            id={filter_topic["Name"].id}
            name={filter_topic["Name"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Name"].topic} Filter`}
            value={filter.name}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                mscFilterAssign({
                  name: e.target.value,
                })
              );
            }}
          />
        </div>
        <div id={filter_topic["Imo"].id} className="hidden md:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Imo"].topic}
          </label>
          <input
            id={filter_topic["Imo"].id}
            name={filter_topic["Imo"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Imo"].topic} Filter`}
            value={filter.imo}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) =>{
              dispatch(
                mscFilterAssign({
                  imo: e.target.value,
                })
              );
            }}
          />
        </div>

      
        <div id={filter_topic["Mmsi"].id} className="hidden lg:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Mmsi"].topic}
          </label>
          <input
            id={filter_topic["Mmsi"].id}
            name={filter_topic["Mmsi"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Mmsi"].topic} Filter`}
            value={filter.mmsi}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                mscFilterAssign({
                  mmsi: e.target.value,
                })
              );
            }}
          />
        </div>
        <div id={filter_topic["Callsign"].id} className="hidden lg:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Callsign"].topic}
          </label>
          <input
            id={filter_topic["Callsign"].id}
            name={filter_topic["Callsign"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Callsign"].topic} Filter`}
            value={filter.callsign}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                mscFilterAssign({
                  callsign: e.target.value,
                })
              );
            }}
          />
        </div>

        <div id={filter_topic["Type"].id} className="hidden lg:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Type"].topic}
          </label>
          <input
            id={filter_topic["Type"].id}
            name={filter_topic["Type"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Type"].topic} Filter`}
            value={filter.type}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                mscFilterAssign({
                  type: e.target.value,
                })
              );
            }}
          />
        </div>
        <div id={filter_topic["Flag"].id} className="hidden lg:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Flag"].topic}
          </label>
          <input
            id={filter_topic["Flag"].id}
            name={filter_topic["Flag"].topic}
            className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Flag"].topic} Filter`}
            value={filter.flag}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                mscFilterAssign({
                  flag: e.target.value,
                })
              );
            }}
          />
        </div>
        {/*         <InputArea
          filter={filter_topic["Flag"]}
          value={filter.flag}
          onChange={(e) => {
            dispatch(
              mscFilterAssign({
                flag: e.target.value,
              })
            );
          }}
        /> */}

        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-700/100 hover:bg-blue-500/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            dispatch(mscFilterReset());
          }}
        >
          <BiReset fontSize={18} color="blue" className="bg-white rounded" />
          {/* <span className="hidden md:flex">Reset</span> */}
        </button>
      </div>

      <div className="mr-36 grid mt-4">
        <TopBar className="" />
      </div>
    </div>
  );
}

function InputArea({ filter, value, onChange, sendFilter }) {
  const { id, topic } = filter; // Destructure filter object here
  return (
    <div id={id} className="hidden flex-1">
      <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
        {topic}
      </label>
      <input
        id={id}
        name={topic}
        className="appearance-none block w-32 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
        type="text"
        placeholder={`${topic} Filter`}
        value={value}
        // onChange={(e) => setter((prev) => e.target.value)}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default HeaderComponent;
