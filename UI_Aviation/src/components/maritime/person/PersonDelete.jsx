import React, { useEffect, useRef, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FiInfo } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { closePersonDelete } from "../../../store/maritime/person/PersonActionSlice";
import { PersonService } from "../../../api/services/maritime/person/PersonService";
import { Toast } from "primereact/toast";
import { ToastContext } from "../../shared/ui_functions/ToastContext";

function PersonDelete({ deleteRow }) {
  const dispatch = useDispatch();
  const { rowData, isDeleteVisible } = useSelector(
    (state) => state.person_action
  );
  const toastBottomCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);
  const toastRef = useContext(ToastContext);

  useEffect(() => {
  }, [rowData, isDeleteVisible]);

  useEffect(() => {
  }, []);

  const deleteHandle = async (event) => {

    try {
      const response = await PersonService.deletePerson(rowData.id, access_token);
      toastRef.current.show({
        severity: "success",
        summary: "Operation Successful",
        detail: `Person ${rowData.person_name} has been deleted successfully.`,
        life: 3000,
      });

      deleteRow(rowData.id);
      // Handle success response
    } catch (error) {
      console.error("Error deleting person:", error);
      toastRef.current.show({
        severity: "error",
        summary: "Operation Failed",
        detail: "Person has not been deleted.",
        life: 3000,
      });
    }

    dispatch(closePersonDelete());
  };

  return (
    <div
      id="delete_person"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Toast ref={toastBottomCenter} position="bottom-center" />
      <Dialog
        visible={isDeleteVisible}
        header={
          <p className="font-bold text-lg text-blue-800">Delete Confirmation</p>
        }
        onHide={() => dispatch(closePersonDelete())}
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
              onClick={() => dispatch(closePersonDelete())}
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

export default PersonDelete;
