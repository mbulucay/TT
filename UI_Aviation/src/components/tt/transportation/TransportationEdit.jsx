import React, { useRef, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { TransportationServices } from "../../../api/services/tt/transportation/TransportationServices";
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function TransportationEdit({ visible, onHide, transportation, onUpdate }) {
  const toast = useRef(null);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState(null);

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

  useEffect(() => {
    if (transportation) {
      setFormData({
        ...transportation,
        transportationType: transportation.transportationType,
        originLocation: transportation.originLocation,
        destinationLocation: transportation.destinationLocation,
        operatingDays: transportation.operatingDays
      });
    }
  }, [transportation]);

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

  const showError = (message) => {
    if (toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
    }
  };

  if (!transportation || !formData) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const updateTrigger = async () => {
    try {
      if (!formData.originLocation || !formData.destinationLocation) {
        showError("Origin and destination locations are required");
        return;
      }

      console.log(JSON.stringify(formData));

      await TransportationServices.updateTransportation(formData.id, formData);
      onUpdate(formData);
      onHide();
      
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Transportation ${formData.id} has been updated.`,
          life: 3000,
        });
      }
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Operation Failed",
          detail: `Transportation ${formData.id} has not been updated.`,
          life: 3000,
        });
      }
    }
  };

  return (
    <Dialog
      visible={visible}
      header={<h3 className="m-2 pl-8">Edit Transportation</h3>}
      onHide={onHide}
      footer={
        <div id="modal_footer" className="flex justify-end gap-3 mt-3 pr-11">
          <Button
            className="shadow bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
            label="Update"
            icon="pi pi-check"
            onClick={updateTrigger}
          />
          <Button
            className="shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
            label="Close"
            icon="pi pi-times"
            onClick={onHide}
          />
        </div>
      }
      className="bg-blue-200 rounded-2xl shadow-lg p-3 m-8"
    >
      <Toast ref={toast} />

      <div className="flex justify-center">
        <form className="w-11/12 h-full">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Transportation Type
              </label>
              <Dropdown
                value={formData.transportationType}
                options={transportationTypes}
                onChange={(e) => handleInputChange("transportationType", e.value)}
                placeholder="Select Type"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Origin Location
              </label>
              <Dropdown
                value={formData.originLocation}
                options={locations}
                onChange={(e) => handleInputChange("originLocation", e.value)}
                placeholder="Select Origin"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Destination Location
              </label>
              <Dropdown
                value={formData.destinationLocation}
                options={locations}
                onChange={(e) => handleInputChange("destinationLocation", e.value)}
                placeholder="Select Destination"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Operating Days
              </label>
              <MultiSelect
                value={formData.operatingDays}
                options={daysOfWeek}
                onChange={(e) => handleInputChange("operatingDays", e.value)}
                placeholder="Select Operating Days"
                className="w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default TransportationEdit; 