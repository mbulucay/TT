import React, { useContext, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import {
  organizationFormDataAssign,
  closeOrganizationEdit,
} from "../../../store/maritime/organizations/OrganizationActionSlice";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import { Toast } from "primereact/toast";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function OrganizationEdit({ updateRow }) {
  const dispatch = useDispatch();
  const { rowData, isEditVisible } = useSelector(
    (state) => state.organization_action
  );
  const toastBottomCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {}, [rowData, isEditVisible]);

  useEffect(() => {}, []);

  const updateTrigger = async (event) => {
    try {
      // Call the deletePort function with the portId
      const response = await OrganizationService.updateOrganization(
        rowData.id,
        rowData,
        access_token
      );

      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Organization ${rowData.companyName} has been updated successfully.`,
        life: 3000,
      });

      updateRow(rowData);
      // Handle success response
    } catch (error) {
      console.error("Error deleting port:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Failed",
        detail: `${rowData.companyName} has not been updated successfully.`,
        life: 3000,
      });
    }

    dispatch(closeOrganizationEdit());
  };

  return (
    <div
      id="edit_port"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-10"
    >
      <Dialog
        visible={isEditVisible}
        header={<h3 className="m-2 pl-8">Edit Organization {rowData.id}</h3>}
        onHide={() => {
          dispatch(closeOrganizationEdit());
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
                dispatch(closeOrganizationEdit());
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
                  Organization Name
                </label>
                <input
                  // id="companyName"
                  // name="companyName"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.companyName}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        companyName: e.target.value,
                      })
                    );
                  }}
                />
                {/*                 
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> 
                */}
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Imo
                </label>
                <input
                  // id="companyImo"
                  // name="companyImo"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={rowData.companyImo}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        companyImo: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 sm:mt-2 md:mt-0">
                  # of Employees
                </label>
                <select
                  id="number_of_employees"
                  name="number_of_employees"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={rowData.number_of_employees}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        number_of_employees: e.target.value,
                      })
                    );
                  }}
                  typeof="number"
                >
                  <option value={1}>1-10</option>
                  <option value={11}>11-50</option>
                  <option value={51}>51-100</option>
                  <option value={101}>101-200</option>
                  <option value={201}>201-500</option>
                  <option value={501}>501-1000</option>
                  <option value={1001}>1001-2000</option>
                  <option value={2001}>2001-4000</option>
                  <option value={4001}>4001-8000</option>
                  <option value={8001}>8000+</option>
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Activity Areas
                </label>
                <input
                  // id="activity_areas"
                  // name="activity_areas"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.activity_areas}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        activity_areas: e.target.value,
                      })
                    );
                  }}
                />
              </div>

              {/* 
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Founded
                </label>
                <input
                  // id="founded"
                  // name="founded"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  step="any"
                  value={rowData.founded}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({ founded: e.target.value })
                    );
                  }}
                />
              </div> */}

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Website
                </label>
                <input
                  // id="website"
                  // name="website"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.website}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({ website: e.target.value })
                    );
                  }}
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Telephone
                </label>
                <input
                  // id="telephone"
                  // name="telephone"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.telephone}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        telephone: e.target.value,
                      })
                    );
                  }}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  E-Mail
                </label>
                <input
                  // id="mail"
                  // name="mail"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.mail}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({ mail: e.target.value })
                    );
                  }}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  Type
                </label>
                <input
                  // id="typeof_organization"
                  // name="typeof_organization"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.typeof_organization}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        typeof_organization: e.target.value,
                      })
                    );
                  }}
                />
              </div>
            </div>

            {/* Fourth Row  */}
            <div className="flex flex-wrap -mx-3 mb-6 md:mt-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-state"
                >
                  Country
                </label>
                <input
                  // id="country_name"
                  // name="country_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.country_name}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        country_name: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-zip"
                >
                  Headquarters
                </label>
                <input
                  // id="headquarters"
                  // name="headquarters"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={rowData.headquarters}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        headquarters: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  // for="grid-city"
                >
                  Postal Code
                </label>
                <input
                  // id="postal_code"
                  // name="postal_code"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  value={rowData.postal_code}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({
                        postal_code: e.target.value,
                      })
                    );
                  }}
                />
              </div>

              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2"
                  // for="grid-zip"
                >
                  Address
                </label>
                <input
                  // id="address"
                  // name="address"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="90210"
                  value={rowData.address}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    dispatch(
                      organizationFormDataAssign({ address: e.target.value })
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

export default OrganizationEdit;
