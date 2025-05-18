import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { MouService } from "../../../api/services/maritime/mou/MouService";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function MouAddForm() {
  const toastCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source_name: "",
    company_imo: 0,
    deatiningauthority: "",
    placeofinspectionport: "",
    vesselImo: 0,
    number_of_deficiencies: 0,
    ground_for_detention: 0,
    agreed_repair_yard: "",
    detention_reason: "",
    date_of_detention: "",
    date_of_release: "",
    typeofinspection: "",
    vessel_flag: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.value
      ? { name: e.target.name, value: e.value }
      : e.target;
    const formattedValue =
      value instanceof Date
        ? value.toISOString().split("T")[0] + "T00:00:00.000Z"
        : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await MouService.addMou(formData, access_token);
      console.log("Mou added successfully:", response);
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `MOU of IMO:${formData.vesselImo} has been added successfully.`,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding Mou:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Successful",
        detail: `MOU of IMO:${formData.vesselImo} has not been added.`,
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
          Mou Detention Add
        </div>
        <div className="bg-blue-600 w-1/3 h-1"></div>
      </div>
      <div className="flex justify-center">
        <Toast ref={toastCenter} position="bottom-center" />
        <form className="w-11/12 h-full bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
          {/* First row */}
          <div className="flex flex-wrap -mx-4 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Imo Number
              </label>
              <input
                id="vesselImo"
                name="vesselImo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.vesselImo}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Vessel Flag
              </label>
              <input
                id="vessel_flag"
                name="vessel_flag"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.vessel_flag}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                // for="grid-city"
              >
                Company Imo
              </label>
              <input
                id="company_imo"
                name="company_imo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.company_imo}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                // for="grid-city"
              >
                Source Id
              </label>
              <input
                id="source_name"
                name="source_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.source_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Second row */}
          <div className="flex flex-wrap -mx-4 mb-2 mt-4">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Inspection Place
              </label>
              <input
                id="placeofinspectionport"
                name="placeofinspectionport"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.placeofinspectionport}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of Detention
              </label>
              <Calendar
                id="date_of_detention"
                name="date_of_detention"
                value={new Date(formData.date_of_detention)}
                onChange={handleInputChange}
                dateFormat="mm-dd-yy"
                showIcon
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                // for="grid-city"
              >
                Date of Release
              </label>
              <Calendar
                id="date_of_release"
                name="date_of_release"
                value={new Date(formData.date_of_release)}
                onChange={handleInputChange}
                dateFormat="mm-dd-yy"
                showIcon
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Inspection Type
              </label>
              <input
                id="typeofinspection"
                name="typeofinspection"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.typeofinspection}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Third row */}
          <div className="flex flex-wrap -mx-4 mb-2 mt-4">
            <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Detention Reason
              </label>
              <input
                id="detention_reason"
                name="detention_reason"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.detention_reason}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Deatining Authority
              </label>
              <input
                id="deatiningauthority"
                name="deatiningauthority"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.deatiningauthority}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Fourth row */}
          <div className="flex flex-wrap -mx-4 mb-2 mt-4">
            <div className="w-full md:w-2/4  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Agreed Repair Yard
              </label>
              <input
                id="agreed_repair_yard"
                name="agreed_repair_yard"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.agreed_repair_yard}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Deficiencies Number
              </label>
              <input
                id="number_of_deficiencies"
                name="number_of_deficiencies"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.number_of_deficiencies}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Ground For Detention
              </label>
              <input
                id="ground_for_detention"
                name="ground_for_detention"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.ground_for_detention}
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

export default MouAddForm;
