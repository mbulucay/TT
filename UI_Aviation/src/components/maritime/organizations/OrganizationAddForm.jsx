import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function OrganizationAddForm() {
  const toastCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    country_name: "",
    companyImo: 0,
    headquarters: "",
    number_of_employees: 0,
    postal_code: "",
    mail: "",
    website: "",
    telephone: "",
    address: "",
    typeof_organization: "",
    activity_areas: "",
  });

  const { access_token } = useSelector((state) => state.auth);

  const handleInputChange = (event) => {
    // const { name, value } = event.target;
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
      // Call the addOrganization function with orgData
      const response = await OrganizationService.addOrganization(
        formData,
        access_token
      );
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `${formData.companyName} has been added successfully.`,
        life: 3000,
      });

      // Handle success response
    } catch (error) {
      console.error("Error adding organization:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Fail",
        detail: `${formData.companyName} has not been added.`,
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
          Organization Add
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
                Organization Name
              </label>
              <input
                id="companyName"
                name="companyName"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              {/*                 
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> 
                */}
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Imo
              </label>
              <input
                id="companyImo"
                name="companyImo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.companyImo}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                # of Employees
              </label>
              <input
                id="number_of_employees"
                name="number_of_employees"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.number_of_employees}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Activity Areas
              </label>
              <input
                id="activity_areas"
                name="activity_areas"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.activity_areas}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Website
              </label>
              <input
                id="website"
                name="website"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                E-Mail
              </label>
              <input
                id="mail"
                name="mail"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.mail}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Type
              </label>
              <input
                id="typeof_organization"
                name="typeof_organization"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.typeof_organization}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Fourth Row  */}
          <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <input
                id="country_name"
                name="country_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.country_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Headquarters
              </label>
              <input
                id="headquarters"
                name="headquarters"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={formData.headquarters}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Postal Code
              </label>
              <input
                id="postal_code"
                name="postal_code"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={formData.postal_code}
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
                placeholder="90210"
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
                  // onClick={(event) => showMessage(event, toastCenter, "succes")}
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

export default OrganizationAddForm;
