import React, { useEffect, useState, useMemo, useRef } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { MscService } from "../../../../../api/services/maritime/msc/MscService";
import { OrganizationService } from "../../../../../api/services/maritime/organization/OrganizationService";
import { OrganizationVesselRelationService } from "../../../../../api/services/maritime/organization_vessel_relation/OrganizationVesselRelationService";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Toast } from "primereact/toast";
import {
  organizationVesselRealtionAssign,
  organizationVesselRelationDisableAddClicked,
  organizationVesselRelationOpenDeleteDialog,
  organizationVesselRelationCloseDeleteDialog,
} from "../../../../../store/maritime/OrganizationVesselRelation/OrganizationVesselRelationSlice";
import { AuthService } from "../../../../../api/auth/auth";
import { authDataAssign } from "../../../../../store/user/authSlice";

function RelationList() {
  const [relations, setRelations] = useState([]);
  const [loading, setLoading] = useState(false);

  const toastBottomCenter = useRef(null);

  const [comp_imos, setCompImos] = useState([]);
  const [table_data, setTableData] = useState([]);

  const dispatch = useDispatch();
  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const { add_clicked, delete_dialog_open } = useSelector(
    (state) => state.organization_vessel_relation
  );

  const handleDeleteButtonClick = (row) => {};

  const showMessage = (event, severity, label) => {
    toastBottomCenter.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  };

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

  const fetchRelations = async () => {
    try {
      const response =
        await OrganizationVesselRelationService.getAllOrganizationVesselRelation(
          access_token
        );

      const cimos = [
        ...new Set(response.map((item) => item.companyimo)),
      ].filter((item) => item !== null);
      setCompImos((prev) => cimos.sort((a, b) => a - b));
      setRelations((prev) => response);

      const tableDataPromises = cimos.map(async (cimo) => {
        const vesselRelation =
          await OrganizationVesselRelationService.getAllByCompanyImo(
            access_token,
            cimo
          );

        const TableDataItems = await Promise.all(
          vesselRelation.map(async (item) => {
            const vesselData = await fetchVesselByImo(item.vesselimo);
            return {
              ...item,
              vessel_data: vesselData,
            };
          })
        );
        return TableDataItems;
      });

      const table_data = await Promise.all(tableDataPromises);
      setTableData((prev) => table_data);

    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        const response = await AuthService.updateAccessToken(refresh_token);
        if(response){dispatch(
          authDataAssign({
            access_token: response?.access_token,
            refresh_token: response?.refresh_token,
            email: response?.email,
            role: response?.user_role,
            firstname: response?.user_firstname,
            lastname: response?.user_lastname,
          })
        );}
      } else {
        console.error("An error occurred during msclistget:", error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelations();
  }, [access_token]);

  useEffect(() => {
    if (add_clicked) {
      fetchRelations();
      dispatch(organizationVesselRelationDisableAddClicked());
    }
  }, [add_clicked]);

  const columns = useMemo(
    () => [
      {
        name: "Company Imo",
        selector: (row) => row,
        sortable: true,
      },
    ],
    []
  );

  const subColumns = useMemo(
    () => [
      {
        name: "Date of Effect",
        selector: (row) => row.date_of_effect,
        sortable: true,
        width: "150px",
      },
      {
        name: "Vessel Imo",
        selector: (row) => row.vesselimo,
        sortable: true,
        width: "120px",
      },
      {
        name: "MMSI",
        selector: (row) => row.vessel_data.mmsi,
        sortable: true,
        width: "100px",
      },
      {
        name: "Callsign",
        selector: (row) => row.vessel_data.callsign,
        sortable: true,
        width: "100px",
      },
      {
        name: "Vessel Name",
        selector: (row) => row.vessel_data.ship_name,
        sortable: true,
        width: "120px",
      },
      {
        name: "Vessel Type",
        selector: (row) => row.vessel_data.ship_type,
        sortable: true,
        width: "120px",
      },
      {
        name: "Flag",
        selector: (row) => row.vessel_data.flag_name,
        sortable: true,
        width: "100px",
      },

      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-4 -translate-x-26">
            {/*  {role === "ADMIN" && (
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
              ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )} */}
          </div>
        ),
        ignoreRowClick: false,
        // allowOverflow: true,
        // button: true,
        hide: "md",
      },
    ],
    []
  );

  const SubExpandComponent = ({ data }) => {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const RelationExpanededComponent = ({ data }) => {
    return (
      <DataTable
        columns={subColumns}
        data={data}
        striped
        expandableRows
        expandOnRowDoubleClicked
        expandableRowsComponent={SubExpandComponent}
      />
    );
  };

  const ExpandedComponent = ({ data }) => (
    <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <pre className="w-full text-sm whitespace-pre-wrap justify-content-center">
        {/* {JSON.stringify(data, null, 2)}
        <br></br>
        <div>{JSON.stringify(table_data.at(imos.indexOf(data)))}</div>
        <br></br> */}
        <RelationExpanededComponent
          data={table_data.at(comp_imos.indexOf(data))}
        />
      </pre>
    </div>
  );

  return (
    <div id="relation_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
    bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Company Vessel Records
          </h2>
        }
        data={comp_imos}
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
      {/* {delete_dialog_open && <RelationDelete showMessage={showMessage} />} */}
    </div>
  );
}

export default RelationList;
