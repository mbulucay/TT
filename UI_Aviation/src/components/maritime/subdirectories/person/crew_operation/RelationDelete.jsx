import React, { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FiInfo } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { vesselPersonRelationCloseDeleteDialog } from "../../../../../store/maritime/VesselPersonRelation/VesselPersonRelationSlice";
import { Toast } from "primereact/toast";
import { VesselCrewRelationService } from "../../../../../api/services/maritime/vessel_crew_relation/VesselCrewRelationService";

function RelationDelete({ showMessage, deleteRow }) {
  const dispatch = useDispatch();

  const toastBottomCenter = useRef(null);
  const { access_token } = useSelector((state) => state.auth);

  const { delete_dialog_open, action_id } = useSelector(
    (state) => state.vessel_person_relation
  );

  useEffect(() => {
  }, [action_id, delete_dialog_open]);

  useEffect(() => {
  }, []);

  const deleteHandle = async (event) => {

    try {
      const response = await VesselCrewRelationService.disableRelation(
        access_token,
        { id: action_id, relation_status: false }
      );

      console.log("Vessel crew relation deleted successfully:", response);

      showMessage(event, "success", {
        head: `Vessel crew relation deleted ${action_id}`,
        content: ``,
      });
    } catch (error) {
      console.error("Error deleting vessel crew relation:", error);
      showMessage(event, "error", {
        head: `Vessel crew relation delete`,
        content: `Vessel crew relation deletion failed`,
      });
    }
    dispatch(vesselPersonRelationCloseDeleteDialog());
  };

  return (
    <div
      id="delete_person"
      className="fixed top-0 left-0 w-full h-full bg-black/25 flex align-items-center justify-content-center z-30"
    >
      <Toast ref={toastBottomCenter} position="bottom-center" />
      <Dialog
        visible={delete_dialog_open}
        header={
          <p className="font-bold text-lg text-blue-800">Delete Confirmation</p>
        }
        onHide={() => dispatch(vesselPersonRelationCloseDeleteDialog())}
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
              onClick={() => dispatch(vesselPersonRelationCloseDeleteDialog())}
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

export default RelationDelete;
