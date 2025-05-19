import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { ToastContext } from "../../shared/ui_functions/ToastContext";
import axios from "axios";
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function LocationAddForm() {

  const toastCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    locationCode: "",
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
      const response = await LocationServices.createLocation(formData);
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `${formData.name} has been added successfully.`,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding location:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Fail",
        detail: `${formData.person_name} has not been added.`,
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
          Location Add
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
                Name
              </label>
              <input
                id="name"
                name="name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
                          <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
            </div>
            
                       
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Location Code
              </label>
              <input
                id="locationCode"
                name="locationCode"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.locationCode}
                onChange={handleInputChange}
              />
                          <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
            </div>


          </div>
          {/* Second row */}
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <input
                id="country"
                name="country"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="country"
                value={formData.country}
                onChange={handleInputChange}
              />
                          <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                City
              </label>
              <input
                id="city"
                name="city"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
              />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
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

export default LocationAddForm;