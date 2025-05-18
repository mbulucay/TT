import React, { useState, useMemo, useEffect } from "react";
import TopBar from "./TopBar";
import { BiReset } from "react-icons/bi";
import {
  personFilterAssign,
  personFilterReset,
} from "../../../store/maritime/person/PersonFilterSlice";
import { useDispatch, useSelector } from "react-redux";

function HeaderComponent() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.person_filter);

  const filter_topic = useMemo(() => {
    return {
      Name: { id: "name_filter", topic: "Name" },
      Surname: { id: "surname_filter", topic: "Surname" },
      Country: { id: "country_filter", topic: "Country" },
      Gender: { id: "gender_filter", topic: "Gender" },
      Age: { id: "age_filter", topic: "Age" },
      Job: { id: "job_filter", topic: "Job" },
      Id: { id: "id_filter", topic: "Id" },
    };
  }, []);

  return (
    <div
      className="flex justify-around gap-2 w-full p-1 
  bg-gradient-to-b from-blue-800 via-blue-500 to-blue-300
   rounded-t-3xl z-2 shadow-blue-950 shadow-2xl z-2"
    >
      <div
        id="filterArea"
        className="ml-16 mr-20 flex gap-4 rounded-xl drop-shadow-2xl"
      >
        <InputArea
          filter={filter_topic["Name"]}
          value={filter.name}
          onChange={(e) => {
            dispatch(
              personFilterAssign({
                name: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Surname"]}
          value={filter.surname}
          onChange={(e) => {
            dispatch(
              personFilterAssign({
                surname: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Country"]}
          value={filter.country}
          onChange={(e) => {
            dispatch(
              personFilterAssign({
                country: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Gender"]}
          value={filter.gender}
          onChange={(e) => {
            dispatch(
              personFilterAssign({
                gender: e.target.value,
              })
            );
          }}
        />
        <InputArea
          filter={filter_topic["Job"]}
          value={filter.job}
          onChange={(e) => {
            dispatch(
              personFilterAssign({
                job: e.target.value,
              })
            );
          }}
        />
        <button
          className={`flex place-items-center gap-2 h-8 px-2 mt-4 bg-blue-700/100 hover:bg-blue-500/100 transition duration-200 
          text-white hover:text-blue-100  border-1 border-blue-500/100 hover:border-transparent rounded`}
          onClick={() => {
            dispatch(personFilterReset());
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
