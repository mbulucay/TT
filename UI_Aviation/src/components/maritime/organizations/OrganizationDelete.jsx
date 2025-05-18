import React, { useContext, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FiInfo } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { closeOrganizationDelete } from "../../../store/maritime/organizations/OrganizationActionSlice";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import { Toast } from "primereact/toast";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function OrganizationDelete({ deleteRow }) {
  const dispatch = useDispatch();
  const { rowData, isDeleteVisible } = useSelector(
    (state) => state.organization_action
  );
  const toastBottomCenter = useRef(null);
  const toastRef = useContext(ToastContext);
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
  }, [rowData, isDeleteVisible]);

  useEffect(() => {
  }, []);

  // const showMessage = (event, ref, severity, label) => {
  //   ref.current.show({
  //     severity: severity,
  //     summary: label.head,
  //     detail: label.content,
  //     life: 2000,
  //   });
  // };

  const deleteHandle = async (event) => {

    try {
      // Call the deletePort function with the portId
      const response = await OrganizationService.deleteOrganization(rowData.id, access_token);

      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Organization has been deleted successfully.`,
        life: 3000,
      });

      deleteRow(rowData.id);
      // Handle success response
    } catch (error) {
      console.error("Error deleting port:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Failed",
        detail: "Organization has not been deleted.",
        life: 3000,
      });
    }

    dispatch(closeOrganizationDelete());
  };

  return (
    <div
      id="delete_organization"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Toast ref={toastBottomCenter} position="bottom-center" />
      <Dialog
        visible={isDeleteVisible}
        header={
          <p className="font-bold text-lg text-blue-800">Delete Confirmation</p>
        }
        onHide={() => dispatch(closeOrganizationDelete())}
        footer={
          <div id="modal_footer" className="flex justify-end gap-3 mt-3">
            <Button
              className="shadow bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br 
              focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105"
              label="Delete"
              onClick={deleteHandle}
            />
            <Button
              className="shadow bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br 
              focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded hover:scale-105
              ring-2 ring-red-900"
              label="No"
              onClick={() => dispatch(closeOrganizationDelete())}
            />
          </div>
        }
        closeIcon
        className="bg-blue-100 rounded-2xl shadow-lg p-6 m-16"
      >
        <div className="flex justify-center h-8 w-full gap-3">
          <FiInfo fontSize={24} />
          <p className="font-semibold">Do you want to delete this record?</p>
        </div>
      </Dialog>
    </div>
  );
}

export default OrganizationDelete;
