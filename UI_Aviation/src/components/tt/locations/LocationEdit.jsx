import React, { useRef, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function LocationEdit({ visible, onHide, location, onUpdate }) {
  const toast = useRef(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (location) {
      setFormData(location);
    }
  }, [location]);

  if (!location || !formData) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const updateTrigger = async (event) => {
    try {
      await LocationServices.updateLocation(formData.id, formData);
      onUpdate(formData);
      onHide();
      
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Location ${formData.name} has been updated.`,
          life: 3000,
        });
      }
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Operation Failed",
          detail: `Location ${formData.name} has not been updated.`,
          life: 3000,
        });
      }
    }
  };

  return (
    <Dialog
      visible={visible}
      header={<h3 className="m-2 pl-8">Edit Location</h3>}
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
          {/* First row */}
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Location Code
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.locationCode}
                onChange={(e) => handleInputChange('locationCode', e.target.value)}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default LocationEdit;
