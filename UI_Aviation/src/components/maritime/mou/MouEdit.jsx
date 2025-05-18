import React, { useEffect, useRef, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  closeMouEdit,
  mouFormDataAssign,
} from "../../../store/maritime/mou/MouActionSlice";
import { Toast } from "primereact/toast";
import { MouService } from "../../../api/services/maritime/mou/MouService";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function MouEdit({ updateRow }) {
  const dispatch = useDispatch();
  const { rowData, isEditVisible } = useSelector((state) => state.mou_action);
  const toastBottomCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);

  useEffect(() => {}, [rowData, isEditVisible]);

  useEffect(() => {}, []);

  const updateTrigger = async (event) => {

    try {
      const response = await MouService.updateMou(
        rowData.id,
        rowData,
        access_token
      );
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `MOU of IMO:${rowData.vesselImo} has been updated successfully.`,
        life: 3000,
      });

      updateRow(rowData);
    } catch (error) {
      console.error("Error deleting mou:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Fail",
        detail: `MOU of IMO:${rowData.vesselImo} has not been updated.`,
        life: 3000,
      });
    }

    dispatch(closeMouEdit());
  };

  return (
    <div
      id="edit_mou"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Dialog
        visible={isEditVisible}
        header={<h3 className="m-2 pl-8">Edit Mou {rowData.id}</h3>}
        onHide={() => {
          dispatch(closeMouEdit());
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
                dispatch(closeMouEdit());
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
            <div className="flex flex-wrap -mx-4 mb-2">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Imo Number
                </label>
                <input
                  // id="vesselImo"
                  // name="vesselImo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.vesselImo}
                  onChange={(e) => {
                    dispatch(mouFormDataAssign({ vesselImo: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Vessel Flag
                </label>
                <input
                  // id="vessel_flag"
                  // name="vessel_flag"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.vessel_flag}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ vessel_flag: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Company Imo
                </label>
                <input
                  // id="company_imo"
                  // name="company_imo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.company_imo}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ company_imo: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Source Id
                </label>
                <input
                  // id="source_name"
                  // name="source_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.source_name}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ source_name: e.target.value })
                    );
                  }}
                />
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-wrap -mx-4 mb-2 mt-4">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Inspection Place
                </label>
                <input
                  // id="placeofinspectionport"
                  // name="placeofinspectionport"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.placeofinspectionport}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({
                        placeofinspectionport: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Date of Detention
                </label>
                <input
                  // id="date_of_detention"
                  // name="date_of_detention"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.date_of_detention}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ date_of_detention: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Date of Release
                </label>
                <input
                  // id="date_of_release"
                  // name="date_of_release"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.date_of_release}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ date_of_release: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Inspection Type
                </label>
                <input
                  // id="typeofinspection"
                  // name="typeofinspection"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.typeofinspection}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ typeofinspection: e.target.value })
                    );
                  }}
                />
              </div>
            </div>
            {/* Third row */}
            <div className="flex flex-wrap -mx-4 mb-2 mt-4">
              <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Detention Reason
                </label>
                <input
                  // id="detention_reason"
                  // name="detention_reason"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.detention_reason}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ detention_reason: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Deatining Authority
                </label>
                <input
                  // id="deatiningauthority"
                  // name="deatiningauthority"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.deatiningauthority}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ deatiningauthority: e.target.value })
                    );
                  }}
                />
              </div>
            </div>
            {/* Fourth row */}
            <div className="flex flex-wrap -mx-4 mb-2 mt-4">
              <div className="w-full md:w-2/4  px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Agreed Repair Yard
                </label>
                <input
                  // id="agreed_repair_yard"
                  // name="agreed_repair_yard"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.agreed_repair_yard}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({ agreed_repair_yard: e.target.value })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Deficiencies Number
                </label>
                <input
                  // id="number_of_deficiencies"
                  // name="number_of_deficiencies"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.number_of_deficiencies}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({
                        number_of_deficiencies: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Ground For Detention
                </label>
                <input
                  // id="ground_for_detention"
                  // name="ground_for_detention"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  // placeholder="Albuquerque"
                  value={rowData.ground_for_detention}
                  onChange={(e) => {
                    dispatch(
                      mouFormDataAssign({
                        ground_for_detention: e.target.value,
                      })
                    );
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

export default MouEdit;
