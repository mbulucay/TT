import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import { useSelector } from "react-redux";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function MscAddForm() {
  const toastCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ship_type: "",
    flag_name: "",
    alpha_twocode: "",
    source_name: "",
    imo: 0,
    mmsi: 0,
    callsign: "",
    ship_name: "",
    years_of_build: 0,
    width: 0.0,
    length: 0.0,
    deadweight: 0.0,
    gross_tonnage: 0,
    images: "",
  });

  const { access_token } = useSelector((state) => state.auth);

  const handleInputChange = (event) => {
    // const { name, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));

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

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the addMsc function with orgData
      const response = await MscService.addMsc(formData, access_token);
      console.log("Msc added successfully:", response);
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Vessel ${formData.ship_name} has been added successfully.`,
        life: 3000,
      });

      // Handle success response
    } catch (error) {
      console.error("Error adding Msc:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Fail",
        detail: `Vessel ${formData.ship_name} has not been added.`,
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
          Merchant Ship Add
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
                Vessel Name
              </label>
              <input
                id="ship_name"
                name="ship_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.ship_name}
                onChange={handleInputChange}
              />
              {/*               <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                IMO
              </label>
              <input
                id="imo"
                name="imo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.imo}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                MMSI
              </label>
              <input
                id="mmsi"
                name="mmsi"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.mmsi}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Callsign
              </label>
              <input
                id="callsign"
                name="callsign"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.callsign}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Ship Type
              </label>
              <input
                id="ship_type"
                name="ship_type"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.ship_type}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Flag
              </label>
              <input
                id="flag_name"
                name="flag_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.flag_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Year of Build
              </label>
              <input
                id="years_of_build"
                name="years_of_build"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.years_of_build}
                onChange={handleInputChange}
              />
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
              <input
                id="gross_tonnage"
                name="gross_tonnage"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.gross_tonnage}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Dead Weight Tonnage
              </label>
              <input
                id="deadweight"
                name="deadweight"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.deadweight}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Length Overall (m)
              </label>
              <input
                id="length"
                name="length"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.length}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Width
              </label>
              <input
                id="width"
                name="width"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.width}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex text-nowrap mt-4">
            <div className="w-full md:w-2/3"></div>
            <div className="md:w-1/3 flex justify-end gap-3 mb-3">
              {/*           <button
            className="shadow bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
            type="button"
          >
            Submit
          </button> */}
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

export default MscAddForm;
