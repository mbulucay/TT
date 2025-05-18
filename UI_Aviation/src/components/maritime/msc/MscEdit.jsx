import React, { useContext, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import {
  closeMscEdit,
  mscFormDataAssign,
} from "../../../store/maritime/msc/MscActionSlice";
import { Toast } from "primereact/toast";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import { ToastContext } from "../../shared/ui_functions/ToastContext";


function MscEdit({ updateRow }) {
  const dispatch = useDispatch();
  const { rowData, isEditVisible } = useSelector((state) => state.msc_action);
  const toastBottomCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const {access_token} = useSelector((state)=> state.auth)

  useEffect(() => {}, [rowData, isEditVisible]);

  useEffect(() => {}, []);

  const updateTrigger = async (event) => {

    try {
      // Call the deletePort function with the portId
      const response = await MscService.updateMsc(rowData.id, rowData, access_token);

      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Vessel ${rowData.ship_name} has been updated successfully.`,
        life: 3000,
      });

      updateRow(rowData);
      // Handle success response
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Operation Failed",
        detail: `Vessel ${rowData.ship_name} has not been updated.`,
        life: 3000,
      });
    }
    dispatch(closeMscEdit());
  };

  return (
    <div
      id="edit_port"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Dialog
        visible={isEditVisible}
        header={<h3 className="m-2 pl-8">Edit Msc</h3>}
        onHide={() => {
          dispatch(closeMscEdit());
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
                dispatch(closeMscEdit());
              }}
            />
          </div>
        }
        className="bg-blue-200 rounded-2xl shadow-lg p-3 m-8"
      >
        <Toast ref={toastBottomCenter} position="bottom-center" />

        <div className="flex justify-center">
          <form className="w-11/12 h-full">
            {/* First row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Vessel Name
                </label>
                <input
                  id="ship_name"
                  name="ship_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.ship_name}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ ship_name: e.target.value }));
                  }}
                />
{/*                 <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> */}
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  IMO
                </label>
                <input
                  // id="imo"
                  // name="imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.imo}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ imo: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  MMSI
                </label>
                <input
                  // id="mmsi"
                  // name="mmsi"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.mmsi}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ mmsi: e.target.value }));
                  }}
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Callsign
                </label>
                <input
                  // id="callsign"
                  // name="callsign"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.callsign}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ callsign: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Ship Type
                </label>
                <input
                  // id="ship_type"
                  // name="ship_type"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.ship_type}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ ship_type: e.target.value }));
                  }}
                />
              </div>

              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Flag
                </label>
                <input
                  // id="flag_name"
                  // name="flag_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.flag_name}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ flag_name: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Year of Build
                </label>
                <input
                  // id="years_of_build"
                  // name="years_of_build"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.years_of_build}
                  onChange={(e) => {
                    dispatch(
                      mscFormDataAssign({ years_of_build: e.target.value })
                    );
                  }}
                />
              </div>
            </div>
            {/* Third Row */}
            <div className="flex flex-wrap -mx-3 mb-6"></div>
            {/* Fourth Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Gross Tonnage
                </label>
                <input
                  // id="gross_tonnage"
                  // name="gross_tonnage"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.gross_tonnage}
                  onChange={(e) => {
                    dispatch(
                      mscFormDataAssign({ gross_tonnage: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Dead Weight Tonnage
                </label>
                <input
                  // id="deadweight"
                  // name="deadweight"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.deadweight}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ deadweight: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Length (m)
                </label>
                <input
                  // id="length"
                  // name="length"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.length}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ length: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Width
                </label>
                <input
                  // id="width"
                  // name="width"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.width}
                  onChange={(e) => {
                    dispatch(mscFormDataAssign({ width: e.target.value }));
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

export default MscEdit;
