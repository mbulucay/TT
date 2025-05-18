import React from "react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Toast } from "primereact/toast";
import { updateSelectRows } from "../../../../../store/maritime/SelectRowsSlice";
import { VesselCrewRelationService } from "../../../../../api/services/maritime/vessel_crew_relation/VesselCrewRelationService";
import { MscService } from "../../../../../api/services/maritime/msc/MscService";
import { AuthService } from "../../../../../api/auth/auth";
import { authDataAssign } from "../../../../../store/user/authSlice";

function PersonQueryList() {
  // const [relations, setRelations] = useState([]);
  const [loading, setLoading] = useState(false);
  // const toastBottomCenter = useRef(null);
  const [pv_relations, setPVRelations] = useState([]);
  const [filteredRelations, setFilteredRelations] = useState([]);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.person_query_filter);

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  // const { selectedRows } = useSelector((state) => state.select_rows);

  const { identification_number, start_date, end_date } = useSelector(
    (state) => state.vessel_person_relation
  );

  // useEffect(() => {
  // }, [selectedRows]);

  // const handleChange = useCallback((state) => {
  //   dispatch(updateSelectRows(state.selectedRows));
  // }, []);

  const fetchVesselByImo = async (imo) => {
    try {
      if (imo === null) return {};

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

  const fetchPerson = async (page) => {
    try {
      setLoading(true);

      const response =
        await VesselCrewRelationService.getVesselImoCrewRelationsByPerson(
          access_token,
          identification_number
        );

      const promises = Object.keys(response).map((item) =>
        fetchVesselByImo(response[item].shipimo).then((shipData) => ({
          ...response[item],
          ship_data: shipData,
        }))
      );

      Promise.all(promises).then((data) => {
        setPVRelations((prev) => [...data, ...prev]);
      });

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
        console.error("An error occurred during personlistget:", error.message);
      }
    }
  };

  useEffect(() => {
    setPVRelations([]);
    fetchPerson();
  }, [access_token]);

  useEffect(() => {
  }, [pv_relations]);

  // useEffect(() => {
  //   setFilteredRelations(relations);
  // }, [relations]);

  useEffect(() => {
    const filteredRelations = (row) => {
      const {
        person_name,
        person_surname,
        identification_number,
        imo,
        relation_type,
      } = filter;

      const personNameFilter = person_name ? person_name.toLowerCase() : "";
      const personSurnameFilter = person_surname
        ? person_surname.toLowerCase()
        : "";
      const identificationFilter = identification_number
        ? identification_number
        : "";
      const imoFilter = imo ? imo : "";
      const relationTypeFilter = relation_type
        ? relation_type.toLowerCase()
        : "";

      return (
        /* (!personNameFilter ||
          row.personname?.toLowerCase().includes(personNameFilter)) &&
        (!personSurnameFilter ||
          row.personsurname?.toLowerCase().includes(personSurnameFilter)) &&
        (!identificationFilter ||
          row.identification_number
            .toString()
            .includes(identificationFilter)) && */
        row.shipimo &&
        (!imoFilter || row.shipimo.toString().includes(imoFilter))
        // &&
        // (!relationTypeFilter ||
        //   (row.relation_type &&
        //     row.relation_type.toLowerCase().includes(relationTypeFilter)))
      );
    };

    const filtered = pv_relations
      .filter(filteredRelations)
      .sort((a, b) => a.personname.localeCompare(b.personname));
    setFilteredRelations((prev) => filtered);
  }, [filter, pv_relations]);

  /*  const showMessage = (event, severity, label) => {
    toastBottomCenter.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  }; */

  const columns = useMemo(
    () => [
      {
        name: "Id",
        selector: (row) => row.identificationnumber,
        sortable: true,
        // width: "125px",
      },
      {
        name: "Name",
        selector: (row) => row.personname,
        sortable: true,
        // width: "150px",
      },
      {
        name: "Surname",
        selector: (row) => row.personsurname,
        sortable: true,
        // width: "150px",
      },
      {
        name: "Relation Type",
        selector: (row) => row.relation_type,
        sortable: true,
        // width: "125px",
      },
      {
        name: "Activities",
        selector: (row) => row.activities,
        sortable: true,
        // width: "120px",
      },
      {
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        // width: "120px",
      },
      {
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        // width: "120px",
      },
      {
        name: "Imo",
        selector: (row) => row.shipimo,
        sortable: true,
        // width: "100px",
      },
      {
        name: "Ship Name",
        selector: (row) => row?.ship_data?.ship_name || "",
        sortable: true,
        // width: "150px",
      },
      {
        name: "Ship Type",
        selector: (row) => row?.ship_data?.ship_type || "",
        sortable: true,
        // width: "100px",
      },
      {
        name: "Country",
        selector: (row) => row?.ship_data?.flag_name || "",
        sortable: true,
        // width: "120px",
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
            Person Maritime Records
          </h2>
        }
        data={filteredRelations}
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

export default PersonQueryList;
