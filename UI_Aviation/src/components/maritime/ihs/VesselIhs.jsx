import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MscService } from "../../../api/services/maritime/msc/MscService";

function VesselIhs() {
  const [formData, setFormData] = useState({
    ship_type: "",
    flag_name: "",
    alpha_twocode: "",
    source_name: "",
    imo: null,
    mmsi: null,
    callsign: "",
    ship_name: "",
    years_of_build: null,
    width: null,
    length: null,
    deadweight: null,
    gross_tonnage: null,
    images: "",
  });

  const [found, setFound] = useState(true);
  const [imo, setImo] = useState("");

  const { access_token } = useSelector((state) => state.auth);

  const resetFormData = () => {
    setFormData({
      ship_type: "",
      flag_name: "",
      alpha_twocode: "",
      source_name: "",
      imo: null,
      mmsi: null,
      callsign: "",
      ship_name: "",
      years_of_build: null,
      width: null,
      length: null,
      deadweight: null,
      gross_tonnage: null,
      images: "",
    });
  };

  const handleCheck = async () => {
    if (imo === null || imo === "") return;

    try {
      resetFormData();
      const response = await MscService.getMscByImo(imo, access_token);
      if (response === "") {
        setFound(false);
      } else {
        setFound(true);
        setFormData((prev) => response);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
      } else {
        console.error("An error occurred Person ihs get:", error.message);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value, options } = event.target;

    if (!options) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For select elements with multiple options
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-200">
      <div className="text-blue-950 font-extrabold text-center text-3xl">
        Vessel
      </div>
      <div className="flex w-full p-2 place-items-center">
        <div className="flex h-176 justify-center place-items-center w-full md:w-1/2">
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  IMO
                </label>
                <input
                  id="imo"
                  name="imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={imo}
                  onChange={(e) => setImo((prev) => e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <button
          className="relative rounded-full h-14 w-16 m-4
        bg-blue-100  hover:bg-blue-800 ring-4 ring-blue-900  
      text-blue-900 hover:text-white hover:ring-offset-4 duration-300"
          onClick={handleCheck}
        >
          <span className=" font-bold">Check!</span>
        </button>

        <div className="flex flex-col h-176 justify-center place-items-center w-full md:w-1/2">
          {found === false && (
            <div className="ring-2 ring-red-700 rounded-xl bg-red-200">
              <p className="text-red-700 font-bold text-3xl italic m-2">
                Vessel Not Found !
              </p>
            </div>
          )}

          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Vessel Name
                </label>
                <span
                  id="ship_name"
                  name="ship_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.ship_name}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  IMO
                </label>
                <span
                  id="imo"
                  name="imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.imo}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  MMSI
                </label>
                <span
                  id="mmsi"
                  name="mmsi"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.mmsi}
                </span>
              </div>
            </div>
            {/* Second Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Callsign
                </label>
                <span
                  id="callsign"
                  name="callsign"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.callsign}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Ship Type
                </label>
                <span
                  id="ship_type"
                  name="ship_type"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.ship_type}
                </span>
              </div>

              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Flag
                </label>
                <span
                  id="flag_name"
                  name="flag_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.flag_name}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Year of Build
                </label>
                <span
                  id="years_of_build"
                  name="years_of_build"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.years_of_build}
                </span>
              </div>
            </div>
            {/* Third Row */}
            <div className="flex flex-wrap -mx-3 mb-6"></div>
            {/* Fourth Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Gross Tonnage
                </label>
                <span
                  id="gross_tonnage"
                  name="gross_tonnage"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.gross_tonnage}
                </span>
              </div>

              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Dead Weight Tonnage
                </label>
                <span
                  id="deadweight"
                  name="deadweight"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.deadweight}
                </span>
              </div>

              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Length Overall (m)
                </label>
                <span
                  id="length"
                  name="length"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.length}
                </span>
              </div>

              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Width
                </label>
                <span
                  id="width"
                  name="width"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.width}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VesselIhs;
