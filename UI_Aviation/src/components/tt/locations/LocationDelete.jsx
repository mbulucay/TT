import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { LocationServices } from '../../../api/services/tt/location/LocationServices';

function LocationDelete({ visible, onHide, location, onDelete }) {
  const toast = useRef(null);

  if (!location) {
    return null;
  }

  const deleteTrigger = async () => {
    try {
      await LocationServices.deleteLocation(location.id);
      onDelete(location.id);
      onHide();
      
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Location ${location.name} has been deleted.`,
          life: 3000,
        });
      }
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Operation Failed",
          detail: `Location ${location.name} has not been deleted.`,
          life: 3000,
        });
      }
    }
  };

  return (
    <Dialog
      visible={visible}
      header={<h3 className="m-2 pl-8">Delete Location</h3>}
      onHide={onHide}
      footer={
        <div id="modal_footer" className="flex justify-end gap-3 mt-3 pr-11">
          <Button
            className="shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
            label="Delete"
            icon="pi pi-trash"
            onClick={deleteTrigger}
          />
          <Button
            className="shadow bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
          />
        </div>
      }
      className="bg-blue-200 rounded-2xl shadow-lg p-3 m-8"
    >
      <Toast ref={toast} />
      <div className="flex justify-center p-4">
        <p className="text-lg text-gray-700">
          Are you sure you want to delete location "{location.name}"?
        </p>
      </div>
    </Dialog>
  );
}

export default LocationDelete; 