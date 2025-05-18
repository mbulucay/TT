import React, { useState } from "react";
import { PersonService } from "../../../api/services/maritime/person/PersonService";
import { useSelector } from "react-redux";

function PersonIhs() {
  const [formData, setFormData] = useState({
    person_name: "",
    gender: "",
    age: "",
    country_name: "",
    person_surname: "",
    identificationNumber: null,
    job: "",
  });

  const [found, setFound] = useState(true);
  const [identification, setIdendification] = useState("");

  const { access_token } = useSelector((state) => state.auth);

  const resetFormData = () => {
    setFormData({
      person_name: "",
      gender: "",
      age: "",
      country_name: "",
      person_surname: "",
      identificationNumber: null,
      job: "",
    });
  };

  const handleCheck = async () => {
    if (identification === null || identification === "") return;
    try {
      resetFormData();
      const response = await PersonService.getPersonByIdentification(
        access_token,
        identification
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
        Person
      </div>
      <div className="flex w-full p-2 place-items-center">
        <div className="flex h-176 justify-center place-items-center w-full md:w-1/2">
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Identification Number
                </label>
                <input
                  id="identificationNumber"
                  name="identificationNumber"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={identification}
                  onChange={(e) => setIdendification((prev) => e.target.value)}
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
                Person Not Found !
              </p>
            </div>
          )}
          <form className="w-11/12 h-fit bg-blue-200 p-8 rounded-3xl mt-8 shadow-2xl">
            {/* First row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name
                </label>
                <span
                  id="person_name"
                  name="person_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.person_name}
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Surname
                </label>
                <span
                  id="person_surname"
                  name="person_surname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  // onChange={handleInputChange}
                >
                  {formData.person_surname}
                </span>
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Identification Number
                </label>
                <span
                  id="identificationNumber"
                  name="identificationNumber"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                >
                  {formData.identificationNumber}
                </span>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Job
                </label>
                <span
                  id="job"
                  name="job"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                >
                  {formData.job}
                </span>
              </div>
            </div>
            {/* Third Row  */}
            <div className="flex flex-wrap -mx-3 mb-2 md:mt-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Gender
                </label>
                <span
                  id="gender"
                  name="gender"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                >
                  {formData.gender}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  Age
                </label>
                <span
                  id="age"
                  name="age"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  // onChange={handleInputChange}
                >
                  {formData.age}
                </span>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  Country
                </label>
                <span
                  id="country_name"
                  name="country_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // onChange={handleInputChange}
                >
                  {formData.country_name}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonIhs;
