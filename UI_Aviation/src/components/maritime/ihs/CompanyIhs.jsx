import React, { useState } from "react";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import { useSelector } from "react-redux";

function CompanyIhs() {
  const [formData, setFormData] = useState({
    company_name: "",
    country_name: "",
    company_imo: null,
    headquarters: "",
    number_of_employees: null,
    postal_code: "",
    mail: "",
    website: "",
    telephone: "",
    address: "",
    typeof_organization: "",
    activity_areas: "",
  });
  const [found, setFound] = useState(true);
  const [company_imo, setCompanyImo] = useState("");
  const { access_token } = useSelector((state) => state.auth);

  const resetFormData = () => {
    setFormData({
      company_name: "",
      country_name: "",
      company_imo: null,
      headquarters: "",
      number_of_employees: null,
      postal_code: "",
      mail: "",
      website: "",
      telephone: "",
      address: "",
      typeof_organization: "",
      activity_areas: "",
    });
  };

  const handleCheck = async () => {
    if (company_imo === null || company_imo === "") return;

    try {
      resetFormData();
      const response = await OrganizationService.getOrganizationByImo(
        company_imo,
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
        console.error("An error occurred Company Ihs get:", error.message);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-200">
      <div className="text-blue-950 font-extrabold text-center text-3xl">
        Company
      </div>
      <div className="flex w-full  p-2 place-items-center">
        <div className="flex h-176 justify-center place-items-center w-full md:w-1/2">
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Imo
                </label>
                <input
                  id="company_imo"
                  name="company_imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={company_imo}
                  onChange={(e) => setCompanyImo((prev) => e.target.value)}
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
                Company Not Found !
              </p>
            </div>
          )}
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Organization Name
                </label>
                <span
                  id="company_name"
                  name="company_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.company_name}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Imo
                </label>
                <span
                  id="company_imo"
                  name="company_imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.company_imo}
                </span>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                  # of Employees
                </label>
                <span
                  id="number_of_employees"
                  name="number_of_employees"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                >
                  {formData.number_of_employees}
                </span>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Activity Areas
                </label>
                <span
                  id="activity_areas"
                  name="activity_areas"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.activity_areas}
                </span>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Website
                </label>
                <span
                  id="website"
                  name="website"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.website}
                </span>
              </div>
            </div>

            {/* Third Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  E-Mail
                </label>
                <span
                  id="mail"
                  name="mail"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.mail}
                </span>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Type
                </label>
                <span
                  id="typeof_organization"
                  name="typeof_organization"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.typeof_organization}
                </span>
              </div>
            </div>

            {/* Fourth Row  */}
            <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Country
                </label>
                <span
                  id="country_name"
                  name="country_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.country_name}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Headquarters
                </label>
                <span
                  id="headquarters"
                  name="headquarters"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.headquarters}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Postal Code
                </label>
                <span
                  id="postal_code"
                  name="postal_code"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                >
                  {formData.postal_code}
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

export default CompanyIhs;
