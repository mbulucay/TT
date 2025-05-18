import React, { useMemo } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  personQueryFilterAssign,
  personQueryFilterReset,
} from "../../../../../store/maritime/VesselPersonRelation/PersonQueryFilterSlice";

function HeaderComponent() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.person_query_filter);

  const filter_topic = useMemo(() => {
    return {
      PersonName: { id: "person_name_filter", topic: "Person Name" },
      PersonSurname: { id: "person_surname_filter", topic: "Person Surname" },
      Identification: { id: "identification_filter", topic: "Identification" },
      Imo: { id: "imo_filter", topic: "Imo" },
      RelationType: { id: "relation_type_filter", topic: "Relation Type" },
    };
  }, []);

  return (
    <div
      className="flex justify-start gap-2 w-full p-1 
    bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
     rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2"
    >
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      >

        <div id={filter_topic["Imo"].id} className="hidden md:block flex-1">
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["Imo"].topic}
          </label>
          <input
            id={filter_topic["Imo"].id}
            name={filter_topic["Imo"].topic}
            className="appearance-none block w-48 bg-gray-50 text-gray-700 border rounded py-2 px-3 
            leading-tight focus:outline-none focus:bg-white 
            hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["Imo"].topic} Filter`}
            value={filter.imo}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                personQueryFilterAssign({
                  imo: e.target.value,
                })
              );
            }}
          />
        </div>

       {/*  <div
          id={filter_topic["RelationType"].id}
          className="hidden md:block flex-1"
        >
          <label className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
            {filter_topic["RelationType"].topic}
          </label>
          <input
            id={filter_topic["RelationType"].id}
            name={filter_topic["RelationType"].topic}
            className="appearance-none block w-48 bg-gray-50 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white hover:ring-1 hover:ring-blue-500"
            type="text"
            placeholder={`${filter_topic["RelationType"].topic} Filter`}
            value={filter.relation_type}
            // onChange={(e) => setter((prev) => e.target.value)}
            onChange={(e) => {
              dispatch(
                personQueryFilterAssign({
                  relation_type: e.target.value,
                })
              );
            }}
          />
        </div> */}

        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-700/100 hover:bg-blue-500/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            dispatch(personQueryFilterReset());
          }}
        >
          <BiReset fontSize={18} color="blue" className="bg-white rounded" />
          {/* <span className="hidden md:flex">Reset</span> */}
        </button>
      </div>

      {/* <div className="mr-36 grid mt-4">
        <TopBar className="" />
      </div> */}
    </div>
  );
}

export default HeaderComponent;
