import React, { useEffect, useRef, useState } from "react";
import { CountryServices } from "../../../api/services/data/CountryServices";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";
import { Toast } from "primereact/toast";

const CountrySelector = ({ updateMap }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    countryalphatwocode: "TR",
    countryname: "Turkiye ",
  });
  const [countries, setCountries] = useState([{}]);
  const { access_token, refresh_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toast = useRef(null);

  const handleCountryChange = (e) => {
    setSelectedCountry((prev) => e.target.value);
    updateMap(e.target.value);
  };

  const showMessage = (event, severity, label) => {
    toast.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  };

  const fetchCountries = async () => {
    try {
      const response = await CountryServices.getCountriesByPorts(access_token);
      setCountries((prev) => response);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        const response = await AuthService.updateAccessToken(refresh_token);
        if (response) {
          dispatch(
            authDataAssign({
              access_token: response?.access_token,
              refresh_token: response?.refresh_token,
              email: response?.email,
              role: response?.user_role,
              firstname: response?.user_firstname,
              lastname: response?.user_lastname,
            })
          );
        }
      } else if (error.response && error.response.status === 404) {
        showMessage(null, "warn", {
          head: "Port",
          content: "Port not found",
        });
      } else {
        console.error("An error occurred during msclistget:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchCountries();
    updateMap(selectedCountry.countryalphatwocode);
  }, [access_token]);

  return (
    <div className="flex justify-start items-center gap-2 w-full p-3 bg-gradient-to-b from-blue-700 to-blue-200 rounded-lg">
      <Toast ref={toast} position="top-right" />

      <div className="block tracking-wide text-white text-md font-semibold mb-1 text-left ml-2">
        Country Name:
      </div>

      <div>
        <form class="max-w-sm mx-auto">
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedCountry}
            onChange={handleCountryChange}
            defaultValue={selectedCountry.countryalphatwocode}
          >
            <option value="">Select</option>
            {countries.map((country, index) => (
              <option key={index} value={country.countryalphatwocode}>
                {country.countryname}
              </option>
            ))}
          </select>
        </form>
      </div>
      {/*  <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select> */}
      <div className="flex-grow"></div>
      {selectedCountry && (
        <div className="flex gap-2 text-md font-medium text-white">
          You selected:{" "}
          <div className="font-bold">
            {
              countries.find(
                (country) => country.countryalphatwocode === selectedCountry
              )?.countryname
              // selectedCountry.countryname
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
