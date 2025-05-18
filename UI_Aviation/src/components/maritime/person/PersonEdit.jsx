import React, { useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {
  closePersonEdit,
  personFormDataAssign,
} from "../../../store/maritime/person/PersonActionSlice";
import { Toast } from "primereact/toast";
import { PersonService } from "../../../api/services/maritime/person/PersonService";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function PersonEdit({ updateRow }) {
  const dispatch = useDispatch();
  const { rowData, isEditVisible } = useSelector(
    (state) => state.person_action
  );
  const toastBottomCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);

  useEffect(() => {}, [rowData, isEditVisible]);

  useEffect(() => {}, []);

  const updateTrigger = async (event) => {

    try {
      const response = await PersonService.updatePerson(
        rowData.id,
        rowData,
        access_token
      );

      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Person ${rowData.person_name} has been updated successfully.`,
        life: 3000,
      });
      updateRow(rowData);
    } catch (error) {
      console.error("Error updating person:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Failed",
        detail: `Person ${rowData.person_name} has not been updated.`,
        life: 3000,
      });
    }
    dispatch(closePersonEdit());
  };

  return (
    <div
      id="edit_port"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Dialog
        visible={isEditVisible}
        header={<h3 className="m-2 pl-8">Edit Person {rowData.identificationNumber}</h3>}
        onHide={() => {
          dispatch(closePersonEdit());
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
                dispatch(closePersonEdit());
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
                  Name
                </label>
                <input
                  id="person_name"
                  name="person_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.person_name}
                  onChange={(e) => {
                    dispatch(personFormDataAssign({ person_name: e.target.value }));
                  }}
                />
                {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Surname
                </label>
                <input
                  id="person_surname"
                  name="person_surname"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.person_surname}
                  onChange={(e) => {
                    dispatch(personFormDataAssign({ person_surname: e.target.value }));
                  }}
                />
                {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Identification Number
                </label>
                <input
                  id="identificationNumber"
                  name="identificationNumber"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={rowData.identificationNumber}
                  onChange={(e) => {
                    dispatch(
                      personFormDataAssign({
                        identificationNumber: e.target.value,
                      })
                    );
                  }}
                />
                {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Job
                </label>
                <input
                  id="job"
                  name="job"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.job}
                  onChange={(e) => {
                    dispatch(personFormDataAssign({ job: e.target.value }));
                  }}
                />
                {/*             <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
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
                <select
                  id="gender"
                  name="gender"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.gender}
                  onChange={(e) => {
                    dispatch(personFormDataAssign({ gender: e.target.value }));
                  }}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  value={rowData.age}
                  onChange={(e) => {
                    dispatch(personFormDataAssign({ age: e.target.value }));
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  Country
                </label>
                <input
                  id="country_name"
                  name="country_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.country_name}
                  onChange={(e) => {
                    dispatch(
                      personFormDataAssign({ country_name: e.target.value })
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

export default PersonEdit;
