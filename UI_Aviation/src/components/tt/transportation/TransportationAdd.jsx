import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { TransportationServices } from "../../../api/services/tt/transportation/TransportationServices";
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function TransportationAdd() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    transportationType: "",
    originLocation: null,
    destinationLocation: null,
    operatingDays: [],
  });

  const transportationTypes = [
    { label: "FLIGHT", value: "FLIGHT" },
    { label: "BUS", value: "BUS" },
    { label: "SUBWAY", value: "SUBWAY" },
    { label: "UBER", value: "UBER" },
  ];

  const daysOfWeek = [
    { label: "SUNDAY", value: "0" },
    { label: "MONDAY", value: "1" },
    { label: "TUESDAY", value: "2" },
    { label: "WEDNESDAY", value: "3" },
    { label: "THURSDAY", value: "4" },
    { label: "FRIDAY", value: "5" },
    { label: "SATURDAY", value: "6" },
  ];

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await LocationServices.getAllLocations();
      const formattedLocations = response.map(location => ({
        label: `${location.name} (${location.locationCode})`,
        value: location
      }));
      setLocations(formattedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      showError("Failed to fetch locations");
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const submissionData = {
        ...formData,
        operatingDays: formData.operatingDays.join(',').toString(),

      };
      console.log(submissionData);
      await TransportationServices.createTransportation(submissionData);
      showSuccess("Transportation created successfully");
      navigate("/transportations");
    } catch (error) {
      console.error("Error creating transportation:", error);
      showError("Failed to create transportation");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    if (field === "operatingDays") {
      setFormData({
        ...formData,
        [field]: e.value
      });
    } else if (field === "originLocation" || field === "destinationLocation") {
      setFormData({
        ...formData,
        [field]: e.value
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value
      });
    }
  };

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Transportation</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Transportation Type</label>
              <Dropdown
                value={formData.transportationType}
                options={transportationTypes}
                onChange={(e) => handleInputChange(e, "transportationType")}
                placeholder="Select Type"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Origin Location</label>
              <Dropdown
                value={formData.originLocation}
                options={locations}
                onChange={(e) => handleInputChange(e, "originLocation")}
                placeholder="Select Origin"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Destination Location</label>
              <Dropdown
                value={formData.destinationLocation}
                options={locations}
                onChange={(e) => handleInputChange(e, "destinationLocation")}
                placeholder="Select Destination"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Operating Days</label>
              <MultiSelect
                value={formData.operatingDays}
                options={daysOfWeek}
                onChange={(e) => handleInputChange(e, "operatingDays")}
                placeholder="Select Operating Days"
                className="w-full"
              />
            </div>

          </div>
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
    </div>
  );
}

export default TransportationAdd; 