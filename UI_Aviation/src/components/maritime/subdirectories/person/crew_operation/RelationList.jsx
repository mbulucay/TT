import React, { useEffect, useState, useMemo, useRef } from "react";
import DataTable from "react-data-table-component";
import { VesselCrewRelationService } from "../../../../../api/services/maritime/vessel_crew_relation/VesselCrewRelationService";
import { useSelector, useDispatch } from "react-redux";
import { PersonService } from "../../../../../api/services/maritime/person/PersonService";
import { MscService } from "../../../../../api/services/maritime/msc/MscService";
import {
  vesselPersonRelationDisableAddClicked,
  vesselPersonRelationOpenDeleteDialog,
  vesselPersonRelationCloseDeleteDialog,
  vesselPersonRelationAssign,
} from "../../../../../store/maritime/VesselPersonRelation/VesselPersonRelationSlice";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import RelationDelete from "./RelationDelete";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { AuthService } from "../../../../../api/auth/auth";
import { authDataAssign } from "../../../../../store/user/authSlice";

function RelationList() {
  const [relations, setRelations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sub_loading, setSubLoading] = useState(false);

  const toastBottomCenter = useRef(null);
  const [imos, setImos] = useState([]);
  const [main_table_data, setMainTableData] = useState([
    { imo: 0, vesselData: {} },
  ]);
  const [table_data, setTableData] = useState([]);

  const dispatch = useDispatch();
  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const { add_clicked, delete_dialog_open } = useSelector(
    (state) => state.vessel_person_relation
  );

  const handleDeleteButtonClick = (row) => {
    dispatch(vesselPersonRelationOpenDeleteDialog());
    dispatch(
      vesselPersonRelationAssign({
        action_id: row.id,
      })
    );
  };

  const handleEditButtonClick = (row) => {
    // dispatch(openPersonEdit());
    // assignRowData(row);
  };

  const showMessage = (event, severity, label) => {
    toastBottomCenter.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  };

  const fetchPersonByIdentification = async (id) => {
    try {
      const response = await PersonService.getPersonByIdentification(
        access_token,
        id
      );
      return response;
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
        await VesselCrewRelationService.getAllVesselCrewRelations(access_token);

      const imos = [...new Set(response.map((item) => item.shipimo))].filter(
        (item) => item !== null
      );
      setImos((prev) => imos);
      setRelations((prev) => response);

      const tableDataPromises = imos.map(async (imo) => {
        const crewRelation =
          await VesselCrewRelationService.getCrewRelationByImo(
            access_token,
            imo
          );

        const TableDataItems = await Promise.all(
          crewRelation.map(async (item) => {
            const personData = await fetchPersonByIdentification(
              item.identificationnumber
            );
            const vesselData = await fetchVesselByImo(imo);

            return {
              ...item,
              person_data: personData,
              vessel_data: vesselData,
            };
          })
        );
        return TableDataItems;
      });

      const table_data = await Promise.all(tableDataPromises);
      // const mainTableData = table_data.flat().map((item, index) => ({
      //   imo: imos[index],
      //   vesselData: item.vessel_data,
      // }));
      // setMainTableData(mainTableData);
      setTableData((prev) => table_data);

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
        console.error("An error occurred during msclistget:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchRelations();
  }, [access_token]);

  useEffect(() => {
    if (add_clicked) {
      fetchRelations();
      dispatch(vesselPersonRelationDisableAddClicked());
    }
  }, [add_clicked]);

  const columns = useMemo(
    () => [
      {
        name: "Imo",
        selector: (row) => row,
        sortable: true,
      },
    ],
    []
  );

  const subColumns = useMemo(
    () => [
      {
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "120px",
      },
      {
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "120px",
      },
      {
        name: "Identification Number",
        selector: (row) => row.identificationnumber,
        sortable: true,
        width: "120px",
      },
      {
        name: "Name",
        selector: (row) => row.person_data?.person_name,
        sortable: true,
        width: "100px",
      },
      {
        name: "Surname",
        selector: (row) => row.person_data?.person_surname,
        sortable: true,
        width: "100px",
      },
      {
        name: "Job",
        selector: (row) => row.person_data?.job,
        sortable: true,
        width: "100px",
      },
      {
        name: "Relation Type",
        selector: (row) => row.relation_type,
        sortable: true,
        width: "100px",
      },
      {
        name: "Activities",
        selector: (row) => row.activities,
        sortable: true,
        width: "100px",
      },
      {
        name: "Vessel Name",
        selector: (row) => row.vessel_data?.ship_name,
        sortable: true,
        width: "100px",
      },
      {
        name: "Vessel Type",
        selector: (row) => row.vessel_data?.ship_type,
        sortable: true,
        width: "100px",
      },
      {
        name: "Flag",
        selector: (row) => row.vessel_data?.flag_name,
        sortable: true,
        width: "100px",
      },
      {
        name: "MMSI",
        selector: (row) => row.vessel_data?.mmsi,
        sortable: true,
        width: "100px",
      },
      {
        name: "Callsign",
        selector: (row) => row.vessel_data?.callsign,
        sortable: true,
        width: "100px",
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-4 -translate-x-26">
            {/* {role === "ADMIN" && (
              <MdOutlineModeEdit
                // className="icon"
                // style={{
                //   position: "relative",
                //   top: "0px",
                //   right: "0px",
                // }}
                onClick={() => handleEditButtonClick(row)}
                className=" bg-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 p-1
              ring-1 ring-green-400 hover:ring-2 text-green-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )} */}
            {role === "ADMIN" && (
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
              ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )}
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
        <RelationExpanededComponent data={table_data.at(imos.indexOf(data))} />
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
            Vessel Crew Records
          </h2>
        }
        data={imos}
        progressPending={loading}
        progressComponent={<h2>Loading...</h2>}
        columns={columns}
        // selectableRows
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
      {delete_dialog_open && <RelationDelete showMessage={showMessage} />}
    </div>
  );
}

export default RelationList;
