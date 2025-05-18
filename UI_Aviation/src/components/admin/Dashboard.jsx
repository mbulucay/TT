import React, { useEffect } from "react";
import Health from "./subcomponents/Health";
import ApplicationCard from "./subcomponents/ApplicationCard";
import JvmCard from "./subcomponents/JvmCard";
import ProcessCard from "./subcomponents/ProcessCard";
import SystemCard from "./subcomponents/SystemCard";
import {
  HttpStatusCard200,
  HttpStatusCard400,
  HttpStatusCard403,
  HttpStatusCard404,
  HttpStatusCards,
} from "./subcomponents/HttpStatusCard";
import RequestsTable from "./subcomponents/RequestsTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Dashboard() {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-full bg-sky-200  px-4 pb-4">
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full 
        h-fit mt-3 bg-sky-400/50 rounded-lg 
        ring-2 ring-blue-600 p-3"
        >
          <div className="flex flex-col gap-4 w-full  rounded-2xl">
            <ProcessCard />
            <SystemCard />
          </div>
          <div className="flex flex-col gap-4 w-full  rounded-2xl">
            <ApplicationCard />
            <JvmCard />
          </div>
          <div className="flex flex-col w-full rounded-2xl gap-4">
            <div className="w-full h-fit rounded-lg shadow-lg bg-blue-200 hover:scale-105 duration-200">
              <Health />
            </div>
            <div className="w-full  rounded-lg">{/* <Health /> */}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-sky-400/50 rounded-lg mt-4 ring-2 ring-blue-600 p-3">
          <HttpStatusCards />
          <div className="flex-grow grid grid-cols-1 gap-4 md:grid-cols-1 w-full mt-2">
            <RequestsTable />
          </div>
        </div>
      </div>

      <div className="flex-grow"></div>

      {/*  <div className="grid grid-rows-3 grid-flow-col gap-3 w-full h-full mt-3 bg-blue-200/50 rounded-3xl">
        <div className="row-span-3 rounded-2xl duration-500 bg-green-200"></div>
        <div className="col-span-2 h-56  rounded-2xl duration-500 bg-yellow-200"></div>
        <div className="row-span-2 col-span-1 rounded-2xl duration-500 bg-orange-400">
          <Health />
        </div>
        <div className="row-span-2 col-span-1 rounded-2xl duration-500 bg-blue-400">
          <Health />
        </div>
      </div> */}

      {/* <div className="w-full h-56 mt-3 rounded-2xl hover:scale-150 duration-500 bg-sky-500"></div> */}
    </div>
  );
}

export default Dashboard;
