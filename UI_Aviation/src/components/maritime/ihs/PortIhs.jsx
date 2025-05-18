import React, { useState } from "react";
import { PortService } from "../../../api/services/maritime/ports/PortService";
import { useSelector } from "react-redux";

function PortIhs() {
  const [formData, setFormData] = useState({
    portname: "",
    countryname: "",
    address: "",
    port_type: "",
    port_size: "",
    countrycode: "",
    telephone: "",
    terminal: "",
    email: "",
    port_auth: "",
    coordinates: "",
    latitude: null,
    longitude: null,
    unlocode: "",
    region: "",
  });

  const [found, setFound] = useState(true);
  const [unlocode, setUnlocode] = useState("");

  const { access_token } = useSelector((state) => state.auth);

  const resetFormData = () => {
    setFormData({
      portname: "",
      countryname: "",
      address: "",
      port_type: "",
      port_size: "",
      countrycode: "",
      telephone: "",
      terminal: "",
      email: "",
      port_auth: "",
      coordinates: "",
      latitude: null,
      longitude: null,
      unlocode: "",
      region: "",
    });
  };

  const handleCheck = async () => {
    if (unlocode === null || unlocode === "") return;
    try {
      resetFormData();
      const response = await PortService.getPortByUnlocode(
        unlocode,
        access_token
      );
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

  return (
    <div className="bg-gradient-to-b from-white to-blue-200">
      <div className="text-blue-950 font-extrabold text-center text-3xl">
        Port
      </div>
      <div className="flex w-full  p-2 place-items-center">
        <div className="flex h-176 justify-center place-items-center w-full md:w-1/2">
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  UN/LOCode
                </label>
                <input
                  id="unlocode"
                  name="unlocode"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={unlocode}
                  onChange={(e) =>
                    setUnlocode((prev) => e.target.value.toUpperCase())
                  }
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
                Prt Not Found !
              </p>
            </div>
          )}

          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Name
                </label>
                <span
                  id="portname"
                  name="portname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.portname}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  UN/LOCode
                </label>
                <span
                  id="unlocode"
                  name="unlocode"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.unlocode}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                  Is Terminal
                </label>
                <span
                  id="terminal"
                  name="terminal"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {formData.terminal === true ? "True" : "False"}
                </span>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Authority
                </label>
                <span
                  id="port_auth"
                  name="port_auth"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.port_auth}
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Coordinates
                </label>
                <span
                  id="coordinates"
                  name="coordinates"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="36º 47' 35'' N, 34º 36' 59'' E"
                >
                  {formData.coordinates}
                </span>
              </div>
            </div>

            {/* Third Row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Size
                </label>
                <span
                  id="port_size"
                  name="port_size"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {formData.port_size}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Type
                </label>
                <span
                  id="port_type"
                  name="port_type"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {formData.port_type}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Latitude
                </label>
                <span
                  id="latitude"
                  name="latitude"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  step="0.01"
                >
                  {formData.latitude?.toPrecision(3)}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Longitude
                </label>
                <span
                  id="longitude"
                  name="longitude"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  step="0.01"
                >
                  {formData.longitude?.toPrecision(3)}
                </span>
              </div>
            </div>

            {/* Fourth Row  */}
            <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Telephone
                </label>
                <span
                  id="telephone"
                  name="telephone"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.telephone}
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  E-Mail
                </label>
                <span
                  id="email"
                  name="email"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.email}
                </span>
              </div>
            </div>

            {/* Fifth Row  */}
            <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Region
                </label>
                <span
                  id="region"
                  name="region"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.region}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Country Name
                </label>
                <span
                  id="countryname"
                  name="countryname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.countryname}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Country Code
                </label>
                <span
                  id="countrycode"
                  name="countrycode"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.countrycode}
                </span>
              </div>

              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2">
                  Address
                </label>
                <span
                  id="address"
                  name="address"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.address}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PortIhs;
