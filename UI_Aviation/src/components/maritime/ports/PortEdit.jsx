import React, { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import {
  portFormDataAssign,
  closePortEdit,
} from "../../../store/maritime/ports/PortActionSlice";
import { PortService } from "../../../api/services/maritime/ports/PortService";
import { Toast } from "primereact/toast";
import { useContext } from "react";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function PortEdit({ updateRow }) {
  const dispatch = useDispatch();
  const { rowData, isEditVisible } = useSelector((state) => state.port_action);
  const toastBottomCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);

  useEffect(() => {}, [rowData, isEditVisible]);

  useEffect(() => {}, []);

  const updateTrigger = async (event) => {

    try {
      // Call the deletePort function with the portId
      const response = await PortService.updatePort(
        rowData.id,
        rowData,
        access_token
      );

      updateRow(rowData);
      // Handle success response

      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `${rowData.portname} has been updated successfully.`,
        life: 3000,
      });

      // dispatch(
      //   portFormDataAssign({
      //     id: 0,
      //     portname: "",
      //     countryname: "",
      //     address: "",
      //     port_type: "",
      //     port_size: "",
      //     countrycode: "",
      //     telephone: "",
      //     terminal: "",
      //     email: "",
      //     port_auth: "",
      //     coordinates: "",
      //     latitude: 0.0,
      //     longitude: 0.0,
      //     unlocode: "",
      //     region: "",
      //   })
      // );
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Port did not update`,
        detail: `${rowData.portname} update failed`,
        life: 3000,
      });
    }
    dispatch(closePortEdit());
  };

  return (
    <div
      id="edit_port"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Dialog
        visible={isEditVisible}
        header={<h3 className="m-2 pl-8">Edit Port {rowData.id}</h3>}
        onHide={() => {
          dispatch(closePortEdit());
        }}
        footer={
          <div id="modal_footer" className="flex justify-end gap-3 mt-3 pr-11">
            <Button
              className="shadow bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
              label="Update"
              icon="pi pi-times"
              onClick={(e) => updateTrigger(e)}
            />
            <Button
              className="shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
              label="Close"
              icon="pi pi-times"
              onClick={() => {
                dispatch(closePortEdit());
              }}
            />
          </div>
        }
        className="bg-blue-200 rounded-2xl shadow-lg p-3 m-8"
      >
        <Toast ref={toastBottomCenter} position="bottom-center" />
        <div className="flex justify-center">
          <form className="w-11/12 h-11/12">
            {/* First row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Name
                </label>
                <input
                  // id="portname"
                  // name="portname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  // placeholder="Mersin Port"
                  value={rowData.portname}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ portname: e.target.value }));
                  }}
                />
                {!rowData.portname && (
                  <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  UN/LOCode
                </label>
                <input
                  id="unlocode"
                  name="unlocode"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  // placeholder="TRMER"
                  value={rowData.unlocode}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ unlocode: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                  Is Terminal
                </label>
                <select
                  id="terminal"
                  name="terminal"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={rowData.terminal}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ terminal: e.target.value }));
                  }}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            {/* Second Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Authority
                </label>
                <input
                  id="port_auth"
                  name="port_auth"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  // placeholder="Port Authority"
                  value={rowData.port_auth}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ port_auth: e.target.value }));
                  }}
                />
                {!rowData.port_auth && (
                  <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-last-name"
                >
                  Coordinates
                </label>
                <input
                  id="coordinates"
                  name="coordinates"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="36º 47' 35'' N, 34º 36' 59'' E"
                  value={rowData.coordinates}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      portFormDataAssign({ coordinates: e.target.value })
                    );
                  }}
                />
              </div>
            </div>
            {/* Third Row */}
            <div className="flex flex-wrap -mx-4 mb-2">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Size
                </label>
                <select
                  id="port_size"
                  name="port_size"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={rowData.port_size}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ port_size: e.target.value }));
                  }}
                >
                  <option>Very Small</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Very Large</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Port Type
                </label>
                <select
                  id="port_type"
                  name="port_type"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={rowData.port_type}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ port_type: e.target.value }));
                  }}
                >
                  <option>Seaport</option>
                  <option>Harbor</option>
                  <option>Cargo Port</option>
                  <option>Fishing Port</option>
                  <option>Military Port</option>
                  <option>Natural Harbor</option>
                  <option>Container Port:</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Latitude
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  step="any"
                  // placeholder="36.7932319"
                  value={rowData.latitude}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ latitude: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Longitude
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  step="any"
                  // placeholder="34.6166657"
                  value={rowData.longitude}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ longitude: e.target.value }));
                  }}
                />
              </div>
            </div>
            {/* Fourth Row  */}
            <div className="flex flex-wrap -mx-3 mb-2 md:mt-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Telephone
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.telephone}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ telephone: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  E-Mail
                </label>
                <input
                  id="email"
                  name="email"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.email}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ email: e.target.value }));
                  }}
                />
              </div>
              {/*  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  Fax
                </label>
                <input
                  id="fax"
                  name="fax"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="90210"
                  value={rowData.fax}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ fax: e.target.value }));
                  }}
                />
              </div> */}
            </div>
            {/* Fifth Row  */}
            <div className="flex flex-wrap -mx-3 mb-2 md:mt-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Region
                </label>
                <input
                  id="region"
                  name="region"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.region}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ region: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  Country Name
                </label>
                <input
                  id="countryname"
                  name="countryname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.countryname}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      portFormDataAssign({ countryname: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  Country Code
                </label>
                <input
                  id="countrycode"
                  name="countrycode"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.countrycode}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      portFormDataAssign({ countrycode: e.target.value })
                    );
                  }}
                />
              </div>
              {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="90210"
                  value={rowData.city}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ city: e.target.value }));
                  }}
                />
              </div> */}
              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2"
                  // for="grid-zip"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="90210"
                  value={rowData.address}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(portFormDataAssign({ address: e.target.value }));
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default PortEdit;
