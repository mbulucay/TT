import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { FaSearchPlus } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import ShipDetailMap from "./ShipDetailMap";
import { useSelector } from "react-redux";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import ImageDisplay from "./ImageDisplay";
import { Button } from "primereact/button";

function ShipDetail(props) {
  const { access_token } = useSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = useState("");

  const { rowData } = useSelector((state) => state.msc_action);

  const [last_ais_info, setLastAisInfo] = useState({
    navigational_status: "",
    position_received: "",
    local_time: "",
    latitude_longitude: "",
    speed: null,
    course: "",
    true_heading: "",
    rate_of_turn: "",
    draught: "",
    reported_dest: "",
    matched_dest: "",
    ETA: "",
    ais_source: "",
  });

  const [company_info, setCompanyInfo] = useState({
    company_name: "",
    company_imo: null,
    role: "",
    company_address: "",
    date_of_effect: "",
  });

  const [isBlurry, setIsBlurry] = useState(false);

  const toggleBlur = () => {
    setIsBlurry(!isBlurry);
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 1, 0.4)",
    zIndex: 999,
  };

  const blurryStyle = {
    filter: isBlurry ? "blur(10px)" : "none",
    transition: "filter 0.3s ease",
  };

  function toCamelCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  if (!rowData) {
    return <div>Not Found Imo</div>; // Or any other error handling logic
  }

  return (
    <div className="flex">
      <div className="flex-none">
        {isBlurry && <div style={overlayStyle}></div>}
        <div
          className={`md:flex justify-around bg-blue-200 rounded-xl p-2`}
          style={blurryStyle}
        >
          <div className="grid h-50 w-96  p-1 shadow-xl">
            <ImageDisplay image_url={rowData.images} />
          </div>
          <div className="flex flex-col justify-around gap-3 ml-5">
            <span className="text-4xl hidden md:flex font-sans font-bold duration-200 tracking-wide text-blue-800">
              {rowData.ship_name}
            </span>
            <span className="text-4xl hidden md:flex font-sans font-bold duration-200 tracking-wide text-blue-800">
              {rowData.imo}
            </span>

            <div className="flex align-items-center ml-2">
              {/* <TR title="Turkey" className="w-12 h-12 drop-shadow-md" /> */}
              <span
                className={`fi fi-${rowData.alpha_twocode.toLowerCase()} scale-150 mr-2`}
              ></span>
              <span className="text-3xl font-bold">
                {rowData.flag_name}
                <span className="text-2xl font-semibold">
                  ({rowData.alpha_twocode})
                </span>
              </span>
            </div>
            <div className="flex flex-1 align-items-center">
              <BsFillBoxSeamFill fontSize={20} />
              <span className="text-2xl ml-3 font-semibold">
                {rowData.ship_type}
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-10">
              {/* <div className="flex flex-wrap justify-content-around gap-3">
                <Button
                  className="flex-1 shadow bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br 
                  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
                  label="Update"
                  icon="pi pi-times"
                  // onClick={(e) => updateTrigger(e)}
                />
                <Button
                  className="flex-1 shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br 
                  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
                  label="Delete"
                  icon="pi pi-times"
                  // onClick={() => {
                  //   dispatch(closeMscEdit());
                  // }}
                />
              </div> */}
              {/*  <Button
                className="shadow bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
                label="Upload Image"
                icon="pi pi-times"
              /> */}
            </div>
          </div>
        </div>
        <div className="md:flex gap-4 mt-2 bg-blue-400 justify-between rounded-lg p-2 ring-1 ring-white">
          <div className="flex flex-1 justify-between flex-col w-72 md:w-80 bg-blue-200 rounded-lg shadow-lg hover:scale-105 duration-200">
            <div className="flex bg-blue-300 rounded-md hover:bg-blue-400 duration-200 ">
              <span className="m-2 font-mono font-extrabold text-xl">
                General Information
              </span>
            </div>
            <div className="overflow-hidden flex flex-col divide-y-2 divide-blue-800/50 gap-2 ml-10 m-2">
              {Object.entries(rowData).map(([key, value]) => (
                <div key={key} className="flex gap-4 ml-2">
                  <span className="font-bold flex w-32">{`${toCamelCase(key.replace(/_/g, " "))}:`}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex-grow"></div>
            <div className="h-4 bg-blue-300 rounded-md"></div>
          </div>
          <div className="flex w-0.5 bg-white rounded-3xl"></div>
          <div className="flex justify-self-stretch flex-col w-72 md:w-80 bg-blue-200 rounded-lg shadow-lg hover:scale-105 duration-200">
            <div className="flex bg-blue-300 rounded-md hover:bg-blue-400 duration-200">
              <span className="m-2 font-mono font-extrabold text-xl">
                Last Ais Information
              </span>
            </div>
            <div className="divide-y-2 divide-blue-800/50 grid gap-1 ml-10 m-2">
              {Object.entries(last_ais_info).map(([key, value]) => (
                <div key={key} className="flex gap-4 ml-2 ">
                  <span className="font-bold flex w-32 text-nowrap ">{`${toCamelCase(key.replace(/_/g, " "))}:`}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}

              <div className="flex gap-4 ml-2">
                <span className="font-bold flex w-32 text-nowrap">{`Company Name: `}</span>
                <span className="font-semibold"></span>
              </div>

              <div className="flex gap-4 ml-2">
                <span className="font-bold flex w-32 text-nowrap">{`Company Imo:`}</span>
                <span className="font-semibold"></span>
              </div>
            </div>
            <div className="flex-grow"></div>

            <div className="h-4 bg-blue-300 rounded-md"></div>
          </div>
        </div>
      </div>

      <div id="detail_map" className=" w-full ml-8 relative h-screen">
        <div className="h-5/6 bg-blue-200 rounded-lg">
          <div className="flex bg-blue-300 rounded-md hover:bg-blue-400 duration-200">
            <span className="m-2 font-mono font-bold">Map</span>
          </div>
          <div className="bg-blue-400 mt-2 h-full p-2 rounded-lg">
            <ShipDetailMap />
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default ShipDetail;
