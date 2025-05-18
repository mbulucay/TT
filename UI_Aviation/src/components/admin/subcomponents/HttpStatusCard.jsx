import React, { useEffect, useState } from "react";
import TraceCard from "./TraceCard";
import { FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaExclamationCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { HttpRequestServices } from "../../../api/services/dashboard/HttpRequestServices";

function HttpStatusCards() {
  const { access_token } = useSelector((state) => state.auth);

  const [count_200, setCount200] = useState(0);
  const [count_400, setCount400] = useState(0);
  const [count_403, setCount403] = useState(0);
  const [count_404, setCount404] = useState(0);

  const fetchMethodStatistic = async () => {
    try {
      const response = await HttpRequestServices.getRequestsCount(
        access_token
      );
      setCount200(response["200"] || 0);
      setCount400(response["400"] || 0); 
      setCount403(response["403"] || 0);
      setCount404(response["404"] || 0);

    } catch (error) {
      console.log(error.status);
    }
  };

  useEffect(() => {
    fetchMethodStatistic();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full h-full rounded-3xl">
      <div className="grid place-content-center w-full h-56 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-lime-500">
        <HttpStatusCard200 count={count_200} />
      </div>
      <div className="grid place-content-center w-full h-56 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-sky-500">
        <HttpStatusCard400 count={count_400} />
      </div>
      <div className="grid place-content-center w-full h-56 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-amber-400">
        <HttpStatusCard403 count={count_403} />
      </div>
      <div className="grid place-content-center w-full h-56 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-orange-700">
        <HttpStatusCard404 count={count_404} />
      </div>
    </div>
  );
}

function HttpStatusCard200({ count }) {
  return (
    <div>
      <TraceCard
        header={"200 Response"}
        icon={<FaCheckCircle color="white" fontSize={36} />}
        count={count}
        time={new Date().toUTCString()}
      />
    </div>
  );
}

function HttpStatusCard400({ count }) {
  return (
    <div>
      <TraceCard
        header={"400 Response"}
        icon={<FaExclamationCircle color="white" fontSize={36} />}
        count={count}
        time={new Date().toUTCString()}
      />
    </div>
  );
}

function HttpStatusCard403({ count }) {
  return (
    <div>
      <TraceCard
        header={"403 Response"}
        icon={<FaBan color="white" fontSize={36} />}
        count={count}
        time={new Date().toUTCString()}
      />
    </div>
  );
}

function HttpStatusCard404({ count }) {
  return (
    <div>
      <TraceCard
        header={"404 Response"}
        icon={<BsQuestionCircleFill color="white" fontSize={36} />}
        count={count}
        time={new Date().toUTCString()}
      />
    </div>
  );
}

export {
  HttpStatusCards,
  HttpStatusCard200,
  HttpStatusCard400,
  HttpStatusCard403,
  HttpStatusCard404,
};
