import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Calendar } from "primereact/calendar";
import { OrganizationVesselRelationService } from "../../../../../api/services/maritime/organization_vessel_relation/OrganizationVesselRelationService";
import {
  organizationVesselRealtionAssign,
  organizationVesselRelationAddClicked,
} from "../../../../../store/maritime/OrganizationVesselRelation/OrganizationVesselRelationSlice";

function OperationTab() {
  const dispatch = useDispatch();
  const [effect_date, setEffectDate] = useState(null);

  const { access_token } = useSelector((state) => state.auth);
  const { organizationimo, shipimo, start_date } = useSelector(
    (state) => state.organization_vessel_relation
  );

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // Get full year
    return `${year}-${month}-${day}`;
  }

  const handleEffectDate = (e) => {
    setEffectDate((prev) => e.value);
    dispatch(
      organizationVesselRealtionAssign({
        start_date: e.target.value !== null ? formatDate(e.target.value) : null,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const response =
        await OrganizationVesselRelationService.createOrganizationVesselRelation(
          access_token,
          {
            companyimo: organizationimo,
            vesselimo: shipimo,
            date_of_effect: start_date,
          }
        );
      dispatch(organizationVesselRelationAddClicked());
    } catch (error) {
      console.error("Error creating vessel crew relation:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex justify-around">
        <form className="w-full h-full bg-blue-200 p-2 rounded-3xl mt-2 shadow-2xl">
          {/* First row */}
          <div className="flex flex-wrap justify-around mr-32 font-bold text-blue-900 text-xl">
            Vessel Organization Record
          </div>
          <div className={`flex flex-wrap gap-12 ml-6`}>
            <div className={`w-full md:w-1/4`}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Organization Imo Number
              </label>
              <input
                id="organizationimo"
                name="organizationimo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={organizationimo}
                onChange={(e) =>
                  dispatch(
                    organizationVesselRealtionAssign({
                      organizationimo: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className={`w-full md:w-1/4`}>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                shipimo Number
              </label>
              <input
                id="shipimo"
                name="shipimo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={shipimo}
                onChange={(e) =>
                  dispatch(
                    organizationVesselRealtionAssign({
                      shipimo: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of Effect
              </label>
              <div className="card flex justify-content-center">
                <Calendar
                  value={effect_date}
                  onChange={handleEffectDate}
                  showIcon
                  showButtonBar
                />
              </div>
            </div>

            <div className="w-fit mt-1 flex items-stretch">
              <Button
                className={`h-fit ml-6 self-center shadow-lg bg-gradient-to-r 
            from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
              focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 
              rounded hover:scale-105`}
                type="button"
                onClick={handleSubmit}
              >
                <span className="mr-2">
                  <FaPlusCircle />
                </span>{" "}
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OperationTab;
