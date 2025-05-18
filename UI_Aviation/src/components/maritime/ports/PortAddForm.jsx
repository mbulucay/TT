import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { PortService } from "../../../api/services/maritime/ports/PortService";
import { useSelector } from "react-redux";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function PortAddForm() {
  const toastCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);
  const navigate = useNavigate();
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
    latitude: 0.0,
    longitude: 0.0,
    unlocode: "",
    region: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the addOrganization function with orgData
      const response = await PortService.addPort(formData, access_token);
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `${formData.portname} has been added successfully.`,
        life: 3000,
      });

      // Handle success response
    } catch (error) {
      console.error("Error adding port:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Fail",
        detail: `${formData.portname} has not been deleted.`,
        life: 3000,
      });
    }
    navigate(-1);
  };

  return (
    <>
      <div className="grid justify-items-center mt-8 gap-1">
        <div
          className="font-bold text-3xl text-white w-1/3 p-2 bg-blue-800 text-center
    rounded-2xl drop-shadow-xl"
        >
          Person Add
        </div>
        <div className="bg-blue-600 w-1/3 h-1"></div>
      </div>
      <div className="flex justify-center">
        <Toast ref={toastCenter} position="bottom-center" />
        <form className="w-11/12 h-full bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
          {/* First row */}
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Port Name
              </label>
              <input
                id="portname"
                name="portname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Mersin Port"
                value={formData.portname}
                onChange={handleInputChange}
              />
              {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                UN/LOCode
              </label>
              <input
                id="unlocode"
                name="unlocode"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="TRMER"
                value={formData.unlocode}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                Is Terminal
              </label>
              <select
                id="terminal"
                name="terminal"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formData.terminal}
                onChange={handleInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Port Authority
              </label>
              <input
                id="port_auth"
                name="port_auth"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Port Authority"
                value={formData.port_auth}
                onChange={handleInputChange}
              />
              {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Coordinates
              </label>
              <input
                id="coordinates"
                name="coordinates"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="36º 47' 35'' N, 34º 36' 59'' E"
                value={formData.coordinates}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Third Row */}
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Port Size
              </label>
              <select
                id="port_size"
                name="port_size"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formData.port_size}
                onChange={handleInputChange}
              >
                <option value="Very Small">Very Small</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Very Large">Very Large</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Port Type
              </label>
              <select
                id="port_type"
                name="port_type"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formData.port_type}
                onChange={handleInputChange}
              >
                <option value="Seaport">Seaport</option>
                <option value="Harbor">Harbor</option>
                <option value="Cargo Port">Cargo Port</option>
                <option value="Fishing Port">Fishing Port</option>
                <option value="Military Port">Military Port</option>
                <option value="Natural Harbor">Natural Harbor</option>
                <option value="Container Port">Container Port:</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Latitude
              </label>
              <input
                id="latitude"
                name="latitude"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                step="0.01"
                value={formData.latitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Longitude
              </label>
              <input
                id="longitude"
                name="longitude"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                step="0.01"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Fourth Row  */}
          <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Maritime Company Organization
            </label>
            <input
              id="maritimeCompanyOrganization"
              name="maritimeCompanyOrganization"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={formData.maritimeCompanyOrganization}
              onChange={handleInputChange}
            />
          </div> */}
          </div>
          {/* Fifth Row  */}
          <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Region
              </label>
              <input
                id="region"
                name="region"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.region}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country Name
              </label>
              <input
                id="countryname"
                name="countryname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.countryname}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country Code
              </label>
              <input
                id="countrycode"
                name="countrycode"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.countrycode}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex text-nowrap mt-4">
            <div className="w-full md:w-2/3"></div>
            <div className="md:w-1/3 flex justify-end gap-3 mb-3">
              <div>
                <Button
                  className="shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>

              <Link to={"#"} onClick={handleCancelClick}>
                <button
                  className="shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PortAddForm;
