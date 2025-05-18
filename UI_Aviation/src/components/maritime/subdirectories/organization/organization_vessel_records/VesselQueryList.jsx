import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { MscService } from "../../../../../api/services/maritime/msc/MscService";
import { OrganizationVesselRelationService } from "../../../../../api/services/maritime/organization_vessel_relation/OrganizationVesselRelationService";
import { AuthService } from "../../../../../api/auth/auth";
import { authDataAssign } from "../../../../../store/user/authSlice";

function VesselQueryList() {
  const [loading, setLoading] = useState(false);
  const [ov_relations, setOVRelations] = useState([]);
  const [filteredRelations, setFilteredRelations] = useState([]);

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { organizationimo } = useSelector(
    (state) => state.organization_vessel_relation
  );

  const fetchVesselByImo = async (imo) => {
    try {
      const response = await MscService.getMscByImo(imo, access_token);
      return response;
      // setVessels((prev) => [response, ...prev]);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
      } else {
        console.error("An error occurred during personlistget:", error.message);
      }
    }
  };

  const fetchRelations = async (page) => {
    try {
      setLoading(true);

      const response =
        await OrganizationVesselRelationService.getAllByCompanyImo(
          access_token,
          organizationimo
        );

      setOVRelations((prev) => response);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        const response = await AuthService.updateAccessToken(refresh_token);
        if (response) {
          dispatch(
            authDataAssign({
              access_token: response?.access_token,
              refresh_token: response?.refresh_token,
              email: response?.email,
              role: response?.user_role,
              firstname: response?.user_firstname,
              lastname: response?.user_lastname,
            })
          );
        }
      } else {
        console.error(
          "An error occurred during organization vessel relation list:",
          error.message
        );
      }
    }
  };

  useEffect(() => {
    setOVRelations([]);
    fetchRelations();
  }, [access_token]);

  useEffect(() => {
  }, [ov_relations]);

  const columns = useMemo(
    () => [
      {
        name: "Vessel Imo",
        selector: (row) => row.vesselimo,
        sortable: true,
        width: "120px",
      },
      {
        name: "Company Imo",
        selector: (row) => row.companyimo,
        sortable: true,
        width: "150px",
      },
      {
        name: "Vessel Role",
        selector: (row) => row.role,
        sortable: true,
        width: "120px",
      },
      {
        name: "Date of Effect",
        selector: (row) => row.date_of_effect,
        sortable: true,
        width: "150px",
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <pre className="w-full md:w-2/6 text-sm whitespace-pre-wrap justify-content-center">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  return (
    <div id="relation_datatable" className="bg-white h-100 w-full">
      {/* {Object.keys(imo_values).map((key) => {
        if (key !== "id" && key !== "table_id") {
          return (
            <div key={key} className="w-72">
              <span className="font-semibold">{key}: </span>
              <span>{imo_values[key]}</span>
            </div>
          );
        }
        return null;
      })} */}

      {/*  {vessels.map((item, index) => {
        return (
          <div key={index} className="w-72">
            <span className="font-semibold">{index}: </span>
            <span>{JSON.stringify(item)}</span>
          </div>
        );
      })} */}

      {/*      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div> */}

      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
      bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Organization Vessel Records
          </h2>
        }
        data={ov_relations}
        progressPending={loading}
        progressComponent={<h2>Loading...</h2>}
        columns={columns}
        selectableRows
        // onSelectedRowsChange={handleChange}
        pagination
        paginationRowsPerPageOptions={[10]}
        // onChangePage={(page) => {
        //   console.log("page: ", page);
        // }}
        striped
        highlightOnHover
        pointerOnHover
        expandableRows
        expandOnRowDoubleClicked
        expandableRowsComponent={ExpandedComponent}
        // onRowClicked={(row) => {
        //   console.log("row: ", row);
        // }}
      />
    </div>
  );
}

export default VesselQueryList;
